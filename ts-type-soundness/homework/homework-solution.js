// @flow
// https://flow.org/try/
// flow 0.120.1

// 'surname' should be readonly so as not to add the surname to the exact type
type Name = { name: string, +surname?: string };
declare function log(arg: Name): void;

// 'surname' can be in extra fields with any value, a person shouldn't contain extra fields
const person: $Exact<{ name: string }> = { name: "Negasi" };

log(person);
