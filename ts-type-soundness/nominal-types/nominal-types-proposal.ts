// Support some non-structural (nominal) type matching
// https://github.com/microsoft/TypeScript/issues/202

/* nominal */ export class Dollar {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(dollar: Dollar) {
    return new Dollar(dollar.value + this.value);
  }
}

/* nominal */ class Euro {
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

// Should be error!
dollars100.add(euro100);

// II Custom types
/* nominal */ type ValidatedEmail = string;
declare function validateEmail(email: string): ValidatedEmail;

declare function sendEmail(mail: ValidatedEmail): void;
sendEmail(validateEmail("asdf@gmail.com"));

// Error!
sendEmail("asdf@gmail.com");
