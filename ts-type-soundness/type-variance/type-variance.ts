// A.I
// Ts - correct, Flow - error, RuneTime - error
// Error:   { status: number } ! -> { status: number | string } -> { status: string }
// Correct: { status: number }   -> ReadOnly<{ status: number | string }> !!! { status: string }
(function() {
  function changeStatus(arg: { status: number | string }) {
    arg.status = "NotFound";
  }

  const error: { status: number } = { status: 404 };
  changeStatus(error);

  console.log(error.status.toFixed());
})();

// A.II
// Ts - correct, Flow - error, RuneTime - error

// Error:   { status: string } -> {} -> { status?: number } -> { status: number }
// Correct: { status: string } -!-> Exact<{}> -> DR<{ status?: number }> -!-> { status: number }
(function() {
  function changeStatus(arg: { message: string; status?: number }) {
    if (arg.status) {
      // Error: toFixed is not a function
      console.log(arg.status.toFixed());
    }
  }

  function proceedError(arg: { message: string }) {
    changeStatus(arg);
  }

  const error: { message: string; status: string } = {
    message: "No data",
    status: "NotFound"
  };

  proceedError(error);
})();

// Exact
// Error:   { status: string } -> {} -> ({ status: number } & {}) -> { status: number }
// Correct: { status: string } -!-> Exact<{}> -> ({ status: number } & {}) -> { status: number }
(function() {
  const error: { message: string; status: string } = {
    message: "No data",
    status: "NotFound"
  };

  function updateError(arg: { message: string }) {
    const defaultError = { message: "Not found", status: 404 };
    const newError: { message: string; status: number } = {
      ...defaultError,
      ...arg
    };

    // {  ...{ message: string, status: number },
    //    ...{ message: string },}

    // {...{ message: "Not found", status: 404 },
    //  ...{ message: "No data", status: "NotFound"},}

    // Error: toFixed is not a function
    console.log(newError.status.toFixed());
  }

  updateError(error);
})();

// A.III
// Ts - correct, Flow - error, RuneTime - error
// Error:   [Square] !-> [Shape] -> [Square, Shape]
// Correct: [Square]  -> ReadOnlyArray<Shape> !!! [Square, Shape]
interface Shape {
  name: string;
}
interface Square extends Shape {
  width: number;
}

(function() {
  const squares: Square[] = [{ name: "Square", width: 5 }];

  function addSmth(arg: Shape[]) {
    arg.push({ name: "Square" });
  }
  addSmth(squares);

  function logWidth(arg: Square[]) {
    // TypeError: Cannot read property 'toFixed' of undefined
    arg.forEach(square => console.log(square.width.toFixed()));
  }
  logWidth(squares);
})();

(function() {
  class SimpleLogger {
    log({ firstName }: { firstName: string }): void {
      console.log(`${firstName.toUpperCase()}`);
    }
  }

  class AdvancedLogger {
    log({
      firstName,
      lastName
    }: {
      firstName: string;
      lastName: string;
    }): void {
      console.log(`${firstName.toUpperCase()} & ${lastName.toUpperCase()}`);
    }
  }

  function logSimple(logger: SimpleLogger) {
    logger.log({ firstName: "John" });
  }

  logSimple(new AdvancedLogger());
})();
