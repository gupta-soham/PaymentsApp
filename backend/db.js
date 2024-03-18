// import mongoose, { model } from 'mongoose';
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://{username}:{password}@cluster0.akf5gyy.mongodb.net/paytm");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model
        required: true
    },
    balance: {
        type: Number, // convert to paise => ₹ * 100
        required: true
    }
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User, Account
}