function triggerReactions() {
  reactions.forEach(reaction => reaction());
}

function wrapper(fn) {
  return function(...args) {
    const result = fn(...args);
    triggerReactions();
    return result;
  };
}

// TODO: monkey-patch Timers, addEventListener, xhr etc
const originalSetTimeout = global.setTimeout;
global.setTimeout = (callback, ...args) =>
  originalSetTimeout(wrapper(callback), ...args);

const reactions = [];

function addReaction(fn) {
  reactions.push(fn);
}

// Dont use in prod
const deepCopy = structure => JSON.parse(JSON.stringify(structure));
const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const memoizeDeep = fn => {
  let previousArg;
  let previousRes;

  return arg => {
    if (deepEqual(arg, previousArg)) {
      return previousRes;
    } else {
      previousArg = deepCopy(arg);
      previousRes = fn(arg);
      return previousRes;
    }
  };
};

function connectMutable(state, mapState, render) {
  const memoizedRender = memoizeDeep(render);
  return () => {
    const mappedState = mapState(state);
    memoizedRender(mappedState);
  };
}

module.exports = {
  addReaction,
  connectMutable
};
