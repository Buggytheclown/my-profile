import React, { Component } from "react";
import { ModelNormalized } from "./model-normalized";
import { TODO_STATUS } from "./constants";

function FilterLink({ onFilterChange, isActive, children }) {
  return (
    <button className="btn btn-link" onClick={onFilterChange}>
      {isActive && ">>>"} {children}
    </button>
  );
}

function DebugState() {
  return (
    <div>
      <pre>{JSON.stringify(this.model, 2, 2)}</pre>
      <button
        onClick={() => (localStorage.mySuperState = JSON.stringify(this.model))}
      >
        save
      </button>
      <button
        onClick={() => {
          Object.assign(this.model, JSON.parse(localStorage.mySuperState));
          this.forceUpdate();
        }}
      >
        load
      </button>
    </div>
  );
}

export class App extends Component {
  inputRef = React.createRef();

  model = new ModelNormalized();

  callModel(method, ...args) {
    method.apply(this.model, args);
    this.forceUpdate();
  }

  addTodo = () => {
    this.callModel(this.model.addTodo, this.inputRef.current.value);
    this.inputRef.current.value = "";
  };

  logTime(todo) {
    const time = +prompt("Please enter time", todo.time);
    this.callModel(this.model.logTime, todo, time);
  }

  onKeyPress = event => {
    if (event.key === "Enter") {
      this.addTodo();
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div>
          <div className="form-group flex">
            <input
              onKeyPress={this.onKeyPress}
              ref={this.inputRef}
              className="form-control"
              type="text"
            />
            <button onClick={this.addTodo} className="btn btn-primary">
              Add
            </button>
          </div>

          {this.model.filters.map(filter => (
            <FilterLink
              key={filter.name}
              onFilterChange={() =>
                this.callModel(this.model.toggleFilter, filter.name)
              }
              isActive={filter.isActive}
            >
              {filter.name}
            </FilterLink>
          ))}

          <p>total count: {this.model.totalCount}</p>
          <p>filtered time: {this.model.filteredTime}</p>

          <div>
            {this.model.filteredTodos.map((el, i) => (
              <div key={i} className="card">
                <div className="card-body">
                  {el.status === TODO_STATUS.TODO && (
                    <div>
                      <p>label: {el.label}</p>
                      <p>status: {el.status}</p>
                      <p className="color-grey">time: {el.time}</p>

                      <button
                        onClick={() => this.callModel(this.model.delete, el)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.logTime(el)}
                        className="btn btn-light"
                      >
                        log time
                      </button>
                      <button
                        onClick={() =>
                          this.callModel(
                            this.model.changeStatus,
                            el,
                            TODO_STATUS.DONE
                          )
                        }
                        className="btn btn-success"
                      >
                        to DONE
                      </button>
                    </div>
                  )}

                  {el.status === TODO_STATUS.DONE && (
                    <div>
                      <p>label: {el.label}</p>
                      <p className="color-green">status: {el.status}</p>
                      <p>time: {el.time}</p>

                      <button
                        onClick={() => this.callModel(this.model.delete, el)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => this.logTime(el)}
                        className="btn btn-light"
                      >
                        log time
                      </button>
                      <button
                        onClick={() =>
                          this.callModel(
                            this.model.changeStatus,
                            el,
                            TODO_STATUS.TODO
                          )
                        }
                        className="btn btn-primary"
                      >
                        to TODO
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
