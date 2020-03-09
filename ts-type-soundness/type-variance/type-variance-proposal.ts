// Exact types proposal:
// https://github.com/microsoft/TypeScript/issues/12936

// Covariance and contravariance proposal:
// https://github.com/Microsoft/TypeScript/issues/10717

// DeepReadonly<T> type
// https://github.com/microsoft/TypeScript/issues/13923

// Bonus: readonly is assignable to mutable
// https://github.com/Microsoft/TypeScript/issues/13347
// https://github.com/microsoft/TypeScript/pull/6532#issuecomment-174356151

// A.I
import { DR } from "../helpers";

(function() {
  function changeStatus<
    /* in */ T extends {
      status: number | string;
    }
  >(arg: T) {
    // Error
    arg.status = "NotFound";
  }

  const error: { status: number } = { status: 404 };
  changeStatus(error);

  console.log(error.status.toFixed());
})();

// A.II
(function() {
  function changeStatus(arg: DR<{ message: string; status?: number }>) {
    if (arg.status) {
      console.log(arg.status.toFixed());
    }
  }

  function proceedError(arg: /* Exact<> */ { message: string }) {
    changeStatus(arg);
  }

  const error1: /* Exact<> */ { message: string } = {
    message: "No data"
  };

  proceedError(error1);
})();

// Exact
(function() {
  const error: { message: string } = {
    message: "No data"
  };

  function updateError(arg: /* Exact<> */ { message: string }) {
    const defaultError = { status: 404, message: "Not found" };
    // Can spread only Exact type!
    const newError = { ...defaultError, ...arg };
    // Error: toFixed is not a function
    console.log(newError.status.toFixed());
  }

  updateError(error);
})();

// A.III
interface Shape {
  name: string;
}
interface Square extends Shape {
  width: number;
}

(function() {
  const squares: Square[] = [{ name: "Square", width: 5 }];

  function addSmth(arg: /* readonly */ Shape[]) {
    // Error: can't call push
    arg.push({ name: "Square" });
  }
  addSmth(squares);

  function logWidth(arg: Square[]) {
    // TypeError: Cannot read property 'toFixed' of undefined
    arg.forEach(square => console.log(square.width.toFixed()));
  }
  logWidth(squares);
})();
