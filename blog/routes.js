require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const Blog = require("./model.js")
const User = require("./user.js")
const auth = require("./auth.js")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function authenticate(req,res,next){
console.log("This are cookies \n \n \n \n \n \n \n \n \n \n \n"+ req.cookies + "\n \n \n \n \n \n \n")
        const authUser = req.cookies.jwt
//      const authUser = req.headers.authorization
//      const token = authUser && authUser.split(" ")[1]
        jwt.verify(authUser,process.env.JWT_KEY, (err,user)=>{
        if(err){ res.render("signup")}
req.user = user
next()                                                                                   })                                                                       }

router.get("/all",(req,res,next)=>{

User.find()
.select("name email password _id")
.then(user =>{
const model = {
	total: user.length,
	users: user.map(person =>{
		return {
			name: person.name,
			email: person.email,
			password: person.password,
			_id: person._id
		}
	})
}

res.status(200).json(model)

})
.catch(err =>{ res.status(200).json({ error: err })})

})


router.post("/signup",(req,res,next)=>{
const { name, email, password } = req.body

User.find({ email: email })
.select("name password email _id")
.exec()
.then(user =>{
	if(user.length >=  1){
	res.status(500).send("user exist")
	} else {

bcrypt.hash(password, 10, (err, pass)=>{
if(err){
return res.status(500).json({ error: err })
} else {
const model = new User({
	name: name,
	password: pass,
	email: email,
	_id: new mongoose.Types.ObjectId()
})
model.save()
.then(result =>{
res.status(200).json({ message: "user created succesfully", user: result })})
.catch(err =>{ res.status(500).json({ error : err })})
}
})

}

})
})



router.delete("/user/:id", (req,res,next)=>{

	const id = req.params.id
	User.findByIdAndDelete(id)

	.then(result =>{
res.status(200).json({ message: "deleted user sucessfully", user: result })})
.catch(err =>{ res.status(500).json({ error : err })})


})

router.post("/login", (req,res,next)=>{

User.findOne({ email:  req.body.email })
.select("name email password _id")
.then(result =>{
	bcrypt.compare(req.body.password, result.password, (err,data)=>{
		if(err){
			return res.status(401).json({ error: err })
		} 
		if(data){
		const token = jwt.sign({
				email: result.email,
		          	name: result.name,
			        password: result.password,
			        _id: result._id

			},
				process.env.JWT_KEY,
			{expiresIn : "1hr" })

res.cookie("jwt", token)
	console.log(req.cookies.jwt)
	res.redirect("/test")

//	return res.status(201).json({ token : token })
		}
	})
    })

				

.catch(err =>{ res.status(500).json({ error : err })})
})









module.exports = router
