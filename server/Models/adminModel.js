const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    user:String,
    password:String,
    role: { type: String, default: 'admin' },
})


module.exports = mongoose.model("adminuser",adminSchema);