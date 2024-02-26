import { io } from "./http";

interface RoomUser { 
    socket_id: string,
    nickname: string,
    room: string,
}
interface Message { 
    nickname: string,
    room: string,
    message: string,
    date: Date
}
const users: RoomUser[] = []

const messages: Message[] = []
//events emited from client side are handled by io
io.on('connection', socket => { 
    //events emited from client side are handled by socket 
    socket.on('select_room', (data , callback) => { 
        const {nickname, room} = data
        socket.join(room)
        const userInRoom = users.find(
            user => user.nickname === nickname && user.room === room
            )

        if(userInRoom){ 
            userInRoom.socket_id = socket.id
            
        }else{ 
            users.push({ 
                socket_id: socket.id,
                nickname: nickname,
                room: room
            })   
        }
        
        const messagesRoom = getMessagesRoom(data.room)
        const userJoined = { 
            data,
            messagesRoom
        }   
        callback(userJoined)
    })

    socket.on('message', (data) => { 
        const message: Message = { 
            nickname: data.nickname, 
            room: data.room, 
            message: data.message, 
            date: new Date()
        }
        messages.push(message)
    
        io.to(data.room).emit('message', data)
        
    })
})

function getMessagesRoom(roomId){ 
    const messagesRoom = messages.filter(message => message.room === roomId)
    return messagesRoom
}