![cf](http://i.imgur.com/7v5ASc8.png) lab 05 - Linked List Data Structure
====

[![Build Status](https://travis-ci.org/TCW417/05-linked-lists.svg?branch=master)](https://travis-ci.org/TCW417/05-linked-lists)

This lab implements the LinkedList and Node classes with associated Methods.

LinkedList objects are made up from Node objects.  The resulting list is a circular doubly-linked data structure supporting efficient list manipulation.

## Installation
 * Install node and npm
 * fork and clone, or just clone this repo on GitHub.com: https://github.com/TCW417/05-linked-lists
 * run npm i from the install directory
 * see __test__/linkedlist.tests.js for example use of each method
 * run "npm test" to execute all tests

## Data Structures
### Node
```
const Node = module.exports = class { /* eslint-disable-line */
  constructor(val) {
    this.value = (val !== undefined ? val : null);
    this.next = null;
    this.prev = null;
  }
};
```
The node module (model/node.js) exports class Node which implements a simple value-holding list member.  value is initialized to null or whatever valid RHS value is pass to the constructor.  next and prev properties are initially null, but will point to the next and previous items in the list once the instantiated node is inserted/added to the list.

### LinkedList
```
const LinkedList = module.exports = class { /* eslint-disable-line */
  constructor() {
    this.next = null;
    this.prev = null;
  }
};
```
The LinkedList constructor returns essentially a Node object without the value property. There is one of these objects per list and it is treated as the header, or sentinal node, of the list.  All methods supporting this data structure are attached to the LinkedList class. See below for more detail on available methods.

## Methods

## LinkedList.filter()
The `filter()` method returns a new list whose values result in the callback function returning true. The original list is not modified.
### Sample code
```
// Assuming list whose node values are integers,
// return list of all nodes with values >= 2

const filteredList = list.filter(v => v >= 2);
```
### Syntax
const newList = list.filter(callback); 

### Parameters
`callback`: Function which is used to test node values. Return true if the value should be retained in output list, false if not.  Taking  one parameter.
 * `value`: The value of the value property of the current list node.

### Return Value
A new list or null if no matching values are found.

### Notes
`filter` throws TypeError if callback is not a function.
---
## LinkedList.find()
The `find()` method returns the value of the first node in the list for which its predicate function returns true. The original list is not modified.

### Sample code
```
// Assuming list whose node values are `{ name, birthplace }`,
// return first value object whose birthplace is Tacoma.

const val = list.find(v => v.birthplace === 'Tacoma');
```
### Syntax
const newList = list.filter(callback [, returnNode]); 

### Parameters
`callback`: Function which is used to test node values. Return true if the value is a match, false if not.  Taking two parameters.
 * `value`: The value of the value property of the current list node.
 * `returnNode | optional`: if true returns pointer to node. Default: false.

### Return Value
The fist list value matching the callback function test, or a pointer to its node if returnNode is true. Null if nothing found.

### Notes
`find` throws TypeError if callback is not a function. returnNode need only be truthy to invoke the return pointer option.
---
## LinkedList.forEach()
The `forEach()` method executes a provided callback function on each member of the list. It does not modify the list itself, although the callback function may.

### Sample code
```
// Assuming list whose node values are integers,
// push their values squared into a new list.

const newList = new LinkedList();

list.forEach(v => newList.push(v * v));
```
### Syntax
list.forEach(callback); 

### Parameters
`callback`: Function which acts on node values. Its return value is ignored.   Taking one parameter.
 * `value`: The value of the value property of the current list node.

### Return Value
Returns undefined.

### Notes
`forEach` throws TypeError if callback is not a function. 
---
## LinkedList.map()
The `map()` method returns a new list whose values are the return value of a callback function that is passed the value of each node in the list. The original list is not modified.

### Sample code
```
// Assuming list whose node values are integers,
// build a new list whose values are strings.

const newList = new LinkedList();

list.map(v => `The value of this node is ${v}.`);
```
### Syntax
list.map(callback); 

### Parameters
`callback`: Function which acts on node values. Its return value is pushed into a new list.   Taking one parameter.
 * `value`: The value of the value property of the current list node.

### Return Value
Returns a new list with mapped values.

### Notes
`map` throws TypeError if callback is not a function. 
---
## LinkedList.pop()
The `pop()` method removes the last item in the list and returns its value. The original list is shortened by one node.

### Sample code
```
// Assuming list whose node values are integers,
// return the value of the last node in the list.

let v = list.pop();
```
### Syntax
list.pop(); 

### Parameters
None.

### Return Value
Returns the value of the last node in the list, whatever type it may be. Returns null if list is empty.

### Notes
---
## LinkedList.push()
The `push()` method adds nodes to the end of the list with the given values.

### Sample code
```
// Assuming list, add three values to its end.

list.push('foo', 'bar', 'buz');
```
### Syntax
list.push(item [, item [, item...]]); 

### Parameters
One or more values to be added to the end of the list.

### Return Value
None. Undefined.

### Notes
---
## LinkedList.reduce()
The `reduce()` method uses a callback to factor the node values in the list down to a single value.

### Sample code
```
// Assuming list filled with integers, return their product.

let prod = list.reduce((acc, curr) => acc * curr, 1);
```
### Syntax
list.reduce(callback() [, initialValue]); 

### Parameters
 * `callback` function to execute on each value in the list. takes two arguments:
   * `accumulator` accumulates return values of `callback`. Initially set to `initialValue` if supplied, or the value of the first node in the list otherwise.
   * `initialValue | optional` the initial value of the accumulator.

### Return Value
The accumulated results of the callback on list values.

### Notes
Throws TypeError if callback is not a function.
---
## LinkedList.remove()
The `remove()` method uses a callback determine which node to reove from the list. Removes the first match. Original list is shortened by one.

### Sample code
```
// Assuming list filled with integers, remove node with value === 5.

let removed = list.remove(v => v === 5);
```
### Syntax
list.remove(callback); 

### Parameters
 * `callback` function to execute on each value in the list. Returns true or false. First node whose value returns true is removed from the list.

### Return Value
The removed value.

### Notes
Throws TypeError if callback is not a function.
---
## LinkedList.shift()
The `shift()` method returns the value of the first node in the list. The node is removed resulting in the original list being shorter by one.

### Sample code
```
// Remove the first node from the list.

let shiftedValue = list.shift();
```
### Syntax
list.shift(); 

### Parameters
None.

### Return Value
The removed value or null if the list is empty.

### Notes
---
## LinkedList.slice()
The `slice()` method returns a new list made up of the nodes between the given start and end pointers.

### Sample code
```
// Assuming a list of sorted integers, return a new list
// starting at value 5 to the end of the list.

let fiveAndGreater = list.slice(list.find(v => v === 5, true));
```
### Syntax
list.slice([startPointer [, endPointer]]); 

### Parameters
 * `startPointer | optional` Pointer into list at which to start the slice. Defaults to the start of the list.
 * `endPointer | optional` Pointer to end of slice (value **excluded** from the slice). If left off, defaults to the end of the list (inclusive).

### Return Value
A new list of nodes.

### Notes
slice() makes a shallow copy of the list.  No checking is done to ensure that the pointers in fact point to nodes in the contextual list, nor that startPointer's node occurs before endPointer's.
---
"splice", "unshift"]


## To Submit this Assignment
  * fork this repository and work in a branch called `lab-05`
  * submit a pull request to your forked repository
  * Set up Travis CI on your forked repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Requirements  
#### Configuration  
  <!-- list of files, configurations, tools, etc that are required -->
  Your lab directory must include  
  * **README.md** -- with a documentation about your lab
  * **.gitignore** -- with a robust .gitignore
  * **.eslintrc** -- with the class .eslintrc file
  * **.eslintignore** -- with the class .eslintignore
  * **.package.json** -- with all dependencies and dev-dependencies
  * **lib/** -- directory for holding your programs helper modules
  * **__test__/** -- directory for holding your programs unit and integration tests

#### Testing  
  * write at least two test assertions for each method of your Linked List class
  * organize your tests into appropriate describe/it blocks for test output readability

####  Documentation  
  * in your README, write documentation for you data structures
  * your documentation should includes code block examples
  * provide instructions for:
    * installing and using your data structure
    * accessing each method
    * running your tests

#### Feature Tasks  
  * implement a `LinkedList` class which will use a `Node` class that you have also defined
  * implement a `pop()` on the LinkedList prototype
  * implement a `remove(value)` on the prototype
  * implement `map()` _or_ `reduce()` as pure methods on the LinkedList prototype
  * in comments above or within each function, note the Big-O time AND space complexity

## Bonus Points (not eligible on resubmits):
  * 1pt: test your Node class as well with at least two test assertions, one for a successful instantiation and another for unsuccessful instantiation
  * 2pts: refactor your Linked List class so `pop()` can have a constant / O(1) run time.
