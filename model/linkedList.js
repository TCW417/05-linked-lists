'use strict';

const Node = require('./node');

const LinkedList = module.exports = class { /* eslint-disable-line */
  constructor() {
    this.next = null;
    this.tail = null;
  }

  // O(n) (assuming f is O(1), otherwise all bets are off)
  forEach(f) {
    let ptr = this.next;
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
        this.next = this.tail;
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
    if (this.next.next === null) { // one item in list
      const ptr = this.next;
      this.next = this.tail = null;
      return ptr;
    }
    let ptr = this.next; // at least two items in list
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
    let ptr = this.next;
    if (this.next === null) return null; // empty list
    if (f(this.next.value)) { // match at head of list
      this.next = this.next.next;
      if (this.tail === ptr) this.tail = this.next;
      return ptr;
    }
    let trailPtr = this.next;
    ptr = this.next.next;
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
    let ptr = this.next;
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
    let ptr = this.next;
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
    let ptr = this.next;
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
    let ptr = this.next;
    while (ptr !== null) {
      if (f(ptr.value)) list.push(ptr.value);
      ptr = ptr.next;
    }
    return (list.next !== null ? list : null);
  }

  // time: O(1)
  // space: O(1)
  shift() { // return node at head of list
    const ptr = this.next;
    if (ptr) {
      this.next = this.next.next;
    }
    return ptr;
  }

  // time: O(1) (see push above re # of args)
  // space: O(1)
  unshift(...val) { // add ...val to head of list
    val.forEach((item) => {
      if (!this.next) {
        this.next = new Node(item);
        this.tail = this.next;
      } else {
        const ptr = new Node(item);
        ptr.next = this.next;
        this.next = ptr;
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
  slice(pStart = this.next, pEnd = this.tail) { // return new list including p.End.value
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
    if (this.next === null) return null;
    if (startPtr === null) return null;
    if (delCount === undefined) { // truncate list at startPtr and return remainder
      if (startPtr === this.next) { // copy list set original to null
        const l1 = new LinkedList();
        this.forEach(x => l1.push(x));
        this.next = this.tail = null;
        return l1; // l1: return list when returning a copy of the list
        // not sure what behavior is needed here... Need to experiment
        // with array.splice.
      }
      // startPtr beyond head
      const l2 = new LinkedList();
      l2.next = startPtr;
      l2.tail = this.tail;
      let p = this.next;
      while (p.next !== startPtr) p = p.next;
      this.tail = p;
      return l2; // l2: return list when splicing from node 2 or greater
      // with no delete count (startPtr to end of list)
    }

    // we have a delete count. could be zero. Not going to deal with
    // negative values at this time.
    if (delCount < 0) return null;

    let predPtr; // predecessor pointer that we'll need after this if block
    const l3 = new LinkedList(); // return after then next two blocks 
/* eslint-disable */
    // if (delCount >= 0) {
      // find node that points to strartPtr node
      // note that if startPtr == this.next (the node pointed
      // to by the LL header, predPtr starts out pointing
      // at the list object, not a node object)
      
      if (startPtr === this.next) {
        // startPtr points to first node in list
        predPtr = this; // list object is pred "node"
      } else {
        // startPtr is at least one node beyond first node
        predPtr = this.next; // first node is predecessor
        while (predPtr !== null && predPtr.next !== startPtr) {
          predPtr = predPtr.next;
        }
      }
      if (predPtr === null) return null; // startPtr not of this list!

      console.log('predPtr', predPtr, 'dc', delCount);
      // predPtr points to node before startPtr
    
      // console.log('loop');
      let p = startPtr; // p moves through nodes to be deleted
      for (let c = 0; c < delCount; c += 1, p = p.next) {
        if (p === null) break; // ran off end of list
        // console.log('p',p,'c',c);
        l3.push(p.value);
      }
      console.log('post loop, p:', p);
      predPtr.next = p;
      // if predPtr.next is null, we've cut off the tail. reset it.
      if (predPtr.next === null) this.tail = predPtr;
      // console.log('done loop');
      // console.log('p', p);
      console.log('predPtr', predPtr);
      // console.log('l2', l3);
      // console.log('this', JSON.stringify(this, null, 2));
      // l2 holds deleted values, this has had those items removed
      // console.log('at end of pruning section',items);
      if (items.length === 0) return l3; // nothing to insert so return l3
    // }
    // at this point this has had delCount items removed starting at startPtr.
    // predPtr points to node after which items should be inserted.
    // console.log('predPtr after removing slice from list',predPtr);
    // console.log('this before insertions:',JSON.stringify(this, null, 2));
    // console.log('predPtr instance of LL?', predPtr instanceof LinkedList);
    const l4 = new LinkedList();
    items.forEach((x) => {
      l4.push(x);
    });
    // console.log('l4 items into list',JSON.stringify(l4, null, 2));
    l4.tail.next = predPtr.next;
    predPtr.next = l4.next;
    if (!this.tail) this.tail = l4.tail;
    // console.log('the list after adding items:',JSON.stringify(this, null, 2));

    return l3;
  }
  /* eslint-enable */
};
