const express = require("express")
const cors = require("cors")
const app = express()
const {Post} = require("./models/postModel.js")
require('dotenv').config();
const mongoose = require('mongoose')
const key = process.env.key

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8081 

//Connection to DB =>
mongoose.set('strictQuery', true);
mongoose.connect(key, (err) => {
    if(err){
        console.log("mongodb connection failed")
    }
    else{
        console.log("connected to mongodb")
    }
})

app.get("/", async (request, response) => {
    try{
        response.json(await Post.find())
    }
    catch(err){
        response.sendStatus(500).json({message: err})
    }
})

app.get("/all", async (request, response) => {
    try{
        response.json(await Post.find())
    }
    catch(err){
        response.sendStatus(500).json({message: err})
    }
})

app.post("/post", async (request, response) => {
    const {date, description, id, likes, location, imgUrl, author} = request.body
    console.log({date, description, id, likes, location, imgUrl, author})
    const post = new Post({
       ...{ date, description, id, likes, location, imgUrl, author }
    })
    try{
        console.log(post)
        const resp = await post.save()
        response.json(resp)
    }
    catch(err){
        response.sendStatus(500).json({message: err})
    }
})

app.listen(PORT, () => {
    console.log(`listening to port no ${PORT}`)
})

module.exports = app;