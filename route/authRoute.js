const { registerUser, loginUser, logoutUser, verifyUserToken } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Make sure to import your authMiddleware

const authRoute = require('express').Router();

// Register route
authRoute.post(`/register`, registerUser);

// Login user
authRoute.post(`/login`, loginUser);

// Logout user
authRoute.get(`/logout`, logoutUser);

// Verify user token
authRoute.get(`/verify/usertoken`, authMiddleware, verifyUserToken);

module.exports = authRoute;
