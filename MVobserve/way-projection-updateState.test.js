const {
  createStore,
  connectMutable,
  connectImmutable
} = require("./way-projection-updateState");

describe("immutable way", () => {
  test("DEEP: watched function should be called only when observable is changed", () => {
    const store = createStore({
      customerHappiness: { today: 50, inTheFuture: 0 },
      techDebs: { value: 25 }
    });

    const rewardRender = jest.fn(
      customerHappiness => `<p>Reward: ${customerHappiness}</p>`
    );

    const projection = state => state.customerHappiness;
    const rewardMaybeRender = connectMutable(store, projection, rewardRender);

    // Initial rendering
    rewardMaybeRender();
    rewardMaybeRender();
    rewardMaybeRender();
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Subscribe to changes
    store.subscribe(rewardMaybeRender);

    function changeTechDebsReducer(state) {
      state.techDebs.value = 40;
      return state;
    }
    // Change non-observable value
    store.updateState(changeTechDebsReducer);
    expect(rewardRender).toHaveBeenCalledTimes(1);

    function changeCustomerHappinessReducer(state) {
      state.customerHappiness.today = 70;
      return state;
    }

    // Change observable value
    store.updateState(changeCustomerHappinessReducer);
    expect(rewardRender).toHaveBeenCalledTimes(2);
  });

  test("STRICT: watched function should be called only when observable is changed", () => {
    const store = createStore({
      customerHappiness: { today: 50, inTheFuture: 0 },
      techDebs: { value: 25 }
    });

    const rewardRender = jest.fn(
      customerHappiness => `<p>Reward: ${customerHappiness}</p>`
    );

    const projection = state => state.customerHappiness;
    const rewardMaybeRender = connectImmutable(store, projection, rewardRender);

    // Initial rendering
    rewardMaybeRender();
    rewardMaybeRender();
    rewardMaybeRender();
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Subscribe to changes
    store.subscribe(rewardMaybeRender);

    function changeTechDebsReducer(state) {
      return {
        ...state,
        techDebs: {
          ...state.techDebs,
          value: 40
        }
      };
    }
    // Change non-observable value
    store.updateState(changeTechDebsReducer);
    expect(rewardRender).toHaveBeenCalledTimes(1);

    function changeCustomerHappinessReducer(state) {
      return {
        ...state,
        customerHappiness: {
          ...state.customerHappiness,
          today: 70
        }
      };
    }
    // Change observable value
    store.updateState(changeCustomerHappinessReducer);
    expect(rewardRender).toHaveBeenCalledTimes(2);
  });
});
