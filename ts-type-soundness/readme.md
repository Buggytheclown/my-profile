### TS unsound behavior

### <a href="./type-variance">Type variance, exact types</a>
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

### <a href="./nominal-types">Nominal types, custom types</a>
Proposal:
- Support some non-structural (nominal) type matching 
https://github.com/microsoft/TypeScript/issues/202

Suggestions:
- Opaque type for primitives, private fields for classes

### <a href="./exceptions">Exceptions</a>
Proposal:
- Checked exceptions:
		https://github.com/microsoft/TypeScript/issues/13219
		
Suggestions:
- Either monad
    
### <a href="./refinement-invalidation">Refinement invalidation</a>
Proposal:
- Pure modifier: 
https://github.com/microsoft/TypeScript/issues/7770#issuecomment-334919251

Suggestions:
- don’t mutate data

###  <a href="./unsafe-operations">Unsafe operations/index access</a>
Proposal:
- option to include undefined in index signatures
https://github.com/microsoft/TypeScript/issues/13778

Suggestions:
- Option type https://en.wikipedia.org/wiki/Option_type


### <a href="./bonus-cases">Bonus-cases</a>
- Type Guard
- Overloading


### THEORY (extra)
#### Video
- "Typing the Untyped: Soundness in Gradual Type Systems" by Ben Weissmann
https://www.youtube.com/watch?v=uJHD2xyv7xo

- Илья Климов — «Строгий» JavaScript: типы против реальности
https://youtu.be/etKOc80-cw0

- Артём Кобзарь — Как и зачем я пишу свой статический типизатор
https://www.youtube.com/watch?v=GIHrPm_YAIc

- Вячеслав Шебанов — Системы типов в двух словах
https://www.youtube.com/watch?v=nFtO6419A5k

- Артём Кобзарь/Дмитрий Махнёв - (не|ну)жная монада Either на практике и в теории
Обработка ошибок
https://www.youtube.com/watch?v=S0cCjbWuvzk


#### Article
- Common "Bugs" That Aren't Bugs
https://github.com/microsoft/TypeScript/wiki/FAQ#why-do-my-derived-class-property-initializers-overwrite-values-set-in-the-base-class-constructor

- Вариантность в программировании
https://habr.com/ru/post/218753/

- The Dart type system
https://dart.dev/guides/language/sound-dart

- A Note on Soundness
https://www.typescriptlang.org/docs/handbook/type-compatibility.html#a-note-on-soundness

- Totality checking
http://docs.idris-lang.org/en/latest/tutorial/theorems.html#totality-checking

- Type variance
Ability to use subtype/supertype instead of the type
https://flow.org/en/docs/lang/variance/
https://stackoverflow.com/a/48858344/5801495

- Width Subtyping or Exact types
https://flow.org/en/docs/lang/width-subtyping/

- Session types in programming languages
http://simonjf.com/2016/05/28/session-type-implementations.html


#### Math related topics:
- Proof assistant
https://en.wikipedia.org/wiki/Proof_assistant

- Homotopy type theory
https://en.wikipedia.org/wiki/Homotopy_type_theory

- Type theory
https://en.wikipedia.org/wiki/Type_theory

- Curry–Howard correspondence
https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence

Hindley–Milner type system
https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system

- Lambda cube
https://en.wikipedia.org/wiki/Lambda_cube

- Book: Types and Programming Languages (By Benjamin C. Pierce)


#### TS, missed parts
- High kinded types (generic ‘containers’)
HKT proposal:
https://github.com/microsoft/TypeScript/issues/1213
- Lightweight higher-kinded polymorphism (fp-ts example):
https://github.com/gcanti/fp-ts/blob/master/src/HKT.ts
- Totality check (termination problem)
	By the time a sequence of (possibly mutually) recursive calls reaches f again, it must be possible to show that one of its arguments has decreased:
	http://docs.idris-lang.org/en/latest/tutorial/theorems.html#totality-checking
- A dependent type can prove that a value exists.
	https://en.wikipedia.org/wiki/Dependent_type

#### Extra:
- Linear type systems (every variable is used exactly once)
	Such systems are useful for constraining access to system resources such as files, locks and memory by keeping track of changes of state that occur and preventing invalid states
https://en.wikipedia.org/wiki/Substructural_type_system
- Session types can be thought of as “types for protocols”
