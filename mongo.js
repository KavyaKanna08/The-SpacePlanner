const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/SpacePlannerDB")
.then(() => {
    console.log('Mongoose connected');
})
.catch((e) => {
    console.log('Failed to connect to MongoDB', e);
});

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    }
});

// Define Order Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User, Order };
