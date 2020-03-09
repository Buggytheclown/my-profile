const { get, set, Model, autorun } = require("./mutable-way-get-set");

describe("mutable way: get, set", () => {
  test("Reaction should be called only when watched value is changed", () => {
    const state = new Model({
      customerHappiness: 50,
      techDebs: 25
    });

    const reward = jest.fn(
      () => `<p>Reward: ${get(state, "customerHappiness")}</p>`
    );

    // Initial rendering / Subscribe to changes
    autorun(reward);
    expect(reward).toHaveBeenCalledTimes(1);

    // Change non-observable value
    set(state, "techDebs", 40);
    expect(reward).toHaveBeenCalledTimes(1);

    // Change observable value
    set(state, "customerHappiness", 70);
    expect(reward).toHaveBeenCalledTimes(2);
  });
});
