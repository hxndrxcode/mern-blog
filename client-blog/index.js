require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
app.get('/', (req, res) => {
    res.send('Welcome from client blog!')
})

app.listen(PORT, () => {
    console.log('Client blog serving on http://localhost:' + PORT)
})