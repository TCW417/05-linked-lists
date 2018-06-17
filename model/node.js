'use strict';

const Node = module.exports = class { /* eslint-disable-line */
  constructor(val) {
    this.value = (val !== undefined ? val : null);
    this.next = null;
    this.prev = null;
  }
};
