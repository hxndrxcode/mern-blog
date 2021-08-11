require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to Database')
})
const DB = mongoose.connection
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use('/', require('./router'))

app.listen(PORT, () => {
    console.log('Client blog serving on http://localhost:' + PORT)
})