// insert

Array.prototype.insert = function(index, value) {
  return index >= this.length ? this.push(value) : this.splice(index, 0, value);
};

// shuffle

// sample

// reject
