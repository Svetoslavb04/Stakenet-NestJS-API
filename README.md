# Stakenet

## Description

This REST API is designed to provide access to data from DeFi contracts and staking tokens. It allows users to retrieve information about tokens, contract properties, and specific staking user data. The API ensures that data is returned in a consistent and user-friendly format, taking into account various units for amounts, durations, and timestamps. Additionally, the API includes validation for query parameters and a suite of unit tests to ensure reliability.

## Installation

```bash
$ npm install
```

After the installation, contract types will be generated (See `postinstall` script)

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

## Endpoints

Here are the endpoints available in the Stakenet API:

- [Retrieve Token Information](#retrieve-token-information)
- [Retrieve Contract Data](#retrieve-contract-data)

### Retrieve Token Information

This endpoint allows you to retrieve information about a specific ERC20 token by its Ethereum address.

- **URL**: `/token/:address`
- **Method**: `GET`
- **Parameters**:
  - `address` (string, required): The Ethereum address of the ERC20 token.

#### Example

```bash
GET /token/0x2BdFb6a7B89e933B0A8c34E3dcc32E8C684c7738
```

#### Response

- **200 OK**: `Returns information about the ERC20 token.`
- **400 Bad Request**: `If the Ethereum address is not an ERC20 token.`

#### Response Body

```json
{
  "data": {
    // Token information here
  }
}
```

### Retrieve Contract Data

This endpoint allows you to retrieve various data related to a Stakenet contract.

- **URL**: `/contract/:address`
- **Method**: `GET`
- **Parameters**:
  - `address` (string, required): The Ethereum address of the Stakenet contract.
  - `property` (string, required): The property of the contract to retrieve.
  - `user` (string, optional): The user associated with the property (required for some properties).
  - `owner` (string, optional): The owner associated with the property (required for some properties).
  - `spender` (string, optional): The spender associated with the property (required for some properties).

#### Example

```
GET /contract/0x2BdFb6a7B89e933B0A8c34E3dcc32E8C684c7738?property=userData&user=0x0c9276b8bAf2b37140679204027d574AC2D71297
```

#### Response

- **200 OK**: `Returns the requested contract data.`
- **400 Bad Request**: `If the Ethereum address is not a Stakenet contract.`

#### Response Body

```json
{
  "data": {
    // User data here formatted in different units
    userHasPosition,
    balance,
    rewards,
    userHasStaked,
    userStakedTimestamp,
    canWithdrawAfter
  }
}
```

## Stay in touch

- Author - [Svetoslav Borislavov](https://www.linkedin.com/in/svetoslavborislavov/)

## License

Stakenet REST API is [MIT licensed](LICENSE).
