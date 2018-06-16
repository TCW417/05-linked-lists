'use strict';

const Node = require('./node');

const LinkedList = module.exports = class { /* eslint-disable-line */
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(n) (assuming f is O(1), otherwise all bets are off)
  forEach(f) {
    let ptr = this.head;
    while (ptr !== null) {
      f(ptr.value);
      ptr = ptr.next;
    }
  }

  // time: O(1), or O(n) where n = val.length but assuming  
  // #args is much smaller than length of list I'd say O(1)
  // space: O(1) if you grant time as O(1)
  push(...val) { // add items to end of list
    val.forEach((item) => {
      const ptr = this.tail;
      if (!ptr) {
        this.tail = new Node(item);
        this.head = this.tail;
      } else {
        ptr.next = new Node(item);
        this.tail = ptr.next;
      }
    });
  }

  // time: O(n). Even with a tail pointer this is O(n) because
  // I have to find the note to point tail at when
  // the pop is complete.  If I have time I'll do a DLL
  // version of this class where this will be O(1)
  // space: O(1)
  pop() { // remove item from end of list
    if (this.tail === null) return null; // list is already empty
    if (this.head.next === null) { // one item in list
      const ptr = this.head;
      this.head = this.tail = null;
      return ptr;
    }
    let ptr = this.head; // at least two items in list
    while (ptr.next.next !== null) { // find next to last node
      ptr = ptr.next;
    }
    // ptr pointing to next to last node
    this.tail = ptr;
    ptr = ptr.next;
    this.tail.next = null;
    return ptr;
  }

  // time: O(n), not counting f's contribution
  // space: O(1)
  remove(f) { // remove 
    let ptr = this.head;
    if (this.head === null) return null; // empty list
    if (f(this.head.value)) { // match at head of list
      this.head = this.head.next;
      if (this.tail === ptr) this.tail = this.head;
      return ptr;
    }
    let trailPtr = this.head;
    ptr = this.head.next;
    while (ptr != null) {
      if (f(ptr.value)) {
        trailPtr.next = ptr.next;
        if (this.tail === ptr) this.tail = trailPtr;
        return ptr;
      }
      trailPtr = ptr;
      ptr = ptr.next;
    }
    return null;
  }
  
  // time: O(n), not counting f's contribution
  // space: O(1)
  find(f) { // return pointer to first node for which f returns true
    let ptr = this.head;
    while (ptr != null) {
      if (f(ptr.value)) return ptr;
      ptr = ptr.next;
    }
    return ptr;
  }

  // time: O(n), not counting f's contribution
  // space: O(n)
  map(f) { // return new list of nodes transformed by f run on this
    const list = new LinkedList();
    let ptr = this.head;
    while (ptr !== null) {
      list.push(f(ptr));
      ptr = ptr.next;
    }
    return list;
  }

  // time: O(n)
  // space: O(1) (assuming f isn't making a new list
  // or something huge in acc)
  reduce(f, acc) { // return result of accumulating f(list values)
    let ptr = this.head;
    let accum = acc;
    while (ptr !== null) {
      accum = f(accum, ptr.value);
      ptr = ptr.next;
    }
    return accum;
  }

  // time: O(n)
  // space: O(n) assuming worst case and f matches everything
  filter(f) { // return list for which f(vale) === true
    const list = new LinkedList();
    let ptr = this.head;
    while (ptr !== null) {
      if (f(ptr.value)) list.push(ptr.value);
      ptr = ptr.next;
    }
    return (list.head !== null ? list : null);
  }

  // time: O(1)
  // space: O(1)
  shift() { // return node at head of list
    const ptr = this.head;
    if (ptr) {
      this.head = this.head.next;
    }
    return ptr;
  }

  // time: O(1) (see push above re # of args)
  // space: O(1)
  unshift(...val) { // add ...val to head of list
    val.forEach((item) => {
      if (!this.head) {
        this.head = new Node(item);
        this.tail = this.head;
      } else {
        const ptr = new Node(item);
        ptr.next = this.head;
        this.head = ptr;
      }
    });
  }

  // time: O(n)
  // more likely O(1) if you assume the slice is much
  // smaller than the list. Doesn't count time required
  // to find the start and end pointers.
  // space: O(n) where n is size of slice.
  // this method doesn't use this, rather it takes
  // what BETTER be two pointers returned by this.find.
  // if the pointers aren't pointing to nodes in this
  // then all bets are off!
  slice(pStart = this.head, pEnd = this.tail) { // return new list including p.End.value
    const list = new LinkedList();
    let p = pStart;
    do {
      list.push(p.value);
      p = p.next;
    } while (p !== pEnd);
    list.push(p.value); // push pEnd.value
    return list;
  }

  // time: O(n) worst case because of the need to reposition 
  // the tail pointer.  Crying out for a DLL.
  // space: O(1) since were not creating any new nodes
  // splice(startPtr [,delete count [, item [, item...]]])
  // if delete count is omitted, list.tail = startPtr
  // if delete count runs off end of list, same as omitting it.
  // items added to list after deletions
  splice(startPtr, delCount, ...items) {
    if (this.head === null) return null;
    if (startPtr === null) return null;
    if (!delCount) { // truncate list at startPtr and return remainder
      if (startPtr === this.head) { // copy list set original to null
        const lp1 = new LinkedList();
        this.forEach(x => lp1.push(x));
        this.head = this.tail = null;
        return lp1;
      }
      // startPtr beyond head
      const l = new LinkedList();
      l.head = startPtr;
      l.tail = this.tail;
      let p = this.head;
      while (p.next !== startPtr) p = p.next;
      this.tail = p;
      return l;
    }

    // we have a delete count. could be zero. Not going to deal with
    // negative values at this time.
    if (delCount < 0) return null;

    // find node that points to strartPtr node
    let predPtr = this.head;
    if (startPtr !== this.head) {
      while (predPtr.next !== null && predPtr.next !== startPtr) {
        predPtr = predPtr.next;
      }
    }
    // the head has no predecessor node so needs special handling if
    // splice startPtr = this.head
    console.log('predPtr', predPtr, 'dc', delCount);
    if (predPtr === null) return null; // startPtr not in the list! 
    // predPtr points to node before startPtr
    const l2 = new LinkedList();
    console.log('loop');
    let p = startPtr; // p moves through nodes to be deleted
    for (let c = 0; c < delCount; c += 1) {
      console.log('p',p,'c',c);
      if (p === null) break; // ran off end of list
      l2.push(p.value);
      console.log('p.next',p.next);
      p = p.next; 
    }
    if (startPtr === this.head) this.head = predPtr;
    predPtr.next = p;
    console.log('done loop');
    console.log('p', p);
    console.log('predPtr', predPtr);
    console.log('l2', l2);
    console.log('this', JSON.stringify(this, null, 2));
    // l2 holds deleted values, this has those items removed
    if (items.length === 0) return l2;
    // const l2 = new LinkedList();
    // for (let cnt = 0; cnt < )
    return null;
  }
  /* eslint-enable */
};
