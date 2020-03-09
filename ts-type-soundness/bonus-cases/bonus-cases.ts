// Overloading
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: string | number, b: string | number): string | number {
  return `${a} + ${b}`;
}

const sum: number = add(2, 2);
// Error: toFixed is not a function
sum.toFixed();

// Type guard
// use Discriminated Unions
type SimpleUser = { name: string };
type SuperUser = {
  name: string;
  isAdmin: true;
  permissions: string[];
};
type Vasya = { name: string; isAdmin: true; isGod: true };
type User = SimpleUser | SuperUser | Vasya;

function isSuperUser(user: User): user is SuperUser {
  return "isAdmin" in user && user.isAdmin;
}

function doSomethings(user: User) {
  // Error: Cannot read property 'join' of undefined
  if (isSuperUser(user)) {
    console.log(user.permissions.join(","));
  }
}

const superUser: SuperUser = {
  name: "John",
  isAdmin: true,
  permissions: ["DoThat"]
};

const vasya: Vasya = {
  name: "John",
  isAdmin: true,
  isGod: true
};

doSomethings(superUser);
doSomethings(vasya);
