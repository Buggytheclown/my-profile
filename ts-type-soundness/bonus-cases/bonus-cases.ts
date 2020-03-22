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


// Missed or undefined - https://github.com/Microsoft/TypeScript/issues/13195
type Props = {
    foo: string;
}

const props: Props = { foo: 'f' }
const input: Partial<Props> = { foo: undefined }

const result:Props = { ...props, ...input }
// Cannot read property 'toString' of undefined
result.foo.toString();


// Void means "a value exists but you should not use it" or something to that effect.
function foo2( n: number | void) { 
    // n.toFixed is not a function
    return n ? n.toFixed() : 0; 
}

const f: () => void = () => "i am a string";
foo2(f());
