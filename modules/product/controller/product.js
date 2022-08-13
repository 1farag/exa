const productModel = require("../../../DB/model/product");
const userModel = require("../../../DB/model/User");
const { getIo } = require("../../../servieces/socket");
const QRCode = require('qrcode');




// createProduct
const createProduct = async( req, res )=>{
    const {title,price,desc} = req.body;
    try {
            const newProduct = new productModel({title,price,desc, createdBy : req.user._id}) 
            const savedProduct = await newProduct.save();
            // // Qr 

            const qrData = JSON.stringify(savedProduct)
            const qrCode = await QRCode.toDataURL(qrData, {errorCorrectionLevel: 'H'})
            const product =  await productModel.findByIdAndUpdate(savedProduct._id,{qrCode: qrCode},{new: true})

            // socket
            getIo().emit('reply', product)
            res.status(200).json({message:"Done",product})
            
        } catch (error) {
        res.status(400).json({message:"catch error"})
        console.log(error);
    }
}

//updateProduct
const updateProduct = async (req,res)=>{

    const {id} = req.params
    const {text , desc , price} = req.body

    try {
        const updateProduct = await productModel.findByIdAndUpdate(id,{text , desc , price, qrCode:'' , $inc: { __v: 1 }})
        
        const qrData = JSON.stringify(updateProduct)
        const qrCode = await QRCode.toDataURL(qrData)
        const product =  await productModel.findByIdAndUpdate(updateProduct._id,{qrCode: qrCode},{new:true})


        res.status(200).json({ message: "Done",product })

    } catch (error) {
        res.status(400).json({message:"catch err",error})
        console.log(error);
    }


}

//deletProduct
const deletProduct = async (req,res)=>{
    const id = req.params.id
    try {
        await productModel.findByIdAndRemove(id)
        res.status(200).json({ message: "Done" })

    } catch (error) {
        res.status(400).json({message:"catch err",error})
        console.log(error);
    }


}

//softDelete
const softDelete = async (req,res)=>{
    const id = req.params.id
    try {
           await productModel.findByIdAndUpdate(id,{IsDeleted: true})

        res.status(200).json({ message: "Done" })

}catch(error){
 res.status(400).json({message:'catch error',error})
 console.log(error);
}
}

// hiddenProduct
const hiddenProduct = async (req,res)=>{
    const id = req.params.id
    try {
        await productModel.findByIdAndUpdate(id,{Hidden:true})
        res.status(200).json({ message: "Done" })

    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }
}

// addToWishList
const addToWishList = async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await productModel.findOne({_id:id})
        if (!product) {
                res.status(404).json({message:"Product Not Found"})            
        } else {
            const user = await userModel.findOne({_id:req.user._id})
            if(user.wishList.includes(product._id )){
                res.status(400).json({message:"product already added"})
            }else{
                await userModel.findByIdAndUpdate(user._id,{$push:{wishList:product._id}})
                res.status(200).json({ message: "Done" })

            }
        }
    } catch (error) {
        res.status(400).json({message:"catch err",error})
        console.log(error);
    }
}

// likeProduct
const likeProduct = async (req, res) => {
   try {
    await productModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
   } catch (error) {
    res.status(400).json({message:"catch err",error})
    console.log(error);
   }
}

// unlikeProduct
const unlikeProduct = async (req, res) => {
    await productModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}

module.exports ={
    createProduct,likeProduct,
    unlikeProduct,updateProduct,
    deletProduct,addToWishList,
    softDelete,hiddenProduct
}