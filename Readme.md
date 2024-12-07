# Task Management API

A comprehensive Node.js-based API for managing tasks, with features like user authentication, task creation, updates, deletion, file uploads, and filtering. The project uses modern technologies and practices, making it scalable and efficient.

## Features

- **User Authentication**
  - Signup and login with email and password.
  - Password validation with strong password requirements.
  - JWT-based authentication and authorization.
  
- **Task Management**
  - Create tasks with optional file uploads (images/documents).
  - Retrieve tasks with filtering by status (`pending`, `completed`) and pagination support.
  - Update and delete tasks, ensuring only the task creator can modify or remove tasks.

- **File Uploads**
  - Attach files to tasks and store them locally.

- **Input Validation**
  - User input validation using the `joi` library for secure and consistent data handling.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **File Uploads**: Multer
- **Validation**: Joi
- **Environment Management**: dotenv

## Prerequisites

- Node.js
- MongoDB
- A `.env` file with the following keys:
  ```plaintext
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  PORT=3000