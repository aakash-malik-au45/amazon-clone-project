const mongoose = require("mongoose");
PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    createdDate: {
        type: Date
    }
});


const Post = mongoose.model('post', PostSchema);
module.exports = Post