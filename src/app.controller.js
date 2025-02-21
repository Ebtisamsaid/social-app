
import connectDB from "./DB/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import { globalhandlingerror } from "./utils/errorhandling/globalerror.js"
import { notfound } from "./utils/errorhandling/notfound.js"
import userRouter from "./modules/user/user.controller.js"
import postRouter from "./modules/post/post.controller.js"
import commentRouter from "./modules/comment/comment.controller.js"
import cors from "cors"
import dotenv from "dotenv"

const Bootstrap=async(app,express)=>{

// parse
dotenv.config()
app.use(cors())
app.use(express.json())
app.use("/upload",express.static("uploads"))
// connectDB
await connectDB()
// router
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)

app.get('/', (req, res,next) => { return res.status(200).json({message:'Hello World!'})})
app.all("/*",notfound)
app.use(globalhandlingerror)

}
export default Bootstrap