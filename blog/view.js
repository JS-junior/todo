const express = require("express")
const blog = require("./model.js")
const app = express()
const auth = require("./auth.js")

app.get("/test",auth,(req,res)=>{
//res.send(req.headers.cookies)
	
        blog.find()                                                      
	.select("title content _id image")
        .exec()
        .then(docs =>{
        res.render("index", {
                blog: docs.map(doc =>{
                        return {
                                title: doc.title,
                                content: doc.content,
				_id: doc._id,
				image: doc.image
                        }
                })

        })
})

})

app.post("/edit/:id", (req,res)=>{

const id = req.params.id
res.render("edit", { id: id})

})

app.post("/logins",  (req,res)=>{
res.render("login")
})

module.exports = app
