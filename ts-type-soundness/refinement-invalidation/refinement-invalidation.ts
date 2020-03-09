// Ts - correct, Flow - error, RuneTime - error

export function logAge(name: string, age: number) {
  // 2nd call -  Error: toFixed is not a function
  console.log(`${name} will lose ${age.toFixed()}`);
  person.age = "PLACEHOLDER";
}

const person: { name: string; age: number | string } = {
  name: "Person",
  age: 42
};

if (typeof person.age === "number") {
  logAge(person.name, person.age);
  // refinement should be invalidated
  logAge(person.name, person.age);
}
