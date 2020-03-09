import { Either } from "../helpers";

function safeIndex<T>(array: T[], index: number): Either<null, T> {
  if (index in array) {
    return Either.right(array[index]);
  }
  return Either.left(null);
}

const dynamicNumbers: number[] = [1, 2, 3];

safeIndex(dynamicNumbers, 100)
  .mapLeft(() => console.log("Nothing"))
  .mapRight(el => el + 2)
  .mapRight(el => console.log(el.toFixed()));
