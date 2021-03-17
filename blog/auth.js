require("dotenv").config()
const jwt = require("jsonwebtoken")
const app = require("express")()

module.exports = (req,res,next)=>{
console.log("This are cookies \n \n \n \n \n \n \n \n \n \n \n"+ req.cookies+ "\n \n \n \n \n \n \n")
	const authUser = req.cookies.jwt
//const authUser = req.headers.authorization
//	const token = authUser && authUser.split(" ")[1]
        jwt.verify(authUser,process.env.JWT_KEY, (err,user)=>{
        if(err){  res.render("signup")}
req.user = user
next()
        })
}
