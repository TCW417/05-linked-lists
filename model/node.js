'use strict';

const Node = module.exports = class { /* eslint-disable-line */
  // time: O(1)
  // space: O(1)
  constructor(val) {
    this.value = (val !== undefined ? val : null);
    this.next = null;
    this.prev = null;
  }
};
