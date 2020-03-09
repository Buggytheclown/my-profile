const globalState = {
  observer: null
};

function getObservers(model, prop) {
  if (!model.observers[prop]) {
    model.observers[prop] = [];
  }
  return model.observers[prop];
}

function get(model, prop) {
  if (globalState.observer) {
    getObservers(model, prop).push(globalState.observer);
  }
  return model.state[prop];
}

function set(model, prop, value) {
  model.state[prop] = value;
  getObservers(model, prop).forEach(observer => observer());
}

function autorun(fn) {
  globalState.observer = fn;
  const res = fn();
  globalState.observer = null;
  return res;
}

function Model(state) {
  return {
    observers: {},
    state
  };
}

module.exports = {
  get,
  set,
  Model,
  autorun
};
