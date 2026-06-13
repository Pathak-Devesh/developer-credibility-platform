const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        githubUrl: {
            type: String,
            trim: true,
            default: ""
        },

        liveUrl: {
            type: String,
            trim: true,
            default: ""
        },

        techStack: [
            {
                type: String,
                trim: true
            }
        ],

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        verificationStatus: {
            type: String,
            enum: ["pending", "verified", "failed"],
            default: "pending"
        },
        githubAnalytics: {
            stars: {
                type: Number,
                default: 0
            },

            forks: {
                type: Number,
                default: 0
            },

            primaryLanguage: {
                type: String,
                default: ""
            },

            languages: {
                type: Map,
                of: Number,
                default: {}
            },

            lastSyncedAt: {
                type: Date,
                default: null
            }
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);