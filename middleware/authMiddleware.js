const {StatusCodes}= require('http-status-codes')
const jwt =require('jsonwebtoken')

const authMiddleware = async (req,res,next)=>{
    try{
        const token =req.header("Authorization")

        if(!token)
            return res.status(StatusCodes.NOT_FOUND).json({status:false ,msg:`Token not found`})

        await jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `unauthorized token` })
            // res.json({user})
            req.userId = user.id
            next()
        })
        // res.json({msg:"auth middleware",token})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,msg:err.message})
    }
}
module.exports =authMiddleware