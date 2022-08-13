const express = require("express");
const { auth } = require("../../middlwear/auth");
const productController = require("./controller/product");
const commentController = require("./controller/comment");

const endPoint = require("./product.endPoint");
const validation = require("../../middlwear/validation");
const validators = require('./product.validation')
const router = express.Router();

// watshlist
router.patch('/addToWishList/:id',auth(endPoint.addWatshlist),productController.addToWishList)
//add product
router.post("/",auth(endPoint.createProduct),validation(validators.createProduct),productController.createProduct)
//update
router.patch('/update/:id',validation(validators.updateProduct),auth(endPoint.updateProduct),productController.updateProduct)
// delete
router.delete('/delete/:id',auth(endPoint.deleteProduct),productController.deletProduct)
// soft Delete
router.patch('/softDelete/:id',auth(endPoint.softDelete),productController.softDelete)
// hidden 
router.patch('/hidden/:id',auth(endPoint.hideProduct),productController.hiddenProduct)
// likes Product
router.patch("/:id/like",auth(endPoint.likeProduct),validation(validators.likeProduct),productController.likeProduct)
router.patch("/:id/unlike",auth(endPoint.likeProduct),validation(validators.likeProduct),productController.unlikeProduct)


/////////////////////////////// comment

// create comment
router.patch("/:id/comment",auth(endPoint.addComment),validation(validators.createComment),commentController.createComment)
// update cooment
router.patch("/:comentID/updatComment",auth(endPoint.updateComment),validation(validators.updateComment),commentController.updateComment)
// delete comment
router.delete("/:comentID/deleteComment",auth(endPoint.deleteComment),validation(validators.deleteComment),commentController.deleteComment)
// like & unLike comment
router.patch("/:id/likeComment",auth(endPoint.likeComment),validation(validators.likeProduct),commentController.likeComment)
router.patch("/:id/unlikeComment",auth(endPoint.likeComment),validation(validators.likeProduct),commentController.unlikeComment)
// replay 
router.patch("/:comentID/reply",auth(endPoint.addReply),validation(validators.replyOnComment),commentController.replyOnComment)


module.exports = router