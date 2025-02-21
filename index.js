import express from "express"
import Bootstrap from "./src/app.controller.js"
const app=express()

const port = 4000
await Bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))