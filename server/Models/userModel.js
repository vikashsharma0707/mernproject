const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    email: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    city: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    password: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    category: {
        type: String,
        required: true  // Corrected 'require' to 'required'
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    }
});

// Exporting the model with a capital 'U' to follow Mongoose naming conventions
module.exports = mongoose.model("User", userSchema);
