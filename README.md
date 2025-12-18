# SmartSplit

Build with the MERN stack (MongoDB, Express, React and NodeJS)

## Introduction

A full stack expense spliting app - splitwise clone made using the MERN stack (MongoDB, Express, React & Nodejs), specially designed to split group expense between friends. With this application, you can add your expense details and get an whole expense analytics feature - Group Balance, Monthly amount spend, Catagory wise expense spending graph etc.

## Features

- Create user groups and track group expense 
- Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way. 
- Get Analytical graphs to understand your expenditure trend 
- Multiple user registration.
- Authentication using JSON web token (JWT)

## Tech Stack

### Backend
- Node.js with Express
- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- MongoDB (MongoDB Atlas)

### Frontend
- React JS
- Redux (for managing and centralizing application state)
- Axios (for making api calls)
- Material UI (for User Interface)
- Chart.js (To display various analytics graphs)
- React-chartjs-2  
- Gravitar (for user profile picture)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) and npm
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SmartSplit
```

### 2. Backend Setup

Navigate to the root directory and run:

```bash
npm install
npm start (to start the server)
```


Create a `.env` file in the backend directory (root directory) with the following variables:

```env
# MongoDB Connection String
# Please follow this tutorial https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i to create your mongoDB connection url, which you'll use as your MONGODB_URI
# It should look something like this: mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Cluster
MONGO_URI=""

# Provide some random key in ACCESS_TOKEN_SECRET or you could generate one using node enter the below command in the terminal to genrate a random secret key 
# node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
ACCESS_TOKEN_SECRET=""

# Server Port (optional, defaults to 3001)
PORT=3001
```


### 3. Frontend Setup

In the second terminal, navigate to the client directory and run:

```bash
cd client
npm install
npm start 
```

The backend server will start on `http://localhost:3001` (or the port specified in your `.env` file).

You should see:
```
Server started in PORT | 3001
DB Connected
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas connection string is correct
- Check that the database name in your `MONGO_URI` is correct

### CORS Errors
- Ensure `CLIENT_ORIGIN` in backend `.env` matches your frontend URL
- Make sure both frontend and backend servers are running

### Port Already in Use
- If port 3001 is already in use, change the `PORT` in backend `.env`

## License

See the LICENSE file for details.

## Support

For issues or questions, please open an issue in the repository.