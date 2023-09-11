# Stakenet

## Description

This REST API is designed to provide access to data from DeFi contracts and staking tokens. It allows users to retrieve information about tokens, contract properties, and specific staking user data. The API ensures that data is returned in a consistent and user-friendly format, taking into account various units for amounts, durations, and timestamps. Additionally, the API includes validation for query parameters and a suite of unit tests to ensure reliability.

## Installation

```bash
$ npm install
```

Create `.env` file by filling the `.env.example` file and renaming in to `.env`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Svetoslav Borislavov](https://www.linkedin.com/in/svetoslavborislavov/)

## License

Stakenet REST API is [MIT licensed](LICENSE).
