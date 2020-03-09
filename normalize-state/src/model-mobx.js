import { action, computed, observable } from "mobx";
import { FILTERS, TODO_STATUS } from "./constants";

export class ModelMobx {
  @observable
  todos = [];

  @observable
  activeFilter = FILTERS.ALL;

  @computed
  get totalCount() {
    return this.todos.length;
  }

  @computed
  get filters() {
    return [
      { name: FILTERS.ALL, isActive: this.activeFilter === FILTERS.ALL },
      { name: FILTERS.TODO, isActive: this.activeFilter === FILTERS.TODO },
      { name: FILTERS.DONE, isActive: this.activeFilter === FILTERS.DONE }
    ];
  }

  @computed
  get filteredTodos() {
    if (this.activeFilter === FILTERS.ALL) {
      return this.todos;
    }
    return this.todos.filter(el => el.status === this.activeFilter);
  }

  @computed
  get filteredTime() {
    return this.filteredTodos.reduce((acc, cur) => acc + cur.time, 0);
  }

  @action
  addTodo(label) {
    this.todos.push({ label, status: TODO_STATUS.TODO, time: 0 });
  }

  @action
  delete(todo) {
    const index = this.todos.findIndex(el => el !== todo);
    this.todos.splice(index, 1);
  }

  @action
  changeStatus(todo, status) {
    this.todos.find(el => el === todo).status = status;
  }

  @action
  logTime(todo, time) {
    if (!time) return;

    this.todos.find(el => el === todo).time = time;
  }

  @action
  toggleFilter(filter) {
    this.activeFilter = filter;
  }
}
