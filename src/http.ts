import express from 'express'
import { createServer } from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
app.use(express.static(path.join(__dirname, '..', 'public')))
const serverHttp = createServer(app)

const io = new Server(serverHttp)

export { 
    serverHttp, 
    io
}

