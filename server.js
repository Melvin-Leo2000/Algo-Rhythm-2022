require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const postRoute = require("./routes/userPosts")
const uploadimage = require('./routes/uploadimg')




const app = express()

// allow us to send JSON files

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))


//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/upload', uploadimage)
app.use("/posts", postRoute);




//connecting to MongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

//launching for Heroku postbuild
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}




// Listening on port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
