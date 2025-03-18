# NodeAuthAPI# Auth-API

A robust authentication API built with Node.js, Express.js, MongoDB, and JWT (JSON Web Tokens). This project provides user registration, login, password reset functionality, and a protected route to fetch user data. It follows industry-standard practices with a modular folder structure, input validation, and secure password hashing.

## Features
- User registration with unique username and email.
- User login with JWT-based authentication.
- Password reset functionality (simulated; token returned instead of emailed).
- Protected route to fetch authenticated user data.
- Input validation using `express-validator`.
- Password hashing with `bcryptjs`.
- MongoDB integration with Mongoose.

## Tech Stack
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Token-based authentication.
- **Bcryptjs**: Password hashing.
- **Express-validator**: Input validation middleware.
- **Dotenv**: Environment variable management.

## Folder Structure
```
auth-api/
├── config/              # Database configuration
│   └── db.js
├── controllers/         # Request handlers
│   └── authController.js
├── middlewares/         # Custom middleware
│   ├── authMiddleware.js
├── models/              # Mongoose schemas
│   └── User.js
├── routes/              # API routes
│   └── authRoutes.js
├── utils/               # Utility functions
│   ├── passwordUtils.js
│   └── tokenUtils.js
├── .env                 # Environment variables (not tracked in Git)
├── .gitignore           # Git ignore file
├── app.js               # Main application file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Prerequisites
- **Node.js** (v14.x or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** (for cloning and version control)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/NodeAuthAPI.git
   cd NodeAuthAPI
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory with the following:
     ```
     MONGO_URI=mongodb://localhost:27017/auth-api
     JWT_SECRET=your_jwt_secret_here
     PORT=5000
     ```
   - Replace `your_jwt_secret_here` with a secure secret key.
   - Update `MONGO_URI` if using MongoDB Atlas.

4. **Run MongoDB**:
   - Ensure MongoDB is running locally (`mongod`), or use a cloud instance.

5. **Start the Server**:
   ```bash
   node app.js
   ```
   - Output: `Server running on port 5000` and `MongoDB connected`.

   Optionally, install `nodemon` for auto-reloading:
   ```bash
   npm install nodemon --save-dev
   ```
   Then update `package.json` scripts:
   ```json
   "scripts": {
     "start": "nodemon app.js"
   }
   ```

## Security Notes
- Passwords are hashed with `bcryptjs`.
- JWT tokens expire after 1 hour (configurable in `tokenUtils.js`).
- In production:
  - Use HTTPS.
  - Implement rate limiting (e.g., with `express-rate-limit`).
  - Send password reset tokens via email (e.g., with `nodemailer`).

## Future Improvements
- Add email verification for new users.
- Implement role-based access control (RBAC).
- Add logging middleware for debugging.

## Contributing
Feel free to fork this repository, submit issues, or create pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Contact
- GitHub: [mani901](https://github.com/your-username)
- Email: abrehman8491@gmail.com
