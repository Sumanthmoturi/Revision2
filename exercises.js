//Reverse an array
function reverseArray(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
      output.push(array[i]);
    }
    return output;
  }
  
  function reverseArrayInPlace(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      let old = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = old;
    }
    return array;
  }
  
console.log(reverseArray(["A", "B", "C"]));       // output:- ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);                          // output:- [5, 4, 3, 2, 1]



//A list
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
      list = {value: array[i], rest: list};
    }
    return list;
  }
  
  function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
      array.push(node.value);
    }
    return array;
  }
  
  function prepend(value, list) {
    return {value, rest: list};
  }
  
  function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
  }
  
console.log(arrayToList([10, 20]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));             //output:- 20


//Deep comparison
function deepEqual(a, b) {
    if (a === b) return true;
    
    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object") return false;
  
    let keysA = Object.keys(a), keysB = Object.keys(b);
  
    if (keysA.length != keysB.length) return false;
  
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
  
    return true;
  }
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));         //true
console.log(deepEqual(obj, {here: 1, object: 2}));   //false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));  //true


//Your own loop

function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
      body(value);
    }
  }
  
  loop(3, n => n > 0, n => n - 1, console.log);
  // 3
  // 2
  // 1


//Iterable groups
class Group {
    #members = [];
  
    add(value) {
      if (!this.has(value)) {
        this.#members.push(value);
      }
    }
  
    delete(value) {
      this.#members = this.#members.filter(v => v !== value);
    }
  
    has(value) {
      return this.#members.includes(value);
    }
  
    static from(collection) {
      let group = new Group;
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  
    [Symbol.iterator]() {
      return new GroupIterator(this.#members);
    }
  }
  
  class GroupIterator {
    #members;
    #position;
  
    constructor(members) {
      this.#members = members;
      this.#position = 0;
    }
  
    next() {
      if (this.#position >= this.#members.length) {
        return {done: true};
      } else {
        let result = {value: this.#members[this.#position],
                      done: false};
        this.#position++;
        return result;
      }
    }
  }
  
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  //a
  //b
  //c


//Object example
let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
//output:true


//Regular expression example
let text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\P{L})'|'(\P{L}|$)/gu, '$1"$2'));