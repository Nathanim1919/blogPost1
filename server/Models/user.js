const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    profile: {
        type: String,
    },
    profesion:{
        type:String,
    },
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    }
})

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email
    });
   
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};
module.exports.User = mongoose.model('User', userSchema);