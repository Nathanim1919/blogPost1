const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo:{
        type:String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    meat: {
        like: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
        },
    },
}, {
    timestamps: true,
});



module.exports.Post = mongoose.model('Post', postSchema);