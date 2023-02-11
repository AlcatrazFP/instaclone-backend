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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})