// TODO: pub/sub
function createStore(initialState) {
  let state = initialState;
  let listeners = [];

  function updateState(mapper) {
    state = mapper(state);
    listeners.forEach(listener => listener());
  }

  // without unsub, can mutate listener, isDispatching
  function subscribe(newListener) {
    listeners.push(newListener);
  }

  function getState() {
    return state;
  }

  return {
    updateState,
    subscribe,
    getState
  };
}

const memoizeStrict = fn => {
  let previousArg;
  let previousRes;

  return arg => {
    if (arg === previousArg) {
      return previousRes;
    } else {
      previousArg = arg;
      previousRes = fn(arg);
      return previousRes;
    }
  };
};

function connectImmutable(store, mapState, render) {
  const memoizedComponent = memoizeStrict(render);
  return () => {
    const mappedState = mapState(store.getState());
    memoizedComponent(mappedState);
  };
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

function connectMutable(store, projection, render) {
  const memoizedRender = memoizeDeep(render);
  return () => {
    const projectedState = projection(store.getState());
    memoizedRender(projectedState);
  };
}

module.exports = {
  createStore,
  connectImmutable,
  connectMutable,
};
