import { DR } from "../helpers";

export function logAge(name: string, age: number) {
  console.log(`${name} will lose ${age.toFixed()}`);
  // Error: Cannot assign to 'age' because it is a read-only property.
  // person.age = "PLACEHOLDER";
}

const person: DR<{ name: string; age: number | string }> = {
  name: "Person",
  age: 42
};

if (typeof person.age === "number") {
  logAge(person.name, person.age);
  logAge(person.name, person.age);
}
