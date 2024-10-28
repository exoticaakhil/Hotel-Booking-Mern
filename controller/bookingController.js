const bcrypt = require('bcryptjs');
const Auth = require('../model/authModel')
const Booking = require(`../model/bookingModel`)
const {StatusCodes} = require(`http-status-codes`);




//booking room
 const bookRoom = async(req,res) =>{
    try{
        let { name, email, mobile, password } = req.body;

        // Encrypt the password with a salt
        let encPass = await bcrypt.hash(password, 10);

        // Check if the email is already registered
        let exEmail = await Auth.findOne({ email });
        if (exEmail) {
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${email} is already registered` });
        }

        // Check if the mobile number is already registered
        let exMobile = await Auth.findOne({ mobile });
        if (exMobile) {
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${mobile} number is already registered` });
        }

        // Save the user info
        let newUser = await Auth.create({ name, email, mobile, password: encPass });
            if (newUser){
                let eUser = await Booking.findOne({userId: req.body.userId})
                    if(eUser)
                        return res.status(StatusCodes.CONFLICT).json({ status: false,msg:`Room is already booked  Please Login and Check the details....`})
            let newBooking = await Booking.create({

                userId:newUser._id,
                roomType: req.body.roomType,
                guests: req.body.guests,
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                pickup: req.body.pickup ==="yes"? true : false,
                adults:req.body.adults,
                children:req.body.children
            })
                    return res.status(StatusCodes.CREATED).json({status: false,msg:`Room booking Successful`})
             }
    }catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,msg: err.message})
    }
}

const getBookingByUserId = async (req,res) =>{
    try {

        let id =req.params.id
        let eBook = await Booking.findOne({userId:id})
            if(!eBook)
                return res.status(StatusCodes.NOT_FOUND).json({status:false,msg:"There is no Booking Details"})
        return res.status(StatusCodes.OK).json({status:true,booking:eBook})    
    } catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false,msg: err.message})
    }
}
module.exports ={bookRoom,getBookingByUserId}