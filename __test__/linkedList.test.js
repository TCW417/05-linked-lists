'use strict';

const LinkedList = require('../model/linkedList');

const clj = (msg, js) => 
  console.log(msg, JSON.stringify(js, null, 2));

describe('LinkedList class tests', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
    list.push(1, 2, 3);
  });

  afterEach(() => {
    list = null;
  });

  test('#constructor ensure constructor returns proper object', () => {
    const ll = new LinkedList();
    expect(ll.head).toBeNull();
    expect(ll.tail).toBeNull();
  });

  test('#push test 0, beforeEach', () => {
    expect(list.head).not.toBeNull();
    expect(list.tail).not.toBeNull();
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
  });
  
  test('#push test 1', () => {
    list = new LinkedList();
    list.push(1);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
  });

  test('#push test 2', () => {
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
  });

  test('#pop test 0', () => {
    list = new LinkedList();
    const n = list.pop();
    expect(n).toBeNull();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('#pop test 1', () => {
    list = new LinkedList();
    list.push(1);
    const n = list.pop();
    expect(n.value).toEqual(1);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('#pop test 2', () => {
    list = new LinkedList();
    list.push(1);
    list.push(2);
    const n = list.pop();
    expect(n.value).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    expect(list.tail.next).toBeNull();
  });

  test('#pop test 3', () => {
    const n = list.pop();
    expect(n.value).toEqual(3);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(2);
    expect(list.tail.next).toBeNull();
  });

  test('#unshift test 1', () => {
    list = new LinkedList();
    list.unshift(1);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
  });

  test('#unshift test 2', () => {
    list.unshift(1, 2, 3);
    expect(list.head.value).toEqual(3);
    expect(list.tail.value).toEqual(3);
  });

  test('#shift test 0', () => {
    list = new LinkedList();
    const n = list.shift();
    expect(n).toBeNull();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('#shift test 2', () => {
    list = new LinkedList();
    list.unshift(1);
    list.unshift(2);
    const n = list.shift();
    expect(n.value).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    expect(list.tail.next).toBeNull();
  });

  test('#shift test 3', () => {
    const n = list.shift();
    expect(n.value).toEqual(1);
    expect(list.head.value).toEqual(2);
    expect(list.tail.value).toEqual(3);
    expect(list.tail.next).toBeNull();
  });

  test('#forEach', () => {
    const a = [];
    list.forEach(el => a.push(el + 10));
    expect(a[0]).toEqual(11);
    expect(a[2]).toEqual(13);
  });

  test('#remove test 1', () => {
    list.remove((x) => {
      return x === 1; // head of list
    });
    expect(list.head.value).toEqual(2);
    expect(list.tail.value).toEqual(3);
  });

  test('#remove test 2', () => {
    list.remove((x) => {
      return x === 2; // head of list
    });
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
  });

  test('#remove test 3', () => {
    list.remove((x) => {
      return x === 3; // head of list
    });
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(2);
  });

  test('#remove test 4', () => {
    list.remove((x) => {
      return x === 1; // head of list
    });
    list.remove((x) => {
      return x === 2; // head of list
    });
    expect(list.head.value).toEqual(3);
    expect(list.tail.value).toEqual(3);
  });

  test('#remove test 5', () => {
    list.remove((x) => {
      return x === 2; // head of list
    });
    list.remove((x) => {
      return x === 3; // head of list
    });
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
  });

  test('#remove test 6', () => {
    list.remove((x) => {
      return x === 1; // head of list
    });
    list.remove((x) => {
      return x === 2; // head of list
    });
    list.remove((x) => {
      return x === 3; // head of list
    });
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  test('#find test 1', () => {
    const n = list.find((x) => {
      return x === 1;
    });
    expect(n.value).toEqual(1);
  });

  test('#find test 2', () => {
    const n = list.find((x) => {
      return x === 2;
    });
    expect(n.value).toEqual(2);
  });

  test('#map test 1', () => {
    const nList = list.map((n) => {
      return `v: ${n.value}`;
    });
    expect(nList.head.value).toEqual('v: 1');
    expect(nList.head.next.value).toEqual('v: 2');
    expect(nList.tail.value).toEqual('v: 3');
  });

  test('#reduce test 1', () => {
    const x = list.reduce((acc, curr) => acc + curr, 0);
    expect(x).toEqual(6);
  });

  test('#filter test 1', () => {
    const nList = list.filter(x => x >= 2);
    expect(nList.head.value).toEqual(2);
    expect(nList.tail.value).toEqual(3);
  });

  test('#filter test 2', () => {
    const nList = list.filter(x => x < 2);
    expect(nList.head.value).toEqual(1);
    expect(nList.tail.value).toEqual(1);
  });

  test('#filter test 3', () => {
    const nList = list.filter(x => x > 3);
    expect(nList).toBeNull();
  });

  test('#slice test 1', () => {
    const p1 = list.find(x => x === 1);
    const p2 = list.find(x => x === 2);
    expect(p1.value).toEqual(1);
    expect(p2.value).toEqual(2);
    const nList = list.slice(p1, p2);
    expect(nList.head.value).toEqual(1);
    expect(nList.tail.value).toEqual(2);
  });
  
  test('#slice test 2', () => {
    const nList = list.slice();
    expect(nList.head.value).toEqual(1);
    expect(nList.tail.value).toEqual(3);
  });

  test('#slice test 3', () => {
    const p1 = list.find(x => x === 2);
    const nList = list.slice(p1);
    expect(nList.head.value).toEqual(2);
    expect(nList.tail.value).toEqual(3);
  });

  /* eslint-disable */
  test('#splice test 1, no dc, p in middle', () => { 
    list.push(4, 5);
    const p = list.find((x => x === 3));
    const x = list.splice(p);
    expect(list.tail.value).toEqual(2);
    expect(x.head.value).toEqual(3);
    expect(x.tail.value).toEqual(5);
  });

  test('#splice test 2, no dc, p == tail', () => {
    list.push(4, 5);
    const p = list.tail;
    const x = list.splice(p);
    expect(list.tail.value).toEqual(4);
    expect(x.head.value).toEqual(5);
    expect(x.tail.value).toEqual(5);
  });

  test('#splice test 3, no dc, p == head', () => {
    const p = list.head;
    const x = list.splice(p);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(x.head.value).toEqual(1);
    expect(x.tail.value).toEqual(3);
  });

  test('#splice test 4, dc = 1, p != head', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 4);
    const x = list.splice(p, 1);
    expect(list.tail.value).toEqual(5);
    expect(x.head.value).toEqual(4);
    expect(x.tail.value).toEqual(4);
  });

  test.only('#splice test 5, dc = 2, p = head', () => { 
    list.push(4, 5);
    const p = list.head;
    const x = list.splice(p, 2);
    clj('t5, post, list', list);
    clj('t5, post, return value', x);
    expect(list.tail.value).toEqual(5);
    expect(list.head.value).toEqual(3);
    expect(x.head.value).toEqual(1);
    expect(x.tail.value).toEqual(2);
  });

  test('#splice test 6, dc = 3, p = "3"', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 3);
    const x = list.splice(p, 3);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(2);
    expect(x.head.value).toEqual(3);
    expect(x.tail.value).toEqual(5);
  });

});
