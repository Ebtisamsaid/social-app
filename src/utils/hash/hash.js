import bcrypt from "bcrypt"


export const hash=({plaintetxt,Rounds=Number(process.env.Rounds)})=>{

return bcrypt.hashSync(plaintetxt,Rounds)
}


export const compare=({plaintetxt,hash})=>{

    return bcrypt.compareSync(plaintetxt,hash)
}