````markdown
# API Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and stores the user information in the database. Upon successful registration, it returns the user details along with access and refresh tokens.

### Method

`POST`

### Request Body

The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (min: 3 characters)"
  },
  "email": "string (valid email format)",
  "password": "string (min: 8 characters)"
}
```
````

### Validation Rules

- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

### Responses

#### Success Response

- **Status Code**: `201 Created`
- **Response Body**:

```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "accessToken": "string",
  "refreshToken": "string"
}
```

#### Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

```json
{
  "message": "Internal Server Error"
}
```

### Example Request

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Example Success Response

```json
{
  "user": {
    "_id": "64f1c2e7e4b0f5a1d8c9a123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Endpoint: `/users/login`

### Description

This endpoint is used to authenticate an existing user. It validates the input data, checks the user's credentials, and returns access and refresh tokens upon successful login.

### Method

`POST`

### Request Body

The following fields are required in the request body:

```json
{
  "email": "string (valid email format)",
  "password": "string (min: 8 characters)"
}
```

### Validation Rules

- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

### Responses

#### Success Response

- **Status Code**: `200 OK`
- **Response Body**:

```json
{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "accessToken": "string",
  "refreshToken": "string"
}
```

#### Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

#### Authentication Error

- **Status Code**: `401 Unauthorized`
- **Response Body**:

```json
{
  "message": "Invalid email or password"
}
```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

```json
{
  "message": "Internal Server Error"
}
```

### Example Request

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Example Success Response

```json
{
  "user": {
    "_id": "64f1c2e7e4b0f5a1d8c9a123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Endpoint: `/users/profile`

### Description

This endpoint is used to retrieve the profile information of the currently authenticated user. It requires a valid access token in the `Authorization` header.

### Method

`GET`

### Request Headers

- `Authorization`: `Bearer <access_token>`

### Responses

#### Success Response

- **Status Code**: `200 OK`
- **Response Body**:

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### Authentication Error

- **Status Code**: `401 Unauthorized`
- **Response Body**:

```json
{
  "message": "Unauthorized"
}
```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

```json
{
  "message": "Internal Server Error"
}
```

### Example Request

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <access_token>"
```

### Example Success Response

```json
{
  "_id": "64f1c2e7e4b0f5a1d8c9a123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

## Endpoint: `/users/logout`

### Description

This endpoint is used to log out the current user by invalidating the refresh token. It requires the refresh token to be sent as a cookie.

### Method

`GET`

### Request Cookies

- `refreshToken`: string

### Responses

#### Success Response

- **Status Code**: `200 OK`
- **Response Body**:

```json
{
  "message": "Logged out successfully"
}
```

#### No Refresh Token Provided

- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "message": "No refresh token provided"
}
```

#### Unauthorized

- **Status Code**: `401 Unauthorized`
- **Response Body**:

```json
{
  "message": "User not found"
}
```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

```json
{
  "message": "Server Error"
}
```

### Example Request

```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Cookie: refreshToken=<refresh_token>"
```

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

## Endpoint: `/drivers/register`

### Description

This endpoint is used to register a new driver in the system. It validates the input data, hashes the password, and stores the driver information in the database. Upon successful registration, it returns the driver details along with access and refresh tokens.

### Method

`POST`

### Request Body

The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (min: 3 characters)"
  },
  "email": "string (valid email format)",
  "password": "string (min: 8 characters)",
  "phone": "string (valid phone number)",
  "vehicle": {
    "color": "string",
    "registration": "string (min: 2 characters)",
    "vehicleCapacity": "number (min: 4, max: 8)",
    "vehicleType": "string (enum: sedan, suv, van, hatchback)"
  }
}
```

### Validation Rules

- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.
- `phone`: Must be a valid phone number.
- `vehicle.registration`: Must be at least 2 characters long.
- `vehicle.vehicleCapacity`: Must be between 4 and 8.
- `vehicle.vehicleType`: Must be one of "sedan", "suv", "van", or "hatchback".

### Responses

#### Success Response

- **Status Code**: `201 Created`
- **Response Body**:

```json
{
  "driver": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "phone": "string",
    "vehicle": {
      "color": "string",
      "registration": "string",
      "vehicleCapacity": "number",
      "vehicleType": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  },
  "accessToken": "string",
  "refreshToken": "string"
}
```

#### Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body**:

```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

#### Internal Server Error

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

```json
{
  "message": "Internal Server Error"
}
```

### Example Request

```bash
curl -X POST http://localhost:4000/drivers/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "phone": "1234567890",
    "vehicle": {
      "color": "red",
      "registration": "ABC1234",
      "vehicleCapacity": 5,
      "vehicleType": "sedan"
    }
  }'
```

### Example Success Response

```json
{
  "driver": {
    "_id": "64f1c2e7e4b0f5a1d8c9a123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "vehicle": {
      "color": "red",
      "registration": "ABC1234",
      "vehicleCapacity": 5,
      "vehicleType": "sedan"
    },
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
