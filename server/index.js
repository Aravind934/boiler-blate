require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

let app = express()

//middleware

app.use(cors())
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//routes

const authRoutes = require('./routes/authRoute')
app.use('/user/auth',authRoutes)

//listen

app.listen(process.env.PORT,()=>console.log(`App running in port ${process.env.PORT}`))
mongoose.connect(process.env.DB_PATH,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:1},(err)=>{
    if(err)throw err
    console.log('DB connected')
})