const { addReaction, connectMutable } = require("./way-projection-magic");

function scheduleAction(fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, 0);
  });
}

describe("mutable way: no, no", () => {
  test("Reaction should be called only when watched value is changed", async () => {
    const state = {
      customerHappiness: { today: 50, inTheFuture: 0 },
      techDebs: { value: 25 }
    };

    const rewardRender = jest.fn(
      customerHappiness => `<p>Reward: ${customerHappiness}</p>`
    );
    const projection = state => state.customerHappiness;
    const rewardMaybeRender = connectMutable(state, projection, rewardRender);

    // Initial rendering
    rewardMaybeRender();
    rewardMaybeRender();
    rewardMaybeRender();
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Subscribe to changes
    addReaction(rewardMaybeRender);

    // Change non-observable value
    await scheduleAction(() => {
      state.techDebs.value = 40;
    });
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Change observable value
    await scheduleAction(() => {
      state.customerHappiness.today = 70;
    });
    expect(rewardRender).toHaveBeenCalledTimes(2);
  });
});
