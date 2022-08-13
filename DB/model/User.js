const mongoose = require('mongoose');
const bcrypt = require('bcrypt')





const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilePic: Array,
    coverPic: Array,
    coverPic: Array,
    role: { type: String, default: 'User' },
    wishList:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    confirmEmail: { type: Boolean, default: false },
    isBlooked:{ type: Boolean, default: false },
    isDeleted:{ type: Boolean, default: false },
    socketID:String

},{
    timestamps:true
})


userSchema.pre('save',async function (next) {
    this.password = await bcrypt.hash(this.password,parseInt(process.env.saltRound))
    next();
})
userSchema.pre('findByIdAndUpdate', async function (next) {
    console.log({ model: this.model });
    console.log({ query: this.getQuery() });
    const hookData = await this.model.findOne(this.getQuery()).select("__v")
    console.log({ hookData });
    this.set({ __v: hookData.__v + 1 })
    next()
})
const userModel = mongoose.model('User',userSchema);
module.exports = userModel