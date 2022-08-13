const express = require('express');
require('dotenv').config()
const path = require('path')
const indexRouter = require("./modules/index.router")
const connectDB = require('./DB/connection');
const { initIO } = require('./servieces/socket');
const cors = require('cors')
const userModel = require('./DB/model/User');
const app = express();
const port = process.env.PORT
app.use(cors())

app.use(express.json())
connectDB()
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/v1/auth', indexRouter.authRouter)
app.use('/api/v1/user', indexRouter.userRouter)
app.use('/api/v1/product', indexRouter.productRouter)


const server = app.listen(port,()=>{
    console.log(`server is running on port :::: ${port}`);
})
const io = initIO(server)
io.on('connection',(socket)=>{
    socket.on('updateSocketId',async(data)=>{
        console.log(data);
        await userModel.findByIdAndUpdate(data,{socketID:socket.id})
    })
});