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
const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, path.join(__dirname, '/uploads/'));
	},
	filename: (req,file,cb)=>{
		cb(null, new Date().toISOString() + file.originalname)
	}
})

const fileFilter = (req,file,cb)=>{
	if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png", file.mimetype === "video/mp4"){
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({
	storage: storage
}).single("profile")


router.get("/blogs",auth,(req,res,next)=>{

	Blog.find()
	.select("_id title content image")
	.exec()
	.then(doc =>{
	 const data = doc.map(blog =>{
		 return {
			 _id: blog._id,
			 title: blog.title,
			 content: blog.content,
			 image: blog.image
		 }
	 })
	console.log(req.cookies)
       	res.status(200).json({ message: "it's working", data: data, cookie: req.cookies })
	})


})

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      
      res.send("errror \n \n \n \n \n \n \n \n \n" + err)
	console.log(err)
    } else {

      if(req.file == undefined){
        res.status(500).json({ error: err })
      } else {
        res.redirect("/")
          console.log(req.file.filename)

console.log(`This is detailed about \n \n  filename ${req.file.filename} \n ${req.file.path}` )
        const { title, content } = req.body;
         const model = new Blog({
                _id: new mongoose.Types.ObjectId(),
                title: title,
                content: content,
                image: req.file.filename
        })
                                                                                         model.save()
        .then(result =>{
        res.status(200).redirect('/test')
//      res.status(200).json({ message: "blog created succesfully",
        data: result
        })
        .catch(err =>{ res.status(200).json({ error: err})})
      }
    }
  }) 
})





router.get("/:id",(req,res,next)=>{

	const id = req.params.id
	Blog.findById(id)
	.select("_id title content image")
	.exec()
	.then(doc =>{

const blogs = doc.map(docs =>{ 
	return {
        title: docs.title,
        content: docs.content,
        _id: docs._id,
        image: docs.image
}                                                                                })
res.status(200).json({ message: blogs })
})

})

router.patch("/:id",(req,res,next)=>{

   const id = req.params.id
   Blog.findByIdAndUpdate(id, req.body, { new: true })
  .then(result =>{ res.status(200).redirect("/test")})
  .catch(err =>{ res.status(500).json({ error: "error  " + err })})

})

router.delete("/:id",(req,res,next)=>{

	const id = req.params.id
	Blog.findByIdAndDelete(id)
	.then(result =>{
		res.status(200).redirect("/test")
		//res.status(200).json({ message: "blog deleted" })
	})
	.catch(err =>{ res.status(500).json({ "error":  err })})


})








module.exports = router
