const state = {
  customerHappiness: 50,
  techDebs: 25
};

Object.defineProperty(state, "noop", {
  get: function() {
    console.log("get it");
    return 42;
  },
  set: function(value) {
    console.log("set: ", value);
  }
});

console.log(state.noop);
state.noop = 123;
console.log(state.noop);

// get it
// 42
// set:  123
// get it
// 42

function get(object, property) {
  console.log("get it");
  return 42;
}
function set(object, property, value) {
  console.log("set: ", value);
}

console.log(get(state, "noop"));
set(state, "noop", 123);
console.log(get(state, "noop"));

// get it
// 42
// set:  123
// get it
// 42

const handler = {
  get: function(obj, prop) {
    console.log("get it");
    return 42;
  },
  set: function(obj, prop, value) {
    console.log("set: ", value);
  }
};

const proxy = new Proxy(state, handler);
console.log(proxy.noop);
proxy.noop = 123;
console.log(proxy.noop);

// get it
// 42
// set:  123
// get it
// 42
