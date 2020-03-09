import { FILTERS, TODO_STATUS } from "./constants";

export class ModelNormalized {
  todos = [];
  activeFilter = FILTERS.ALL;

  get totalCount() {
    return this.todos.length;
  }

  get filters() {
    return [
      { name: FILTERS.ALL, isActive: this.activeFilter === FILTERS.ALL },
      { name: FILTERS.TODO, isActive: this.activeFilter === FILTERS.TODO },
      { name: FILTERS.DONE, isActive: this.activeFilter === FILTERS.DONE }
    ];
  }

  get filteredTodos() {
    if (this.activeFilter === FILTERS.ALL) {
      return this.todos;
    }
    return this.todos.filter(el => el.status === this.activeFilter);
  }

  get filteredTime() {
    return this.filteredTodos.reduce((acc, cur) => acc + cur.time, 0);
  }

  addTodo(label) {
    this.todos = [...this.todos, { label, status: TODO_STATUS.TODO, time: 0 }];
  }

  delete(todo) {
    this.todos = this.todos.filter(el => el !== todo);
  }

  changeStatus(todo, status) {
    this.todos = this.todos.map(el => (el === todo ? { ...el, status } : el));
  }

  logTime(todo, time) {
    if (!time) return;

    this.todos = this.todos.map(el => (el === todo ? { ...el, time } : el));
  }

  toggleFilter(filter) {
    this.activeFilter = filter;
  }
}
