'use strict';

const LinkedList = require('../model/linkedList');

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
    expect(ll.next).toBeNull();
    expect(ll.prev).toBeNull();
  });

  test('#push test 0, into empty list', () => {
    const lst = new LinkedList();
    lst.push(5);
    expect(lst.next.value).toEqual(5);
    expect(lst.prev.value).toEqual(5);
    expect(lst.next).toEqual(lst.prev);
  });

  test('#push test 1, beforeEach', () => {
    const lst = new LinkedList();
    lst.push(1);
    lst.push(2);
    expect(lst.next).not.toBeNull();
    expect(lst.prev).not.toBeNull();
    expect(lst.next.value).toEqual(1);
    expect(lst.prev.value).toEqual(2);
    expect(lst.prev.prev.value).toEqual(1);
    expect(lst.next.next.value).toEqual(2);
  });
  
  test('#push test 2', () => {
    list.push(10, 11, 12);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(12);
    expect(list.prev.prev.value).toEqual(11);
  });

  test('#push test 3', () => {
    list.push(10, 20, 30, 40, 50);
    expect(list.next.value).toEqual(1);
    expect(list.next.next.value).toEqual(2);
    expect(list.prev.value).toEqual(50);
  });

  test('#push test 4', () => {
    list.push(...[10, 20, 30, 40, 50]);
    expect(list.next.value).toEqual(1);
    expect(list.next.next.value).toEqual(2);
    expect(list.prev.value).toEqual(50);
  });

  test('#pop test 0', () => {
    list = new LinkedList();
    const n = list.pop();
    expect(n).toBeNull();
    expect(list.next).toBeNull();
    expect(list.prev).toBeNull();
  });

  test('#pop test 1', () => {
    list = new LinkedList();
    list.push(1);
    const n = list.pop();
    expect(n).toEqual(1);
    expect(list.next).toBeNull();
    expect(list.prev).toBeNull();
  });

  test('#pop test 2', () => {
    list = new LinkedList();
    list.push(1);
    list.push(2);
    const n = list.pop();
    expect(n).toEqual(2);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(1);
    expect(list.prev.next).toEqual(list);
    expect(list.next.prev).toEqual(list);
  });

  test('#pop test 3', () => {
    const n = list.pop();
    expect(n).toEqual(3);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(2);
    expect(list.prev.next).toEqual(list);
  });

  test('#pop test 4', () => {
    const x = list.pop();
    const y = list.pop();
    expect(x).toEqual(3);
    expect(y).toEqual(2);
    expect(list.next.value).toEqual(1);
    expect(list.next).toEqual(list.prev);
  });

  test('#pop test 5', () => {
    list.push(4, 5, 6);
    list.pop();
    list.pop();
    list.pop();
    list.pop();
    list.pop();
    expect(list.next.value).toEqual(1); 
    expect(list.next).toEqual(list.prev);
    list.push(2, 3, 10, 100, 1000); 
    list.pop();
    list.pop();
    expect(list.prev.value).toEqual(10);
    list.unshift(10, 20, 30);
  });

  test('#unshift test 1', () => {
    list = new LinkedList();
    list.unshift(1);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(1);
    expect(list.prev).toEqual(list.next);
  });

  test('#unshift test 2', () => {
    list.unshift(1, 2, 3, 10, 11, 12);
    expect(list.next.value).toEqual(12);
    expect(list.prev.value).toEqual(3);
  });

  test('#shift test 1', () => {
    list = new LinkedList();
    const n = list.shift();
    expect(n).toBeNull();
    expect(list.next).toBeNull();
    expect(list.prev).toBeNull();
  });

  test('#shift test 2', () => {
    const lst = new LinkedList();
    lst.push(1);
    const n = lst.shift();
    expect(n).toEqual(1);
    expect(lst.next).toBeNull();
    expect(lst.prev).toBeNull();
  });

  test('#shift test 3', () => {
    list.pop();
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(2);
    const n = list.shift();
    expect(n).toEqual(1);
    expect(list.prev).toEqual(list.next);
    expect(list.next.value).toEqual(2);
    expect(list.prev.value).toEqual(2);
  });

  test('#shift/push/pop/unshift', () => {
    // list is 1, 2, 3
    list.push(4, 5, 6);
    list.unshift(0, -1, -2, -3);
    // list should be
    // -3, -2, -1, 0, 1, 2, 3, 4, 5, 6
    expect(list.next.value).toEqual(-3);
    expect(list.prev.value).toEqual(6);
    expect(list.pop()).toEqual(6);
    expect(list.shift()).toEqual(-3);
    expect(list.next.value).toEqual(-2);
    expect(list.prev.value).toEqual(5);
    expect(list.pop()).toEqual(5); // 5
    expect(list.prev.value).toEqual(4);
    expect(list.pop()).toEqual(4); // 4
    list.shift(); // -2
    list.shift(); // -1
    expect(list.pop()).toEqual(3);
    expect(list.shift()).toEqual(0);
  });

  test('#shift test 4', () => {
    list.unshift(10);
    list.push(20);
    // 10, 1, 2, 3, 20
    const n = list.shift();
    expect(n).toEqual(10);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(20);
    expect(list.prev.prev.value).toEqual(3);
  });

  test('#forEach', () => {
    const a = [];
    list.forEach(el => a.push(el + 10));
    expect(a[0]).toEqual(11);
    expect(a[2]).toEqual(13);
  });

  test('#forEach bad callback', () => {
    expect(() => { list.forEach('not a function'); }).toThrowError();
  });

  test('#remove test 1', () => {
    const lst = new LinkedList();
    expect(lst.remove(x => x || true)).toBeNull();
  });

  test('#remove test 1.5', () => {
    const y = list.remove(x => x === 1); // head of list
    expect(list.next.value).toEqual(2);
    expect(list.prev.value).toEqual(3);
    expect(y).toEqual(1);
  });

  test('#remove test 2', () => {
    const y = list.remove(x => x === 2); // middle
    expect(y).toEqual(2);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(3);
  });

  test('#remove test 3', () => {
    const y = list.remove(x => x === 3); // end
    expect(y).toEqual(3);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(2);
  });

  test('#remove test 4', () => {
    list.remove(x => x === 2);
    list.remove(x => x === 1);
    expect(list.next.value).toEqual(3);
    expect(list.prev.value).toEqual(3);
  });

  test('#remove test 5', () => {
    list.push(4);
    list.remove(x => x === 3);
    list.remove(x => x === 1);
    expect(list.next.value).toEqual(2);
    expect(list.prev.value).toEqual(4);
  });

  test('#remove test 6', () => {
    list.remove(x => x === 2);
    list.remove(x => x === 3);
    list.remove(x => x === 1);
    expect(list.next).toBeNull();
    expect(list.prev).toBeNull();
  });

  test('#remove bad callback', () => {
    expect(() => { list.remove('not a function'); }).toThrowError();
  });

  test('#find test 1', () => {
    const n = list.find(x => x === 1);
    expect(n).toEqual(1);
  });

  test('#find test 2', () => {
    const n = list.find(x => x === 3);
    expect(n).toEqual(3);
  });

  test('#find test 3', () => {
    const n = list.find(x => x === 2, true);
    expect(n.value).toEqual(2);
  });

  test('#find test 3.5', () => {
    expect(list.find(x => x === 'not there')).toBeNull();
  });

  test('#find bad callback', () => {
    expect(() => { list.find('not a function'); }).toThrowError();
  });

  test('#map test 1', () => {
    const nList = list.map((n) => {
      return `v: ${n.value}`;
    });
    expect(nList.next.value).toEqual('v: 1');
    expect(nList.next.next.value).toEqual('v: 2');
    expect(nList.prev.value).toEqual('v: 3');
  });

  test('#map bad callback', () => {
    expect(() => { list.map('not a function'); }).toThrowError();
  });

  test('#reduce test 1', () => {
    list.unshift(0);
    const product = list.reduce((accumulator, current) => accumulator * current);
    expect(product).toEqual(0);
  });

  test('#reduce test 2', () => {
    const x = list.reduce((acc, curr) => acc + curr);
    expect(x).toEqual(6);
  });

  test('#reduce test 3', () => {
    const x = list.reduce((acc, curr) => acc * curr, 10);
    expect(x).toEqual(60);
  });

  test('#reduc test 4', () => {
    const lst = new LinkedList();
    expect(lst.reduce((acc, curr) => acc + curr + 1)).toBeNull();
  });

  test('#reduce bad callback', () => {
    expect(() => { list.reduce('not a function'); }).toThrowError();
  });

  test('#filter test 1', () => {
    const nList = list.filter(x => x >= 2);
    expect(nList.next.value).toEqual(2);
    expect(nList.prev.value).toEqual(3);
  });

  test('#filter test 2', () => {
    const nList = list.filter(x => x < 2);
    expect(nList.next.value).toEqual(1);
    expect(nList.prev.value).toEqual(1);
  });

  test('#filter test 3', () => {
    const nList = list.filter(x => x > 3);
    expect(nList).toBeNull();
  });

  test('#filter bad callback', () => {
    expect(() => { list.filter('not a function'); }).toThrowError();
  });

  test('#slice test 1', () => {
    const p1 = list.find(x => x === 1, true);
    const p2 = list.find(x => x === 2, true);
    expect(p1.value).toEqual(1);
    expect(p2.value).toEqual(2);
    const nList = list.slice(p1, p2);
    expect(nList.next.value).toEqual(1);
    expect(nList.prev.value).toEqual(1);
  });
  
  test('#slice test 2', () => {
    const nList = list.slice();
    expect(nList.next.value).toEqual(1);
    expect(nList.prev.value).toEqual(3);
  });

  test('#slice test 3', () => {
    list.push(4);
    list.push(5);
    const p1 = list.find(x => x === 2, true);
    expect(p1.value).toEqual(2);
    const nList = list.slice(p1);
    expect(nList.next.value).toEqual(2);
    expect(nList.prev.value).toEqual(5);
  });

  test('#slice test 4', () => {
    const lst = new LinkedList();
    const nList = lst.slice();
    expect(nList).toBeNull();
  });  

  test('#splice test 1, no dc, p in middle', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 3, true);
    expect(p.value).toEqual(3);
    const x = list.splice(p);
    expect(list.prev.value).toEqual(2);
    expect(x.next.value).toEqual(3);
    expect(x.prev.value).toEqual(5);
  });

  test('#splice test 2, no dc, p == tail', () => {
    list.push(4, 5);
    const p = list.prev;
    const x = list.splice(p);
    expect(list.prev.value).toEqual(4);
    expect(x.next.value).toEqual(5);
    expect(x.prev.value).toEqual(5);
  });

  test('#splice test 3, no dc, p == head', () => {
    const p = list.next;
    const x = list.splice(p);
    expect(list.next).toBeNull();
    expect(list.prev).toBeNull();
    expect(x.next.value).toEqual(1);
    expect(x.prev.value).toEqual(3);
  });

  test('#splice test 4, dc = 1, p = tail', () => { 
    list.push(4, 5);
    const p = list.prev.prev;
    const x = list.splice(p, 1);
    expect(list.prev.value).toEqual(5);
    expect(x.next.value).toEqual(4);
    expect(x.prev.value).toEqual(4);
  });

  test('#splice test 5, dc = 2, p = head', () => { 
    list.push(4, 5);
    const p = list.next;
    const x = list.splice(p, 2);
    expect(list.prev.value).toEqual(5);
    expect(list.next.value).toEqual(3);
    expect(x.next.value).toEqual(1);
    expect(x.prev.value).toEqual(2);
  });

  test('#splice test 6, dc = 2, p = "3"', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 3, true);
    const x = list.splice(p, 2);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(5);
    expect(x.next.value).toEqual(3);
    expect(x.prev.value).toEqual(4);
  });

  test('#splice test 7, dc = 4, p = "1"', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 1, true);
    const x = list.splice(p, 4);
    expect(list.next.value).toEqual(5);
    expect(list.prev.value).toEqual(5);
    expect(x.next.value).toEqual(1);
    expect(x.prev.value).toEqual(4);
  });  
  
  test('#splice test 8, dc = 6, p = "2"', () => { 
    list.push(4, 5);
    const p = list.find(x => x === 2, true);
    const x = list.splice(p, 6);
    expect(list.next.value).toEqual(1);
    expect(list.prev.value).toEqual(1);
    expect(x.next.value).toEqual(2);
    expect(x.prev.value).toEqual(5);
  });

  test('#splice test 9, dc = 0, p = "1", items = [10, 11, 12]', () => {
    const p = list.splice(list.next, 0, 10, 11, 12);
    expect(p.next).toBeNull();
    expect(list.prev.value).toEqual(3);
    expect(list.next.value).toEqual(10);
  });

  test('#splice test 10, dc = 3, p = "1", items = [10, 11, 12]', () => {
    const p = list.splice(list.next, 3, 10, 11, 12);
    expect(p.next.value).toEqual(1);
    expect(list.prev.value).toEqual(12);
    expect(list.next.value).toEqual(10);
  });

  test('#splice test 11, dc = 0, p = "3", items = [10, 11, 12]', () => {
    const p = list.splice(list.tail, 0, 10, 11, 12);
    expect(p).toBeNull();
    expect(list.prev.value).toEqual(3);
    expect(list.next.value).toEqual(1);
  });

  test('#splice test 12, dc = 1, p = "3", items = [10, 11, 12]', () => {
    const p = list.splice(list.prev, 1, 10, 11, 12);
    expect(p.next.value).toEqual(3);
    expect(list.prev.value).toEqual(12);
    expect(list.next.value).toEqual(1);
  });

  test('#splice test 13, empty list', () => {
    const lst = new LinkedList();
    const p = lst.splice(lst.next, 1, 2, 3, 4);
    expect(p).toBeNull();
  });
});
