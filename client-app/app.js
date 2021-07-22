require('dotenv').config()
const PORT = process.env.PORT_PRODUCTION
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log('Client app serving on http://localhost:' + PORT)
})