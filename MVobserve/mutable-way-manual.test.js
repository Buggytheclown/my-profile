describe("mutable way: manual", () => {
  test("watched function should be called only when observable is changed", () => {
    const state = {
      customerHappiness: 50,
      techDebs: 25
    };

    const rewardRender = jest.fn(
      () => `<p>Reward: ${state.customerHappiness}</p>>`
    );

    // Initial rendering
    rewardRender();
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Change non-observable value
    state.techDebs = 40;
    expect(rewardRender).toHaveBeenCalledTimes(1);

    // Change observable value
    state.customerHappiness = 70;
    // Trigger re-render manually
    rewardRender();
    expect(rewardRender).toHaveBeenCalledTimes(2);
  });
});
