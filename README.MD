# Error Alchemy

## Description

Error Alchemy is a sophisticated error-handling framework designed for robust error management in TypeScript applications. It provides a flexible and powerful toolkit for creating custom errors, handling error transmutation, and ensuring detailed error logging and resolution. The library leverages `Zod` schemas extensively to ensure advanced type-safety and comprehensive type inference.

## Installation

To install Error Alchemy, use npm or yarn:

```bash
npm install @ocubist/error-alchemy
# or
yarn add @ocubist/error-alchemy
```

## Usage

### Basic Example

```ts
import { useErrorAlchemy } from "@ocubist/error-alchemy";
import { z } from "zod";

// Define your Zod schemas
const errorPropsSchema = z.object({
  name: z.string(),
  message: z.string(),
});

// Initialize the Error Alchemy toolkit
const { craftMysticError, craftErrorTransmuter } = useErrorAlchemy(
  "MyModule",
  "ExampleContext"
);

// Craft a custom error
const MyCustomError = craftMysticError({
  name: "MyCustomError",
  errorCode: "CUSTOM_ERROR",
  severity: "critical",
});

// Create a transmuter for the custom error
const transmuter = craftErrorTransmuter(
  (err) => err instanceof Error,
  (err) => new MyCustomError({ message: err.message, origin: err })
);

// Use the transmuter in your application
try {
  throw new Error("Something went wrong!");
} catch (error) {
  const customError = transmuter.execute(error);
  console.error("Handled error:", customError);
}
```

### Advanced Example with Error Synthesizer

```ts
import { useErrorAlchemy } from "@ocubist/error-alchemy";
import { z } from "zod";

// Define your Zod schemas
const errorPropsSchema = z.object({
  name: z.string(),
  message: z.string(),
});

// Initialize the Error Alchemy toolkit
const { craftErrorSynthesizer, craftMysticError, craftErrorTransmuter } =
  useErrorAlchemy("MyModule", "ExampleContext");

// Craft a custom error
const MyCustomError = craftMysticError({
  name: "MyCustomError",
  errorCode: "CUSTOM_ERROR",
  severity: "critical",
});

// Create a transmuter for the custom error
const transmuter = craftErrorTransmuter(
  (err) => err instanceof Error,
  (err) => new MyCustomError({ message: err.message, origin: err })
);

// Create an error synthesizer
const synthesizer = craftErrorSynthesizer([transmuter]);

// Use the synthesizer in your application
try {
  throw new Error("Something went wrong!");
} catch (error) {
  const synthesizedError = synthesizer.synthesize(error);
  console.error("Handled synthesized error:", synthesizedError);
}
```

## API Documentation

### `useErrorAlchemy`

#### Description

The `useErrorAlchemy` function initializes the Error Alchemy toolkit with the provided module and context. It returns a set of factory functions to craft different types of custom errors and error transmuters.

#### Parameters

- `module: string` - The module name to use for crafted errors.
- `context: string` - The context to use for crafted errors.

#### Returns

- `Object`
  - `craftErrorSynthesizer: Function`
  - `craftMysticError: Function`
  - `craftSynthesizedError: Function`
  - `craftErrorTransmuter: Function`
  - `craftErrorLogger: Function`
  - `craftErrorResolverMap: Function`
  - `craftErrorResolver: Function`

### `craftErrorSynthesizer`

#### Description

Crafts a new error synthesizer with the given middleware chain. Injects the module and context into the synthesized errors.

#### Parameters

- `middlewareChain: SynthesizerMiddlewareChain` - The middleware chain of transmuters.

#### Returns

- `Synthesizer` - The crafted synthesizer.

### `craftMysticError`

#### Description

Crafts a new mystic error with the given properties, injecting the module and context.

#### Parameters

- `props: AlchemyCraftErrorProps` - The properties of the mystic error.

#### Returns

- `TransmutedError` - The crafted mystic error.

### `craftSynthesizedError`

#### Description

Crafts a new synthesized error with the given properties, injecting the module and context.

#### Parameters

- `props: AlchemyCraftErrorProps` - The properties of the synthesized error.

#### Returns

- `TransmutedError` - The crafted synthesized error.

### `craftErrorTransmuter`

#### Description

Crafts a new transmuter with the given detector and transmuter functions, injecting the module and context.

#### Parameters

- `detectorFunction: DetectorFunction` - The function to detect errors.
- `transmuterFunction: TransmuterFunction<T>` - The function to transmute errors.

#### Returns

- `Transmuter<T>` - The crafted transmuter.

### `craftErrorLogger`

#### Description

Crafts a new error logger with the given properties.

#### Parameters

- `props: CraftErrorLoggerProps` - The properties of the error logger.

#### Returns

- `(err: unknown) => void` - The crafted error logger function.

### `craftErrorResolverMap`

#### Description

Crafts a new error resolver map with the given mappings.

#### Parameters

- `...mapping: ErrorMapEntry[]` - The error map entries.

#### Returns

- `Map<typeof SynthesizedError, (err: SynthesizedError) => void>` - The crafted error resolver map.

