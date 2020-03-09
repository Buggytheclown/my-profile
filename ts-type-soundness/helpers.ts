export type DR<T> = DeepReadonly<T>;

type DeepReadonly<T> =
  // tslint:disable-next-line: ban-types
  T extends AnyFunction | Primitive
    ? T
    : T extends ReadonlyArray<infer R>
      ? IDRArray<R>
      : T extends ReadonlyMap<infer K, infer V>
        ? IDRMap<K, V>
        : T extends ReadonlySet<infer ItemType>
          ? ReadonlySetDeep<ItemType>
          : T extends object ? DRObject<T> : T;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type AnyFunction = (...args: any[]) => any;

interface IDRArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DRObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

interface IDRMap<K, V> extends ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> {}

interface ReadonlySetDeep<ItemType>
  extends ReadonlySet<DeepReadonly<ItemType>> {}

export class JokeError extends Error {
  private desc!:never;
  constructor(message: string) {
    super(message);
    this.name = "NoFunnyJokeError";
  }
}

export function exhaustiveCheck(arg: never): never {
  throw new Error(`Should not reach here. arg - ${arg}`);
}



// JSMonk sweet-monads
// https://github.com/JSMonk/sweet-monads/blob/master/either/index.ts
enum EitherType {
  Left = "Left",
  Right = "Right"
}

export class Either<L, R> {
  static from<T>(v: T) {
    return this.right(v);
  }

  static right<L, T>(v: T) {
    return new Either<L, T>(EitherType.Right, v);
  }

  static left<T, R>(v: T) {
    return new Either<T, R>(EitherType.Left, v);
  }

  constructor(type: EitherType.Left, v: L);
  constructor(type: EitherType.Right, v: R);
  constructor(public readonly type: EitherType, public readonly value: L | R) {}

  isLeft() {
    return this.type === EitherType.Left;
  }

  isRight() {
    return this.type === EitherType.Right;
  }

  join<L1, L2, R>(this: Either<L1, Either<L2, R>>): Either<L1 | L2, R> {
    return this.chain(x => x);
  }

  mapRight<T>(f: (r: R) => T): Either<L, T> {
    return this.map(f);
  }

  mapLeft<T>(f: (l: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return Either.left<T, R>(f(this.value as L));
    }
    return Either.right<T, R>(this.value as R);
  }

  map<T>(f: (r: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return Either.left<L, T>(this.value as L);
    }
    return Either.right<L, T>(f(this.value as R));
  }

  chain<A, B>(f: (r: R) => Either<A, B>): Either<A | L, B> {
    if (this.isLeft()) {
      return Either.left<L, B>(this.value as L);
    }
    return f(this.value as R);
  }
}
