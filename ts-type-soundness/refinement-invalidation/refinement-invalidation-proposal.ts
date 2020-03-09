// Proposal: the pure modifier
// https://github.com/microsoft/TypeScript/issues/7770#issuecomment-334919251

/* pure */ function logAge(name: string, age: number) {
  // console.log(`${name} will lose ${age.toFixed()}`);
  // Should be error, function should have no side-effects
  // person.age = "PLACEHOLDER";
}

const person: { name: string; age: number | string } = {
  name: "Person",
  age: 42
};

if (typeof person.age === "number") {
  logAge(person.name, person.age);
  logAge(person.name, person.age);
}
