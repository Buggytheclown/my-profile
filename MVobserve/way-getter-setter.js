const globalState = {
  observer: null
};

function getObjectprivateStore(object) {
  const superUniqueKey = "DO_NOT_USE_OR_YOU_WILL_BE_FIRED"; // Symbol?
  if (!object[superUniqueKey]) {
    object[superUniqueKey] = {};
  }
  return object[superUniqueKey];
}

function getPrivateStore(object, propName) {
  const objectStore = getObjectprivateStore(object);

  if (!objectStore[propName]) {
    objectStore[propName] = {
      value: null,
      observers: []
    };
  }
  return objectStore[propName];
}

// observe deep(recursive struct), array, unsub, batching, sub/unsub after update

function makeObservableProp(object, propName) {
  // set initial value
  getPrivateStore(object, propName).value = object[propName];

  Object.defineProperty(object, propName, {
    get: function() {
      const privateStore = getPrivateStore(object, propName);
      if (globalState.observer) {
        privateStore.observers.push(globalState.observer);
      }
      return privateStore.value;
    },
    set: function(value) {
      const privateStore = getPrivateStore(object, propName);
      privateStore.value = value;
      privateStore.observers.forEach(observer => observer());
    }
  });
}

function autorun(fn) {
  // watch if someone will touch observable
  globalState.observer = fn;
  // inside fn we will can call getter
  const res = fn();
  // stop watching
  globalState.observer = null;
  return res;
}

module.exports = {
  makeObservableProp,
  autorun
};
