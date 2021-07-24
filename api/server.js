require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to Database')
})
const DB = mongoose.connection
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
	maxAge: 600
}))
app.use(express.static('./public'))

app.use('/api', require('./router'))

app.use((req, res, next) => {
    res.status(404).send({
        message: 'Not Found!'
    })
})

app.listen(port, () => {
    console.log('Serving on http://localhost:' + port)
})
