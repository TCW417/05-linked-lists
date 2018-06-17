'use strict';

/* eslint-disable */
const dumpList = (msg, list) => {
  const temp = list.slice();
  temp.prev.next = null;
  temp.prev = null;
  let p = temp.next;
  while (p !== null) {
    p.prev = null;
    p = p.next;
  }
  console.log('DUMP: ' + msg);
  console.log(JSON.stringify(temp, null, 2));
  console.log('END OF DUMP');
};
/* eslint-enable */

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

  // time: O(n). Even with a tail pointer this is O(n) because
  // I have to find the note to point tail at when
  // the pop is complete.  If I have time I'll do a DLL
  // version of this class where this will be O(1)
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
    let ptr = this.next;
    while (ptr !== this) {
      f(ptr.value);
      ptr = ptr.next;
    }
  }
  
  // time: O(n), not counting f's contribution
  // space: O(1)
  remove(f) { // remove, return null or removed value
    const findPtr = (f) => { // return pointer to first node for which f returns true
      if (this.next === null) return null;
      let ptr = this.next;
      while (ptr !== this) {
        if (f(ptr.value)) return ptr;
        ptr = ptr.next;
      }
      return null; // not found;
    };

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
    const list = new LinkedList();
    let ptr = this.next;
    while (ptr !== this) {
      if (f(ptr.value)) list.push(ptr.value);
      ptr = ptr.next;
    }
    return (list.next !== null ? list : null);
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
  slice(pStart = this.next, pEnd = this.prev) { // return new list excluding pEnd.value
    if (this.next === null) return null; // empty list
    const list = new LinkedList();
    let p = pStart;
    do {
      list.push(p.value);
      p = p.next;
    } while (p !== pEnd);
    if (pEnd === this.prev) list.push(p.value); // push pEnd.value
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
    // console.log('startPtr.value', startPtr.value);
    // console.log('startPtrPrev.value', startPtrPrev.value);
    // console.log('startPointerPrev instanceof Node?', startPtrPrev instanceof Node);

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

    // dumpList('returnList before insert steps', returnList);
    // dumpList('this prior to insert step', this);
    // insert items into list at startPtrPrev
    if (items.length > 0) {
      // if (startPtrPrev === this) { // unshift into head of list
      //   this.unshift(...items);
      // } 
      const itemsList = new LinkedList();
      itemsList.push(...items);
      // dumpList('itemsList', itemsList);
      insertList(startPtrPrev, itemsList);
      // dumpList(' this after insertList', this);
    }

    return returnList; // return new list
  }

//   splice(startPtr, delCount, ...items) {
//     if (this.next === null) return null;
//     if (startPtr === null) return null;
//     if (delCount === undefined) { // truncate list at startPtr and return remainder
//       if (startPtr === this.next) { // copy list set original to null
//         const l1 = new LinkedList();
//         this.forEach(x => l1.push(x));
//         this.next = this.tail = null;
//         return l1; // l1: return list when returning a copy of the list
//         // not sure what behavior is needed here... Need to experiment
//         // with array.splice.
//       }
//       // startPtr beyond head
//       const l2 = new LinkedList();
//       l2.next = startPtr;
//       l2.tail = this.tail;
//       let p = this.next;
//       while (p.next !== startPtr) p = p.next;
//       this.tail = p;
//       return l2; // l2: return list when splicing from node 2 or greater
//       // with no delete count (startPtr to end of list)
//     }

//     // we have a delete count. could be zero. Not going to deal with
//     // negative values at this time.
//     if (delCount < 0) return null;

//     let predPtr; // predecessor pointer that we'll need after this if block
//     const l3 = new LinkedList(); // return after then next two blocks 
// /* eslint-disable */
//     // if (delCount >= 0) {
//       // find node that points to strartPtr node
//       // note that if startPtr == this.next (the node pointed
//       // to by the LL header, predPtr starts out pointing
//       // at the list object, not a node object)
      
//       if (startPtr === this.next) {
//         // startPtr points to first node in list
//         predPtr = this; // list object is pred "node"
//       } else {
//         // startPtr is at least one node beyond first node
//         predPtr = this.next; // first node is predecessor
//         while (predPtr !== null && predPtr.next !== startPtr) {
//           predPtr = predPtr.next;
//         }
//       }
//       if (predPtr === null) return null; // startPtr not of this list!

//       console.log('predPtr', predPtr, 'dc', delCount);
//       // predPtr points to node before startPtr
    
//       // console.log('loop');
//       let p = startPtr; // p moves through nodes to be deleted
//       for (let c = 0; c < delCount; c += 1, p = p.next) {
//         if (p === null) break; // ran off end of list
//         // console.log('p',p,'c',c);
//         l3.push(p.value);
//       }
//       console.log('post loop, p:', p);
//       predPtr.next = p;
//       // if predPtr.next is null, we've cut off the tail. reset it.
//       if (predPtr.next === null) this.tail = predPtr;
//       // console.log('done loop');
//       // console.log('p', p);
//       console.log('predPtr', predPtr);
//       // console.log('l2', l3);
//       // console.log('this', JSON.stringify(this, null, 2));
//       // l2 holds deleted values, this has had those items removed
//       // console.log('at end of pruning section',items);
//       if (items.length === 0) return l3; // nothing to insert so return l3
//     // }
//     // at this point this has had delCount items removed starting at startPtr.
//     // predPtr points to node after which items should be inserted.
//     // console.log('predPtr after removing slice from list',predPtr);
//     // console.log('this before insertions:',JSON.stringify(this, null, 2));
//     // console.log('predPtr instance of LL?', predPtr instanceof LinkedList);
//     const l4 = new LinkedList();
//     items.forEach((x) => {
//       l4.push(x);
//     });
//     // console.log('l4 items into list',JSON.stringify(l4, null, 2));
//     l4.tail.next = predPtr.next;
//     predPtr.next = l4.next;
//     if (!this.tail) this.tail = l4.tail;
//     // console.log('the list after adding items:',JSON.stringify(this, null, 2));

//     return l3;
//   }
  /* eslint-enable */
};
