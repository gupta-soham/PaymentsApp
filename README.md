# Payments App 💸

A full-stack Payment application built with Node.js, Express.js, MongoDB, and React.js which allows users to sign up 🆕, sign in 🔒, view their account balance 💰, and transfer money to other registered users.

---
### [Click here to preview the page live.](https://app-payments.vercel.app/) 🌐

## Setup and Installation 🛠️

- Clone the repository: `git clone https://github.com/gupta-soham/payments-app.git`
  - Optionally you can checkout the `local` branch: `git checkout local` and run the server using the localhost literals.

1. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Run `npm install` to install the dependencies.
   - Create a `.env` file and add the following environment variables:
     - `DB_URI`: The connection string for your MongoDB database.
     - `JWT_SECRET`: A secret key used for signing and verifying JWT tokens.
     - `PORT`: The port number for the backend server (e.g., `3000`)
    > For simplicity, I have also provided an example `.env` file which can be renamed and replaced with the actual variable values.
   - Run `npm run prod` to start the server.

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Run `npm install` to install the dependencies.
   - Create a `.env` file and add the following environment variable:
     - `VITE_BE_API`: The URL of your backend API (e.g., `http://localhost:3000/api/v1`).
   - Run `npm run dev` to start the development server.
   - Open your web browser and visit `http://localhost:5173` (or the URL provided by the frontend development server)

> Note if you are on the `main` branch the you have to create another `.env` file in the `frontend` directory and provide `VITE_BE_API` as the link to access the backend API calls. This step can be skipped if you are on the `local` branch.

## Features
The Payments App provides the following features:

1. **User Authentication**:
   - Users can sign up 🆕 and create a new account.
   - Users can sign in 🔒 with their credentials and receive a JWT token for authentication.

2. **Account Management**:
   - Users can view their account balance 💰.
   - Users can transfer money to other registered users.

3. **User Search**:
   - Users can search for other registered users by their first or last name.
   - Users can initiate a money transfer to any other user.

## Backend 

The backend of the application is built with Node.js and Express.js, and it uses MongoDB as the database. The backend code is located in the `backend` directory.

### Dependencies

The following dependencies are used in the backend:

- `cors`: For handling Cross-Origin Resource Sharing (CORS)
- `express`: A web application framework for Node.js
- `jsonwebtoken`: For generating and verifying JSON Web Tokens (JWT)
- `mongoose`: An Object Data Modeling (ODM) library for MongoDB
- `zod`: For data validation and parsing

### Routes

#### User Routes

- `POST /api/v1/user/signup`: Creates a new user account
- `POST /api/v1/user/signin`: Authenticates a user and returns a JWT token
- `GET /api/v1/user/me`: Returns the authenticated user's details (requires authentication)
- `PUT /api/v1/user/`: Updates the authenticated user's profile (requires authentication)
- `GET /api/v1/user/bulk`: Returns a list of users based on a search filter

#### Account Routes

- `GET /api/v1/account/balance`: Returns the authenticated user's account balance (requires authentication)
- `POST /api/v1/account/transfer`: Transfers money from the authenticated user's account to another user's account (requires authentication)

## Frontend

The frontend of the application is built with React.js and is located in the `frontend` directory.

### Dependencies

The following dependencies are used in the frontend:

- `axios`: For making HTTP requests
- `react`: The React library
- `react-dom`: Provides DOM-specific methods for React
- `react-router-dom`: For handling client-side routing in React applications

## Deployment

To deploy the application, you'll need to build the frontend and serve the backend and frontend separately. Here are the steps:

1. Build the frontend: `cd frontend && npm run build` 🏗️
2. Deploy the backend server to your hosting platform
3. Deploy the `dist` folder (generated by the frontend build process) to a separate hosting platform or a static file server
4. Also, remember to add the necessary environment variables for your application. 🔑

Note that the specific deployment process may vary depending on your hosting platform and infrastructure setup.

## License
This project is licensed under the [MIT License](LICENSE) 📜