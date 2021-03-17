const express = require("express")
const cp = require("cookie-parser")
const bp = require("body-parser")

const app = express()

app.use(cp())

app.get("/",(req,res)=>{
res.cookie("jwt", "XDXDXDXDXDXDXDXD")
res.send(req.cookies.jwt)
})

app.post("/",(req,res)=>{


})

app.listen(3000)
