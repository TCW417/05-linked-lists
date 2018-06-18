'use strict';

const Node = require('./node');

const LinkedList = module.exports = class { /* eslint-disable-line */
  constructor() {
    this.next = null;
    this.prev = null;
  }

  // time: O(1), or O(n) where n = val.length but assuming  
  // #args is much smaller than length of list I'd say O(1)
  // space: O(1) if you grant time as O(1)
  push(...val) { // add items to end of list
    val.forEach((item) => {
      // this.prev points to end of the list.
      if (this.prev === null) { // if ptr is null, list is empty
        this.prev = new Node(item);
        this.next = this.prev;
        this.prev.prev = this;
        this.next.next = this;
      } else { // list isn't empty. add to end (list head.prev)
        const p = new Node(item);
        this.prev.next = p;
        p.next = this;
        p.prev = this.prev;
        this.prev = p;
      }
    });
  }

  // time: O(1)
  // space: O(1)
  pop() { // remove item from end of list
    let ptr;
    if (this.prev === null) return null; // list is already empty
    if (this.prev === this.next) { // one item in list
      ptr = this.prev;
      this.prev = this.next = null;
    } else {
    // more than one item on the list.
      ptr = this.prev;
      this.prev = this.prev.prev;
      this.prev.next = this;
    }
    ptr.next = ptr.prev = null;
    return ptr.value;
  }

  // time: O(1)
  // space: O(1)
  shift() { // return node at head of list
    let ptr;
    if (this.next === null) return null; // list is already empty
    if (this.next === this.prev) { // one item in list
      ptr = this.next;
      this.next = this.prev = null;
    } else {
      // more than one item on the list.
      ptr = this.next;
      this.next = this.next.next;
      this.next.prev = this;
    }
    ptr.next = ptr.prev = null; // to aid garbage collection
    return ptr.value;
  }

  // time: O(1) (see push above re # of args)
  // space: O(1)
  unshift(...val) { // add ...val to head of list
    val.forEach((item) => {
      if (this.next === null) { // if ptr is null, list is empty
        this.next = new Node(item);
        this.prev = this.next;
        this.next.prev = this;
        this.prev.next = this;
      } else { // list isn't empty. add to end (list head.prev)
        const p = new Node(item);
        this.next.prev = p;
        p.next = this.next;
        p.prev = this;
        this.next = p;
      }
    });
  }

  // O(n) (assuming f is O(1), otherwise all bets are off)
  forEach(f) {
    if (typeof f !== 'function') throw TypeError;

    let ptr = this.next;
    while (ptr !== this) {
      f(ptr.value);
      ptr = ptr.next;
    }
  }
  
  // time: O(n), due to call to find method requiring scan of list.
  // space: O(1)
  remove(f) { // remove, return null or removed value
    if (typeof f !== 'function') throw TypeError;

    const ptr = this.find(f, true);

    if (ptr === null) return null; // empty list or not found

    if (ptr === this.next) { // match at head of list
      return this.shift();
    }

    if (ptr === this.prev) { // match and end of list
      return this.pop();
    }

    ptr.prev.next = ptr.next;
    ptr.next.prev = ptr.prev;
    ptr.prev = ptr.next = null;
    return ptr.value;
  }
  
  // time: O(n), not counting f's contribution
  // space: O(1)
  find(f, returnNode) { // return value of first node where f returns true
    // if returnNode === true return pointer to the node.
    if (typeof f !== 'function') throw TypeError;

    if (this.next === null) return null;
    let ptr = this.next;
    while (ptr !== this) {
      if (f(ptr.value)) return returnNode ? ptr : ptr.value;
      ptr = ptr.next;
    }
    return null; // not found;
  }

  // time: O(n), not counting f's contribution
  // space: O(n)
  map(f) { // return new list of nodes transformed by f run on this
    if (typeof f !== 'function') throw TypeError;

    const list = new LinkedList();
    let ptr = this.next;
    while (ptr !== this) {
      list.push(f(ptr));
      ptr = ptr.next;
    }
    return list;
  }

  // time: O(n)
  // space: O(1) (assuming f isn't making a new list
  // or something huge in acc)
  reduce(f, initVal) { // return result of accumulating f(list values)
    if (typeof f !== 'function') throw TypeError;

    if (this.next === null) return null; // empty list
    let ptr = this.next;
    let currentVal = initVal || ptr.value;
    if (initVal !== undefined); ptr = ptr.next;
    while (ptr !== this) {
      currentVal = f(currentVal, ptr.value);
      ptr = ptr.next;
    }
    return currentVal;
  }

  // time: O(n)
  // space: O(n) assuming worst case and f matches everything
  filter(f) { // return list for which f(value) === true
    if (typeof f !== 'function') throw TypeError;

    const list = new LinkedList();
    let ptr = this.next;
    while (ptr !== this) {
      if (f(ptr.value)) list.push(ptr.value);
      ptr = ptr.next;
    }
    return (list.next !== null ? list : null);
  }


  // time: O(n)
  // could argue for O(1) if you assume the slice is much
  // smaller than the list. 
  // space: O(n) where n is size of slice.
  // like time, could argue for O(1) if the slice is much smaller than the list.
  slice(pStart = this.next, pEnd = this.prev) { // return new list excluding pEnd.value
    if (this.next === null) return null; // empty list
    // I'm not catching the ase where someone uses pointers that aren't
    // to nodes in THIS.  I guess it'd be a range error... 
    const list = new LinkedList();
    let p = pStart;
    do {
      list.push(p.value);
      p = p.next;
    } while (p !== pEnd);
    if (pEnd === this.prev) list.push(p.value); // push pEnd.value
    return list;
  }

  // time: O(n) worst case even in this DLL version.
  // space: O(1) since were not creating any new nodes.
  // or... One might argue for O(n) since it's possible to insert
  // any number of new items into the list. 
  splice(startPtr, delCount, ...items) {
    const delNode = (dPtr) => {
      dPtr.prev.next = dPtr.next;
      dPtr.next.prev = dPtr.prev;
      return dPtr.value;
    };

    const insertList = (atPtr, inList) => {
      atPtr.next.prev = inList.prev;
      inList.prev.next = atPtr.next;
      atPtr.next = inList.next;
      inList.next.prev = atPtr;
    };

    if (this.next === null) return null; // empty list
    if (!startPtr) return null; // bad start pointer

    let returnList;
    let dp = startPtr;
    const startPtrPrev = startPtr.prev;

    if (delCount !== undefined && delCount >= 0) {
      returnList = new LinkedList();
      for (let cnt = 0; cnt < delCount; cnt += 1) {
        returnList.push(delNode(dp));
        dp = dp.next;
        if (dp === this) break; // deleted to end of list.
      }
    } else if (startPtr === this.next) {
      returnList = this.slice(); // copy the list
      this.next = this.prev = null; // empty the original list
    } else {
      returnList = this.slice(startPtr);
      dp = startPtr.prev;
      dp.next = this;
      this.prev = dp;
    }

    // insert items into list at startPtrPrev
    if (items.length > 0) {
      const itemsList = new LinkedList();
      itemsList.push(...items);
      insertList(startPtrPrev, itemsList);
    }

    return returnList; // return new list
  }

  toString(indent = 2) {
    function recurseOver(ptr, level) {
      if (!ptr.value) return null;
      const l = level + 1;
      // console.log(ptr.value.toString().padStart(l * indent, ' '));
      // recurseOver(ptr.next, l);
      // return null;
      return `{ value: ${ptr.value}\n`.padStart(l * indent, ' ') +
      `next: ${recurseOver(ptr.next, l)}`.padStart(l * indent, ' ');
    }
    if (this.next === null) return null;
    const level = 0;
    return recurseOver(this.next, level);
  }
};
