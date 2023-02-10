const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
// archnemesis12
const MONGOURI ="mongodb+srv://alcatraz:archnemesis12@cluster0.kz4tw3h.mongodb.net/?retryWrites=true&w=majority"
//oiCssdTi97gDqNR0




mongoose.connect(MONGOURI)


mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo")
})

mongoose.connection.on('error',(err)=>{
    console.log("err in connection to mongo",err)

})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})