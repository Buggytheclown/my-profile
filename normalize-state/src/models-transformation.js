import { FILTERS } from "./constants";

// I
// can be only one `isActive` filter
let myState = {
  todos: [],
  totalCount: 0,

  filters: [
    { name: FILTERS.ALL, isActive: true },
    { name: FILTERS.TODO, isActive: false },
    { name: FILTERS.DONE, isActive: false }
  ],

  filteredTodos: [],
  filteredTime: 0
};

// II
// `totalCount` is calculated from `todos`,
// it is error prone to duplicate, more verbose to update `todos`
myState = {
  todos: [],
  totalCount: 0,

  activeFilter: FILTERS.ALL,
  get filters() {
    return [
      { name: FILTERS.ALL, isActive: this.activeFilter === FILTERS.ALL },
      { name: FILTERS.TODO, isActive: this.activeFilter === FILTERS.TODO },
      { name: FILTERS.DONE, isActive: this.activeFilter === FILTERS.DONE }
    ];
  },

  filteredTodos: [],
  filteredTime: 0
};

// III
// filteredTime to getter
myState = {
  todos: [],
  get totalCount() {
    return myState.todos.length;
  },

  activeFilter: FILTERS.ALL,
  get filters() {
    return [
      { name: FILTERS.ALL, isActive: this.activeFilter === FILTERS.ALL },
      { name: FILTERS.TODO, isActive: this.activeFilter === FILTERS.TODO },
      { name: FILTERS.DONE, isActive: this.activeFilter === FILTERS.DONE }
    ];
  },

  get filteredTodos() {
    return myState.todos.filter(el => el.status === myState.activeFilter);
  },
  filteredTime: 0
};

// IV
myState = {
  todos: [],
  get totalCount() {
    return myState.todos.length;
  },

  activeFilter: FILTERS.ALL,
  get filters() {
    return [
      { name: FILTERS.ALL, isActive: this.activeFilter === FILTERS.ALL },
      { name: FILTERS.TODO, isActive: this.activeFilter === FILTERS.TODO },
      { name: FILTERS.DONE, isActive: this.activeFilter === FILTERS.DONE }
    ];
  },

  get filteredTodos() {
    return myState.todos.filter(el => el.status === myState.activeFilter);
  },
  get filteredTime() {
    return myState.filteredTodos.reduce((acc, cur) => acc + cur.time, 0);
  }
};
