import { Either, exhaustiveCheck, JokeError } from "../helpers";

function getJoke(isFunny: boolean): Either<JokeError, string> {
  if (isFunny) {
    return Either.left(new JokeError("No funny joke"));
  }
  return Either.right("Duh");
}

getJoke(true)
  // (parameter) error: JokeError
  .mapLeft(error => {
    if (error instanceof JokeError) {
      console.log("JokeError");
    } else {
      exhaustiveCheck(error);
    }
  })
  // (parameter) joke: string
  .mapRight(joke => console.log(joke));
