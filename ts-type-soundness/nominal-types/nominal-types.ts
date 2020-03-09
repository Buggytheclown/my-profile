// Nominal vs Structural types
// Ts - correct, Flow - error, RuneTime - unpredictable behavior

export class Dollar {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(dollar: Dollar): Dollar {
    return new Dollar(dollar.value + this.value);
  }
}

class Euro {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(euro: Euro): Euro {
    return new Euro(euro.value + this.value);
  }
}

const dollars100 = new Dollar(100);
const euro100 = new Euro(100);

// Correct
dollars100.add(dollars100);
euro100.add(euro100);

// Should be error!
dollars100.add(euro100);

// II Custom types
type ValidatedEmail = string;
declare function validateEmail(email: string): ValidatedEmail;

declare function sendEmail(mail: ValidatedEmail): void;
sendEmail(validateEmail("asdf@gmail.com"));

// Should be error!
sendEmail("asdf@gmail.com");
