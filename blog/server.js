const express = require("express")
const bp = require("body-parser")
const cp = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express()


app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(cp())

app.use(require("./app.js"))
app.get("/hi",(req,res)=>{
res.send(req.cookies)
})

app.listen(3000)
