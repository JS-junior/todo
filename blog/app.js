const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const fs = require("fs")
const cookieParser = require("cookie-parser")

const app = express()
//const html = fs.readFileSync("index.html")
//const model = require("./model.js")

//setting up mongoDB database
mongoose.connect("mongodb+srv://arnab:pX6sH31xZ4gCrGYD@cluster0.rcswv.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{ console.log("db connected")})
mongoose.connection.on("error",(err)=>{ console.log("an error occured \n ")})

//setting up important dependencies like template engine
app.set("view engine", "ejs")
app.use(morgan("dev"))
app.use("/uploads", express.static("./uploads"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static("public"))
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(require("./routes.js"))
app.use(require("./view.js"))
app.set("views", "./views")
//app.use(require("./api.js"))
//app.use(cookieParser())

app.get("/o",(req,res)=>{
res.send(req.cookies)
})

module.exports = app
//require("http").createServer(app).listen(3000)
