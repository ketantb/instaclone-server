const express = require("express")
const fs = require("fs")
const cors = require("cors")
const { response } = require("express")
const fileUpload = require("express-fileupload")
// const {User} = require("./models/user.js")
const {Post} = require("./models/post.js")
require('dotenv').config();
const mongoose = require('mongoose')
const path = require("path")
const key = process.env.key

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())

mongoose.set('strictQuery', true);
mongoose.connect(key, (err) => {
    // if(err){
    //     console.log("mongodb connection failed")
    // }
    // else{
    //     console.log("connected to mongodb")
    // }
})

// const data = fs.readFileSync("./templates/product.json", "utf-8")

app.get("/all", async (request, response) => {
    response.json(await Post.find())
})

// app.get("/img", async (request, response) => {
//     // response.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
// })

app.post("/post", async (request, response) => {
    const {date, description, id, likes, location, name} = request.body
    console.log({date, description, id, likes, location, name})
    const {image} = request.files
    image.mv("./uploads/"+image.name, (err) => {
        if(err){
            response.json({message: err})
        }
        else{
            response.json({message: "uploaded Successfully"})
            console.log("uploaded Successfully")
        }
    })
    const post = new Post({
       ...{ date, description, id, likes, location, name },
       image: id
    })
    try{
        console.log(post)
    const resp = await post.save()
    }
    catch(err){
        console.log(err)
    }
})

app.listen(8081, () => {
    console.log("listening to port no 8081")
})

module.exports = app;