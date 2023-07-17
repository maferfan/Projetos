import express, { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import mainRoutes from './routes/todoAPI'
import { authenticate } from './database/todo'
import { MulterError } from 'multer'
import { error } from 'console'
dotenv.config()

const server = express()
authenticate()
server.use(express.json());
server.use(mainRoutes)

server.listen(process.env.PORT)