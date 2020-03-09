import { FILTERS, TODO_STATUS } from "./constants";

export class ModelFirst {
  todos = [];
  totalCount = 0;

  filters = [
    { name: FILTERS.ALL, isActive: true },
    { name: FILTERS.TODO, isActive: false },
    { name: FILTERS.DONE, isActive: false }
  ];

  filteredTodos = [];
  filteredTime = 0;

  _updateCount() {
    this.totalCount = this.todos.length;
  }

  _updateFilteredTodos() {
    const activeFilter = this.filters.find(filter => filter.isActive);

    if (activeFilter.name === FILTERS.ALL) {
      this.filteredTodos = this.todos;
    } else {
      this.filteredTodos = this.todos.filter(
        todo => todo.status === activeFilter.name
      );
    }
  }

  _updateFilteredTime() {
    this.filteredTime = this.filteredTodos.reduce(
      (acc, cur) => acc + cur.time,
      0
    );
  }

  addTodo(label) {
    this.todos = [...this.todos, { label, status: TODO_STATUS.TODO, time: 0 }];

    this._updateCount();
    this._updateFilteredTodos();
    this._updateFilteredTime();
  }

  changeStatus(todo, status) {
    this.todos = this.todos.map(el => (el !== todo ? el : { ...el, status }));
    this._updateFilteredTodos();
    this._updateFilteredTime();
  }

  logTime(todo, time) {
    if (!time) return;

    this.todos = this.todos.map(el => (el !== todo ? el : { ...el, time }));
    this._updateFilteredTodos();
    this._updateFilteredTime();
  }

  toggleFilter(newFilter) {
    this.filters = this.filters.map(filter => ({
      ...filter,
      isActive: filter.name === newFilter
    }));

    this._updateFilteredTodos();
    this._updateFilteredTime();
  }
}
