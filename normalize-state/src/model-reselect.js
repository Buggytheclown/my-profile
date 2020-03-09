import { createSelector } from "reselect";
import { FILTERS, TODO_STATUS } from "./constants";

const todosSelector = model => model.todos;
const activeFilterSelector = model => model.activeFilter;

const totalCountSelector = createSelector(todosSelector, todos => todos.length);
const filtersSelectors = createSelector(activeFilterSelector, activeFilter => [
  { name: FILTERS.ALL, isActive: activeFilter === FILTERS.ALL },
  { name: FILTERS.TODO, isActive: activeFilter === FILTERS.TODO },
  { name: FILTERS.DONE, isActive: activeFilter === FILTERS.DONE }
]);

const filteredTodosSelector = createSelector(
  activeFilterSelector,
  todosSelector,
  (activeFilter, todos) => {
    if (activeFilter === FILTERS.ALL) {
      return todos;
    }
    return todos.filter(el => el.status === activeFilter);
  }
);

const filteredTimeSelector = createSelector(
  filteredTodosSelector,
  filteredTodos => filteredTodos.reduce((acc, cur) => acc + cur.time, 0)
);

export class ModelReselect {
  model = {
    todos: [],
    activeFilter: FILTERS.ALL
  };

  get totalCount() {
    return totalCountSelector(this.model);
  }
  get filters() {
    return filtersSelectors(this.model);
  }
  get filteredTodos() {
    return filteredTodosSelector(this.model);
  }
  get filteredTime() {
    return filteredTimeSelector(this.model);
  }

  addTodo(label) {
    this.model = {
      ...this.model,
      todos: [...this.model.todos, { label, status: TODO_STATUS.TODO, time: 0 }]
    };
  }

  delete(todo) {
    this.model = {
      ...this.model,
      todos: this.model.todos.filter(el => el !== todo)
    };
  }

  changeStatus(todo, status) {
    this.model = {
      ...this.model,
      todos: this.model.todos.map(el => (el === todo ? { ...el, status } : el))
    };
  }

  logTime(todo, time) {
    if (!time) return;

    this.model = {
      ...this.model,
      todos: this.model.todos.map(el => (el === todo ? { ...el, time } : el))
    };
  }

  toggleFilter(filter) {
    this.model = {
      ...this.model,
      activeFilter: filter
    };
  }
}
