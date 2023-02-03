const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    date: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = {Post: mongoose.model("Instauser", userSchema)}