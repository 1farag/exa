const productModel = require("../../../DB/model/product")
const userModel = require("../../../DB/model/User")
const pagination = require("../../../servieces/pagination")



//getAllUsers
const getAllUsers = async (req,res)=>{
    const { page, size } = req.query
    const { skip, limit } = pagination(page, size)  
    const products = []
   try {
    for await (const users of userModel.find({comfirmEmail:true, isBlooked:false, isDeleted:false})
    .limit(limit)
    .skip(skip)
    .select('-qrCode')
    .populate({path:"wishList",select: '-qrCode'})) {
        const usersProducts = await productModel.find({CreatedBy: users._id, IsDeleted: false, Hidden: false}).select('-qrCode').
        populate({path:'comments',
        populate:{path:'reply'}
    })
    
    products.push({
        User_Info:users,
        Products_Of_User:usersProducts
    })
 
    }
    res.status(200).json({users:products})
   } catch (error) {
    console.log(error);
   }
}

// displayProfile
const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('firstName lastName email');
        res.status(200).json({ message: "Done", user })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
        console.log(error);

    }
}

// profile photo
const profilePIc = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        
        } else {
            const url = []
            req.files.forEach(file => {
                url.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:url}, { new: true })
            res.status(200).json({ message: "Done",user })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}

// cover photos
const coverPIC = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        
        } else {
            const url = []
            req.files.forEach(file => {
                url.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:url}, { new: true })
            res.status(200).json({ message: "Done" , user})
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
        console.log(error);
    }

}



module.exports = {displayProfile,profilePIc,coverPIC,getAllUsers}