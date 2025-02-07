[]: # Title: Packages Explained
[]: # Description: A list of all the packages used in the otter-backend project
[]: # Section: packages

##### The purpose of prismajs is to provide a type-safe way to interact with a database. It is used to define the schema of the database and to generate the typescript types for the database schema. It is used in the otter-backend project to interact with the database.
### "@prisma/client": "^5.10.2",
##### The purpose of bcryptjs is to provide a way to hash passwords securely. It is used in the otter-backend project to hash passwords before storing them in the database.
### "bcryptjs": "^2.4.3",
##### The purpose of compression is to compress the response data before sending it to the client. It is used in the otter-backend project to improve the performance of the API by reducing the size of the response data.
### "compression": "^1.7.4",
##### The purpose of cors is to enable cross-origin resource sharing. It is used in the otter-backend project to allow the frontend to make requests to the API from a different domain.
### "cors": "^2.8.5",
##### The purpose of dotenv is to load environment variables from a .env file into the process.env object. It is used in the otter-backend project to store sensitive information such as API keys and database connection strings.
### "dotenv": "^16.4.5",
##### The purpose of express is to provide a web application framework for Node.js. It is used in the otter-backend project to create the API endpoints and handle the HTTP requests.
"express": "^4.18.2",
##### The purpose of express-rate-limit is to limit the number of requests that a client can make to the API in a given time period. It is used in the otter-backend project to prevent abuse of the API by limiting the number of requests that a client can make.
"express-rate-limit": "^7.1.5",
##### The purpose of helmet is to set various HTTP headers to secure the API. It is used in the otter-backend project to protect the API from common security vulnerabilities.
"helmet": "^7.1.0",
##### The purpose of jsonwebtoken is to generate and verify JSON Web Tokens (JWT). It is used in the otter-backend project to authenticate users and protect the API endpoints.
"jsonwebtoken": "^9.0.2",
##### The purpose of morgan is to log HTTP requests. It is used in the otter-backend project to log information about the requests that are made to the API.
"morgan": "^1.10.0",
##### The purpose of passport is to provide authentication middleware for Node.js. It is used in the otter-backend project to authenticate users using various strategies such as Google OAuth.
"passport": "^0.7.0",
##### The purpose of passport-google-oauth20 is to provide a Google OAuth 2.0 authentication strategy for Passport. It is used in the otter-backend project to authenticate users using Google OAuth.
"passport-google-oauth20": "^2.0.0",
##### The purpose of passport-jwt is to provide a JSON Web Token (JWT) authentication strategy for Passport. It is used in the otter-backend project to authenticate users using JWT.
"passport-jwt": "^4.0.1",
##### The purpose of stripe is to provide a way to interact with the Stripe API. It is used in the otter-backend project to handle payments using the Stripe API.
"stripe": "^14.17.0",
##### The purpose of winston is to provide a logging library for Node.js. It is used in the otter-backend project to log information about the requests that are made to the API.
"winston": "^3.11.0",
##### The purpose of zod is to provide a type-safe way to validate data. It is used in the otter-backend project to validate the data that is sent to the API endpoints.
"zod": "^3.22.4"
##### The purpose of eslint is to provide a tool for identifying and reporting on patterns found in JavaScript code. It is used in the otter-backend project to enforce a consistent coding style and to catch common programming errors.
},
"devDependencies": {
"eslint": "^8.57.0",
"eslint-config-airbnb-base": "^15.0.0",
"eslint-plugin-import": "^2.29.1",
"jest": "^29.7.0",
"nodemon": "^3.0.3",
"prisma": "^5.10.2",
"supertest": "^6.3.4"
},
"engines": {
"node": ">=18.0.0"
}
}
