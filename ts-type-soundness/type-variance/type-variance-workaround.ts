import { DR } from "../helpers";
// A.I
(function() {
  function changeStatus(arg: DR<{ status: number | string }>) {
    // Error: Cannot assign, status is not writable
    arg.status = "NotFound";
  }

  const error: DR<{ status: number }> = { status: 404 };
  changeStatus(error);

  console.log(error.status.toFixed());
})();

// A.II
(function() {
  function changeStatus(arg: Readonly<{ message: string; status?: number }>) {
    if (arg.status) {
      console.log(arg.status.toFixed());
    }
    // Error: Cannot assign, status is not writable
    //arg.status = 404;
  }

  function proceedError(arg: { message: string }) {
    changeStatus(arg);
  }

  const error: { message: string; status: string } = {
    message: "No data",
    status: "NotFound"
  };

  proceedError(error);

  // But!
  return {} as
  Readonly<{ status: number }> as
  Readonly<{ status: number | string }> as
  Readonly<{ status: string }>
})();

// Exact
(function() {
  const error: { message: string } = {
    message: "No data"
  };

  function updateError(arg: /* Exact<> */ { message: string }) {
    const defaultError = { message: "Not found", status: 404 };
    // Merge explicitly or filter unknown fields
    const newError = { ...defaultError, message: arg.message };
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

  function addSmth(arg: DR<Shape[]>) {
    // Error: can't call push
    arg.push({ name: "Square" });
  }

  addSmth(squares);

  function logWidth(arg: Square[]) {
    arg.forEach(square => console.log(square.width.toFixed()));
  }

  logWidth(squares);
})();
