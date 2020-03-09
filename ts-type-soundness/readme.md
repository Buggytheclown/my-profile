### TS unsound behavior

### Type variance, exact types (./type-variance)
Proposals:
- Exact types 
https://github.com/microsoft/TypeScript/issues/12936
- Covariance and contravariance 
https://github.com/Microsoft/TypeScript/issues/10717
- DeepReadonly<T> type
https://github.com/microsoft/TypeScript/issues/13923

Suggestions:
- Don’t mutate data (ReadOnlyArray, ReadOnly, DeepReadOnly)
	https://stackoverflow.com/a/55930310/5801495

### Nominal types, custom types  (./nominal-types)
Proposal:
- Support some non-structural (nominal) type matching 
https://github.com/microsoft/TypeScript/issues/202

Suggestions:
- Opaque type for primitives, private fields for classes

### Exceptions (./exceptions)
Proposal:
- Checked exceptions:
		https://github.com/microsoft/TypeScript/issues/13219
		
Suggestions:
- Either monad
    
### Refinement invalidation (./refinement-invalidation)
Proposal:
- Pure modifier: 
https://github.com/microsoft/TypeScript/issues/7770#issuecomment-334919251

Suggestions:
- don’t mutate data

### Unsafe operations/index access (./unsafe-operations)
Proposal:
- option to include undefined in index signatures
https://github.com/microsoft/TypeScript/issues/13778

Suggestions:
- Option type https://en.wikipedia.org/wiki/Option_type

Alternatives:
- A dependent type can prove that a value exists.
	https://en.wikipedia.org/wiki/Dependent_type

### Bonus-cases (./bonus-cases)
- Type Guard
- Overloading
