const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user' ,
        enum: ["admin", "user",]
    }
}, {
    collection: "auth" ,
    timestamps: true
})

module.exports = mongoose.model("Auth", authSchema)