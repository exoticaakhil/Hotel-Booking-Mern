const bookingRoute = require('express').Router()
const { bookRoom,getBookingByUserId }= require('../controller/bookingController')

bookingRoute.post(`/room`,bookRoom)
bookingRoute.get(`/room/user/:id`,getBookingByUserId)

module.exports=bookingRoute