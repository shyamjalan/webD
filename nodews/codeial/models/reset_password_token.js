const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    //token belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' }
    }
},{
    timestamps: true
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;