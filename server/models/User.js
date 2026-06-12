const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role:{
        type: String,
        enum: ["developer", "recruiter", "admin"],
        default: "developer"
    }
},
    {
        timestamps: true
    }

);

const User = mongoose.model("User",userSchema);

module.exports = User;