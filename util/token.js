// to generate auth token (Json web token) JWT

const JWT =require('jsonwebtoken')

const generationToken = (id) => {
    //jwt.sign(userid,secret,options)
    return JWT.sign({id},process.env.SECRET,{expiresIn:'1d'})
}
module.exports = generationToken