const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')
const {connectDb} = require('./db/config')
const cookieParser = require('cookie-parser')


const PORT = process.env.PORT
const app = express()

//body parser middleware
app.use(express.urlencoded({ extended : true}))
app.use(express.json())

//cors
app.use(cors())

app.use(cookieParser(process.env.SECRET))

//index route
app.get(`/`, async (req,res) => {
    return res.status(StatusCodes.OK).json({status:true, msg: 'welcome to auth api' })
})


//route
app.use(`/api/auth`,require('./route/authRoute'))
app.use(`/api/booking`,require('./route/bookingRoute'))

//default route
app.all(`*`, async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg:`Requsted path not found`})
})

//listener
app.listen(PORT, () => {
    if (process.env.MODE === "production") {
        connectDb(process.env.MONGO_PROD);
    }  
    if (process.env.MODE === "development") {
        connectDb(process.env.MONGO_DEV);
    } 
    console.log(`server is connected and running @ http://localhost:${PORT}`);
})

