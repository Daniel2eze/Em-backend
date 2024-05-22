const express = require("express")
const { registration, login, getUserName, isLoggedIn } = require("../controllers/authController");
const Router = express.Router();
const authMiddleware = require('../middleware/auth');
const { isLength } = require("validator");

// registration route

Router.post('/register',registration)

// login route
Router.post('/login',login)

// get username
Router.get('/getusername', authMiddleware ,getUserName)

// isLoggedIn
Router.get('/isloggedIn',isLoggedIn)

module.exports = Router;