import { roles } from "../../DB/model/user/user.model.js";

export  const postEndpoint={
    createpost:[roles.user],
    updatepost:[roles.user],
    softdeleted:[roles.user],
    restorepost:[roles.user],
    getsinglepost:[roles.user],
    getallactiveposts:[roles.user,roles.admin],
    getalldeletedposts:[roles.user,roles.admin],
    likeunlike:[roles.user],
}