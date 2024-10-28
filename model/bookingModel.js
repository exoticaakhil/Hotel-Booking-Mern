const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    roomType:{
        type:String,
        required: true

    },guests:{
        type:Number,
        required: true
    },
    checkIn:{
        type: Date,
        required: true
    },
    checkOut:{
        type: Date,
        required: true
    },
    pickup:{
        type:Boolean,
        default:false

    },
    adults:{
        type:Number,
        required: true

    },
    children:{
        type:Number,
        required: true

    },
    bookingStatus:{
        type:String,
        enum:["pending","reserved","confirmed","canceled"],
        default: "pending"

    },
    paymentType:{
        type:String,
        enum:["cash","online"],
        default: "cash"

    },
    paymentId:{
        type:String,
        default: ""

    },
    paymentStatus:{
        type: Boolean,
        default: false

    }

},{
    collection: "bookings",
    timestamps: true
})
module.exports = mongoose.model("Booking",bookingSchema) 