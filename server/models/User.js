const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["developer", "recruiter", "admin"],
        default: "developer"
    },
    bio: {
        type: String,
        trim: true,
        default: ""
    },

    headline: {
        type: String,
        trim: true,
        default: ""
    },

    skills: [{
        type: String,
        trim: true
    }],

    githubUsername: {
        type: String,
        trim: true,
        default: ""
    },

    linkedinUrl: {
        type: String,
        trim: true,
        default: ""
    },

    portfolioUrl: {
        type: String,
        trim: true,
        default: ""
    },

    company: {
        type: String,
        trim: true,
        default: ""
    },

    designation: {
        type: String,
        trim: true,
        default: ""
    },

    savedDevelopers: [
        {
            developer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            savedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
    {
        timestamps: true
    }

);

const User = mongoose.model("User", userSchema);

module.exports = User;