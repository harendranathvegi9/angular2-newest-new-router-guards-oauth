# Angular 2 RC1 Sample

## Prerequisites

- NodeJS (nodejs.org)

## Credits

This sample uses webpack (https://webpack.github.io/) to bundle up the commonjs-based libs and the commonjs-based sample-code.

## Install

```
npm install
```

## Run

This will start the server on http://localhost:8080

```
npm run server
```

## Unit Tests

To start the unit tests run:

```
npm test
```

If you want to run them in continous TDD mode run:

```
npm run test:watch
```

## E2E

Start the server in one terminal:

```
npm run server
```

In another terminal first time install E2E dependencies

```
npm run pree2e
```

and afterwards

```
npm run e2e
```
