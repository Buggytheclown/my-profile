class Dollar {
  // #desc!: never;
  private desc!: never;
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(dollar: Dollar) {
    return new Dollar(dollar.value + this.value);
  }
}

class Euro {
  // #desc!: never;
  private desc!: never;
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(euro: Euro) {
    return new Euro(euro.value + this.value);
  }
}

const dollars100 = new Dollar(100);
const euro100 = new Euro(100);

// Correct
dollars100.add(dollars100);
euro100.add(euro100);

// Error: Argument of type 'Euro' is not assignable to parameter of type 'Dollar
dollars100.add(euro100);

// II Custom types
type Opaque<K extends symbol | string, T> = T & { [X in K]: never };

declare const validatedEmailK: unique symbol;
type ValidatedEmail = Opaque<typeof validatedEmailK, string>;
// type ValidatedEmail = Opaque<'ValidatedEmail', string>;

declare function validateEmail(email: string): ValidatedEmail;

declare function sendEmail(mail: ValidatedEmail): void;
sendEmail(validateEmail("asdf@gmail.com"));

// Argument of type '"asdf@gmail.com"' is not assignable
//  to parameter of type 'Opaque<unique symbol, string>'.
sendEmail("asdf@gmail.com");
