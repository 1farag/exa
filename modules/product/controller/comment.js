const productModel = require("../../../DB/model/product")
const commentModel = require("../../../DB/model/Comment");
const { getIo } = require("../../../servieces/socket");


// createComment
const createComment = async (req,res)=>{

    const {id} =  req.params;
    const {text} = req.body;
    const {_id} = req.user ;
    try {
        const product = await productModel.findOne({_id: id })
    if (!product) {
        res.status(404).json({message:"product not found"})
    } else {
        const newComment = new commentModel({text,productId:product._id,createdBy:_id})
        const savedComment =await newComment.save();
        getIo().emit('reply', savedComment)
        res.status(200).json({message:"Done",savedComment})
        await productModel.findByIdAndUpdate(product._id, { $push: { comments: savedComment._id }},{new:true})

        res.status(200).json({ message: "Done" })

    }
    } catch (error) {
        console.log(error);
    }
}

// replyOnComment
const replyOnComment = async (req,res)=>{

    const {comentID} =  req.params;
    const {text} = req.body;

    try {
     
            const comment = await commentModel.findOne({_id: comentID })
            if (!comment) {
                res.status(404).json({message:"comment not found"})
            }else{
           const newComment = new commentModel({text,createdBy:req.user._id,productId:comment.productId,})
           const savedComment = await newComment.save()
            await commentModel.findByIdAndUpdate(comment._id,{$push:{reply:savedComment._id}})
            res.status(200).json({ message: "Done", })


        }
    
    } catch (error) {
        res.status(400).json({message:"catch error",error})
    }

}

// updateComment
const updateComment = async (req,res)=>{
    const {comentID} = req.params
    const {text} = req.body
    try {
        const comment = await commentModel.findByIdAndUpdate(comentID,text, {$inc: { __v: 1 }} )
        res.status(200).json({ message: "Done",comment })

    } catch (error) {
        res.status(400).json({message:"catch err",error})
        console.log(error);
    }


}

// deleteComment
const deleteComment = async (req,res)=>{
    const {comentID} = req.params
    try {
        await commentModel.findByIdAndDelete(comentID)
        res.status(200).json({ message: "Done" })

    } catch (error) {
        res.status(400).json({message:"catch err",error})
        console.log(error);
    }


}

// likeComment
const likeComment = async (req, res) => {
    try {
        const comment = await commentModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
        if (!comment) {
            res.status(404).json({message:"in valid comment id"})

        } 
        res.status(200).json({ message: "Done" })
    } catch (error) {
        res.status(500).json({message:"catch error"},error)
    }
}

// unlikeComment
const unlikeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}

module.exports ={
    createComment,replyOnComment,
    likeComment,unlikeComment,
    updateComment,deleteComment
}