### `craftErrorResolver`

#### Description

Crafts a new error resolver with the given properties.

#### Parameters

- `props: CraftErrorResolverProps` - The properties of the error resolver.

#### Returns

- `(err: unknown) => void` - The crafted error resolver function.

### Validators

#### `asyncValidate`

#### Description

Asynchronously validates a value against a Zod schema.

#### Parameters

- `value: T` - The value to validate.
- `schema: ZodSchema<T>` - The Zod schema to validate against.

#### Returns

- `Promise<boolean>` - A promise that resolves to a boolean indicating whether the value is valid.

### `validate`

#### Description

Synchronously validates a value against a Zod schema.

#### Parameters

- `value: T` - The value to validate.
- `schema: ZodSchema<T>` - The Zod schema to validate against.

#### Returns

- `boolean` - A boolean indicating whether the value is valid.

### Parsers

#### `asyncParse`

#### Description

Asynchronously parses a value against a Zod schema.

#### Parameters

- `value: T` - The value to parse.
- `schema: ZodSchema<T>` - The Zod schema to parse against.

#### Returns

- `Promise<T>` - A promise that resolves to the parsed value.

#### Throws

- `AsyncParseFailedError` - If parsing fails.

### `parse`

#### Description

Synchronously parses a value against a Zod schema.

#### Parameters

- `value: T` - The value to parse.
- `schema: ZodSchema<T>` - The Zod schema to parse against.

#### Returns

- `T` - The parsed value.

#### Throws

- `ParseFailedError` - If parsing fails.

### Asserters

#### `assert`

#### Description

Asserts that a value matches a given Zod schema.

#### Parameters

- `value: unknown` - The value to assert.
- `schema?: ZodSchema<T>` - The Zod schema to validate against.

#### Throws

- `AssertFailedError` - If the assertion fails.

#### `assertDefined`

#### Description

Asserts that a value is defined and not null or NaN.

#### Parameters

- `value: T | null | undefined` - The value to assert.

#### Throws

- `AssertDefinedFailedError` - If the value is null, undefined, or NaN.

#### `assertEmpty`

#### Description

Asserts that a given value is empty.

#### Parameters

- `value: T` - The value to be checked for emptiness.

#### Throws

- `AssertEmptyFailedError` - If the value is not empty.

#### `assertFalsy`

#### Description

Asserts that a given value is falsy.

#### Parameters

- `value: T` - The value to be checked for falsiness.

#### Throws

- `AssertFalsyFailedError` - If the value is truthy.

#### `assertNotEmpty`

#### Description

Asserts that a given value is not empty.

#### Parameters

- `value: T` - The value to be checked for non-emptiness.
- `min: number` - The minimum acceptable length or size.
- `max: number` - The maximum acceptable length or size.

#### Throws

- `AssertNotEmptyFailedError` - If the value is empty.
- `AssertNotEmptyMaxSmallerThanMinError` - If the max length is smaller than the min length.

#### `assertTruthy`

#### Description

Asserts that a given value is truthy.

#### Parameters

- `value: T` - The value to be checked for truthiness.

#### Throws

- `AssertTruthyFailedError` - If the value is falsy.

## Error Handling

### Description

Error Alchemy uses a sophisticated framework for robust error handling. All errors thrown by this library are instances of the `MysticError` class, which extends the `TransmutedError` class, providing a rich error handling experience with detailed error properties and a consistent error structure.

### Error Types

#### `AssertFailedError`

Occurs when an assertion fails during validation.

#### `AsyncParseFailedError`

Occurs when an asynchronous parsing operation fails.

#### `ParseFailedError`

Occurs when a synchronous parsing operation fails.

#### `AssertDefinedFailedError`

Occurs when an assertion fails due to a value being null, undefined, or NaN.

#### `AssertEmptyFailedError`

Occurs when an assertion fails due to a value not being empty.

#### `AssertFalsyFailedError`

Occurs when an assertion fails due to a value being truthy.

#### `AssertNotEmptyFailedError`

Occurs when an assertion fails due to a value being empty.

#### `AssertNotEmptyMaxSmallerThanMinError`

Occurs when the maximum length is smaller than the minimum length in an assertion.

#### `AssertTruthyFailedError`

Occurs when an assertion fails due to a value being falsy.

### Properties of `MysticError`

- `instanceUuid: string` - A unique identifier for the error instance.
- `name: string` - The name of the error.
- `severity: Severity` - The severity level of the error.
- `origin?: unknown` - The original error that caused this error.
- `cause?: string` - A brief description of the cause of the error.
- `payload: Payload` - Additional data that help debugging.
- `module?: string` - The module in which the error occurred.
- `context?: string` - The context in which the error occurred.
- `errorCode: ErrorCode` - A code representing the error type.
- `message: string` - A message describing the error.
- `stack?: string` - The stack trace at the point where the error was thrown.

These properties provide comprehensive details about the error, making it easier to diagnose and handle errors effectively.

## License

Error Alchemy is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more information.
