const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const Auth = require('../model/authModel');
const generationToken = require('../util/token');


// Register
const registerUser = async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;

        // Encrypt the password with a salt
        let encPass = await bcrypt.hash(password, 10);

        // Check if the email is already registered
        let exEmail = await Auth.findOne({ email });
        if (exEmail) {
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${email} is already registered` });
        }

        // Check if the mobile number is already registered
        let exMobile = await Auth.findOne({ mobile });
        if (exMobile) {
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${mobile} number is already registered` });
        }

        // Save the user info
        let newUser = await Auth.create({ name, email, mobile, password: encPass });


        // Respond with success
        res.status(StatusCodes.CREATED).json({ status: true, msg: "User registered successfully", user: newUser });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        let extUser = await Auth.findOne({ email });
        if (!extUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "User not found" });
        }

        // Validate password
        let passVal = await bcrypt.compare(password, extUser.password);
        if (!passVal) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: "Invalid credentials" });
        }

        // Generate token and set cookie
        let token = generationToken(extUser);
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict' // Protect against CSRF attacks
        });

        // Respond with success
        res.status(StatusCodes.OK).json({ status: true, msg: "Login successful", token });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message });
    }
};

// Logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", { path: '/' });
        res.status(StatusCodes.OK).json({ status: true, msg: "Logout successful" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message });
    }
};

// Verify Token
const verifyUserToken = async (req, res) => {
    try {
        let id = req.userId;
        let extUser = await Auth.findById(id).select('-password');
        if (!extUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "User not found" });
        }

        // Respond with user details
        res.status(StatusCodes.ACCEPTED).json({ status: true, user: extUser });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, verifyUserToken };
