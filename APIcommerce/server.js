const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const database = require('./src/database/mongo')
const routes = require('./src/routes/all')

dotenv.config()
const server = express()
database()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(__dirname+'/public'))
server.use(routes)

server.listen(process.env.PORT, (req, res) => {
    console.log(`Rodando o endereço em: ${process.env.BASE}. `)
})
