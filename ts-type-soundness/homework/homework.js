// @flow
// https://flow.org/try/
// flow 0.120.1

type Name = { name: string, surname?: string };
declare function log(arg: Name): void;

const person: { name: string } = { name: "Negasi" };

log(person);
// ^ Cannot call `log` with `person` bound to `arg` because property `surname` (did you mean `name`?) is missing in object type [1] but exists in `Name` [2].
// References:
// 4: const person: { name: string } = { name: 'Negasi' };
//                  ^ [1]
// 2: declare function log(arg: Name): void;
//                              ^ [2]
