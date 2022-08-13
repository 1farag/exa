const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId :{ type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], 
}, {
    timestamps: true
})
const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel
