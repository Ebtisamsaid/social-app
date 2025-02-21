import mongoose from "mongoose"
const connectDB=async()=>{
    await mongoose.connect(process.env.mongoose_url).then(()=>{console.log("connect DB successfully");
    }).catch((error)=>{console.log(error.message , " "+ "error while connect to DB");
    })
}

export default connectDB