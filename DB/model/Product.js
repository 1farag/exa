const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String,
    desc: String,
    price:String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    IsDeleted: { type: Boolean, default: false },
    Hidden: { type: Boolean, default: false },
    qrCode:{ type: String, default: "" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], 
}, {
    timestamps: true
})
productSchema.pre('findByIdAndUpdate', async function (next) {
    console.log({ model: this.model });
    console.log({ query: this.getQuery() });
    const hookData = await this.model.findOne(this.getQuery()).select("__v")
    console.log({ hookData });
    this.set({ __v: hookData.__v + 1 })
    next()
})
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel