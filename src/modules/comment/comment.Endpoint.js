import { roles } from "../../DB/model/user/user.model.js";

export const commentEndpoint={
    createComment:[roles.user],
    updatecomment:[roles.user],
    deletecomment:[roles.user,roles.admin],
    getAllcomment:[roles.user,roles.admin],
    hardDelete:[roles.user,roles.admin],
    likeunlikecomment:[roles.user],
    addreply:[roles.user],
}