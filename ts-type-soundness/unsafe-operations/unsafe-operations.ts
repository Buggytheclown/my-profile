// ReadOnly fixed size tuple
export const constNumbers: readonly [1, 2, 3]
  = [1, 2, 3] as const;

// Error: Object is possibly 'undefined'.
console.log(constNumbers[100].toFixed());

const dynamicNumbers: number[] = [1, 2, 3];
console.log(dynamicNumbers[100].toFixed());
