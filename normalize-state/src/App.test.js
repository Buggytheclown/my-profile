import React from "react";
import { ModelNormalized } from "./model-normalized";
import { FILTERS, TODO_STATUS } from "./constants";
import { ModelFirst } from "./model-first";
import { mapToProps, ModelReselect } from "./model-reselect";
import { ModelMobx } from "./model-mobx";
import { toJS } from "mobx";

function pickToJS(object, props) {
  function normalizeArray(key, value) {
    return value.slice ? value.slice() : value;
  }
  return toJS(
    props.reduce(
      (acc, key) => ({ ...acc, [key]: normalizeArray(key, object[key]) }),
      {}
    )
  );
}

function testModel(ModelClass) {
  it("Initial state should be empty", () => {
    const model = new ModelClass();

    expect(
      pickToJS(model, [
        "totalCount",
        "filters",
        "filteredTodos",
        "filteredTime"
      ])
    ).toEqual({
      totalCount: 0,
      filters: [
        { name: FILTERS.ALL, isActive: true },
        { name: FILTERS.TODO, isActive: false },
        { name: FILTERS.DONE, isActive: false }
      ],
      filteredTodos: [],
      filteredTime: 0
    });
  });

  it("Should add TODO properly", () => {
    const model = new ModelClass();

    expect(
      pickToJS(model, ["totalCount", "filteredTodos", "filteredTime"])
    ).toEqual({
      totalCount: 0,
      filteredTodos: [],
      filteredTime: 0
    });

    model.addTodo("first");

    expect(
      pickToJS(model, ["totalCount", "filteredTodos", "filteredTime"])
    ).toEqual({
      totalCount: 1,
      filteredTodos: [
        {
          label: "first",
          status: TODO_STATUS.TODO,
          time: 0
        }
      ],
      filteredTime: 0
    });
  });

  it("Should changeStatus properly", () => {
    const model = new ModelClass();

    expect(
      pickToJS(model, ["totalCount", "filteredTodos", "filteredTime"])
    ).toEqual({
      totalCount: 0,
      filteredTodos: [],
      filteredTime: 0
    });

    model.addTodo("first");
    model.changeStatus(model.filteredTodos[0], TODO_STATUS.DONE);

    expect(
      pickToJS(model, ["totalCount", "filteredTime", "filteredTodos"])
    ).toEqual({
      totalCount: 1,
      filteredTodos: [
        {
          label: "first",
          status: TODO_STATUS.DONE,
          time: 0
        }
      ],
      filteredTime: 0
    });
  });

  it("Should logTime properly", () => {
    const model = new ModelClass();
    expect(
      pickToJS(model, ["totalCount", "filteredTodos", "filteredTime"])
    ).toEqual({
      totalCount: 0,
      filteredTodos: [],
      filteredTime: 0
    });

    model.addTodo("first");
    model.logTime(model.filteredTodos[0], 12);

    expect(
      pickToJS(model, ["totalCount", "filteredTime", "filteredTodos"])
    ).toEqual({
      totalCount: 1,
      filteredTodos: [
        {
          label: "first",
          status: TODO_STATUS.TODO,
          time: 12
        }
      ],
      filteredTime: 12
    });
  });

  describe("Should toggleFilter properly", () => {
    const model = new ModelClass();
    expect(
      pickToJS(model, ["totalCount", "filteredTodos", "filteredTime"])
    ).toEqual({
      totalCount: 0,
      filteredTodos: [],
      filteredTime: 0
    });

    model.addTodo("todo1");
    model.logTime(model.filteredTodos[0], 11);

    model.addTodo("todo2");
    model.logTime(model.filteredTodos[1], 22);

    model.addTodo("todo3");
    model.logTime(model.filteredTodos[2], 33);
    model.changeStatus(model.filteredTodos[2], TODO_STATUS.DONE);

    model.addTodo("todo4");
    model.logTime(model.filteredTodos[3], 44);
    model.changeStatus(model.filteredTodos[3], TODO_STATUS.DONE);

    it("initial state", () => {
      expect(
        pickToJS(model, [
          "totalCount",
          "filters",
          "filteredTime",
          "filteredTodos"
        ])
      ).toEqual({
        filteredTime: 110,
        filteredTodos: [
          {
            label: "todo1",
            status: TODO_STATUS.TODO,
            time: 11
          },
          {
            label: "todo2",
            status: TODO_STATUS.TODO,
            time: 22
          },
          {
            label: "todo3",
            status: TODO_STATUS.DONE,
            time: 33
          },
          {
            label: "todo4",
            status: TODO_STATUS.DONE,
            time: 44
          }
        ],
        filters: [
          { name: FILTERS.ALL, isActive: true },
          { name: FILTERS.TODO, isActive: false },
          { name: FILTERS.DONE, isActive: false }
        ],
        totalCount: 4
      });
    });

    it("FILTERS.TODO", () => {
      model.toggleFilter(FILTERS.TODO);

      expect(
        pickToJS(model, [
          "totalCount",
          "filters",
          "filteredTime",
          "filteredTodos"
        ])
      ).toEqual({
        filteredTime: 33,
        filteredTodos: [
          {
            label: "todo1",
            status: TODO_STATUS.TODO,
            time: 11
          },
          {
            label: "todo2",
            status: TODO_STATUS.TODO,
            time: 22
          }
        ],
        filters: [
          { name: FILTERS.ALL, isActive: false },
          { name: FILTERS.TODO, isActive: true },
          { name: FILTERS.DONE, isActive: false }
        ],
        totalCount: 4
      });
    });

    it("FILTERS.DONE", () => {
      model.toggleFilter(FILTERS.DONE);

      expect(
        pickToJS(model, [
          "totalCount",
          "filters",
          "filteredTime",
          "filteredTodos"
        ])
      ).toEqual({
        filteredTime: 77,
        filteredTodos: [
          {
            label: "todo3",
            status: TODO_STATUS.DONE,
            time: 33
          },
          {
            label: "todo4",
            status: TODO_STATUS.DONE,
            time: 44
          }
        ],
        filters: [
          { name: FILTERS.ALL, isActive: false },
          { name: FILTERS.TODO, isActive: false },
          { name: FILTERS.DONE, isActive: true }
        ],
        totalCount: 4
      });
    });
  });
}

describe("test NormalizedModel", () => {
  testModel(ModelNormalized);
});

describe("test FirstModel", () => {
  testModel(ModelFirst);
});

describe("test ModelReselect", () => {
  testModel(ModelReselect);
});

describe("test ModelMobx", () => {
  testModel(ModelMobx);
});
