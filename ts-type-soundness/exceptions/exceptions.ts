import { JokeError } from "../helpers";

function getJoke(isFunny: boolean): string {
  if (isFunny) {
    throw new JokeError("No funny joke");
  }
  return "Duh";
}

const joke: string = getJoke(true);
console.log(joke);
