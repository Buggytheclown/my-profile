// Option to include undefined in index signatures
// https://github.com/microsoft/TypeScript/issues/13778
//
// interface Array<T> {
//   [n: number]: T | undefined;
// }

const dynamicNumbers: number[] = [1, 2, 3];
// Error
console.log(dynamicNumbers[100].toFixed());

// Optional chaining `?`
console.log(dynamicNumbers[100]?.toFixed());

// type refinement
if (typeof dynamicNumbers[100] === 'number') {
  console.log(dynamicNumbers[100].toFixed());
}
