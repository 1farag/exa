const Joi = require("joi");

const createProduct = {
    
    body:Joi.object().required().keys({
        title:Joi.string().required(),
        desc:Joi.string().required(),
        price:Joi.string().required()    })
}
const updateProduct = {
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    }),
    body:Joi.object().required().keys({
        title:Joi.string().optional(),
        desc:Joi.string().optional(),
        price:Joi.string().optional(),
    })
}


const likeProduct = {

    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}
const createComment = {

    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}
    const updateComment = {

        body: Joi.object().required().keys({
            text: Joi.string().required(),
        
        }),
        params:Joi.object().required().keys({
            comentID:Joi.string().min(24).max(24).required()
        })
    }
    const deleteComment = {
        params:Joi.object().required().keys({
            comentID:Joi.string().min(24).max(24).required()
        })
    }


const replyOnComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        comentID:Joi.string().min(24).max(24).required()
    })
}
module.exports = {createProduct,likeProduct,createComment,replyOnComment,updateProduct,updateComment,deleteComment}