// Checked exceptions proposal
// https://github.com/microsoft/TypeScript/issues/13219

import { exhaustiveCheck, JokeError } from "../helpers";

function getJoke(isFunny: boolean): string /* | throws JokeError */ {
  if (isFunny) {
    throw new JokeError("No funny joke");
  }
  return "Duh";
}

function getJokeSafe(isFunny: boolean): string {
  try {
    return getJoke(isFunny);
  } catch (error) {
    if (error instanceof JokeError) {
      console.log("JokeError");
      return "";
    } else {
      // Should infer error correctly, should cast to never
      exhaustiveCheck(error);
    }
  }
}

console.log(getJokeSafe(true));
