const {roles} = require('../../middlwear/auth')
const endPoint = {
    createProduct : [roles.Admin,roles.User],
    addWatshlist : [roles.User],
    updateProduct: [roles.User],
    deleteProduct:[roles.User , roles.Admin],
    softDelete: [roles.Admin],
    hideProduct:[roles.User , roles.Admin],
    likeProduct:[roles.User , roles.Admin],
    addComment: [roles.User, roles.Admin],
    addReply: [roles.User, roles.Admin],
    updateComment: [roles.User],
    deleteComment: [roles.User, roles.Admin],
    likeComment: [roles.User, roles.Admin]
    
}
module.exports = endPoint

   