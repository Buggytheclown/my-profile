const { makeObservableProp, autorun } = require("./way-getter-setter");

describe("mutable way: getter, setter", () => {
  test("Reaction should be called only when watched value is changed", () => {
    const state = {
      customerHappiness: 50,
      techDebs: 25
    };

    makeObservableProp(state, "customerHappiness");
    makeObservableProp(state, "techDebs");

    const rewardRender = jest.fn(() =>
      `<p>Reward: ${state.customerHappiness}</p>`
    );

    // Initial rendering / Subscribe to changes
    autorun(rewardRender);
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Change non-observable value
    state.techDebs = 40;
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Change observable value
    state.customerHappiness = 70;
    expect(rewardRender).toHaveBeenCalledTimes(2);
  });
});
