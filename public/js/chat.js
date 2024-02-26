const socket = io()

const urlSearch = new URLSearchParams(window.location.search)

const nickname = urlSearch.get('nickname')
const room = urlSearch.get('room')

socket.emit('select_room', { 
    nickname, 
    room
}, response => { 
    const $chat_name = document.getElementById('chat-name')
    $chat_name.textContent = response.data.room
    response.messagesRoom.forEach(message => appendMessage(message))
    document
    .getElementById('chat-messages')
    .innerHTML += `
        <div class="greetings">
            <p>Olá, 
                <strong>${response.data.nickname}</strong>. Bem vindo a sala ${response.data.room}
            </p>
        </div>
    `
})

socket.on('message', (data) => { 
    appendMessage(data)
})
document
    .querySelector('.enter-msg')
    .addEventListener('click', function(ev){ 
        const $input = document.getElementById('send-message-input')
        sendMessage($input.value, $input)
    })

document
    .getElementById('send-message-input')
    .addEventListener('keypress', function(ev){ 
        const { value } = ev.target
        if(ev.key === 'Enter'){ 
            sendMessage(value, ev.target)
        }
    })



function appendMessage(data){ 
    const fullDate = dayjs().locale('pt-br').format('DD/MM/YYYY HH:mm');
    const $messages = document.getElementById('chat-messages')
    const $messageTemplate = `
        <div class="msg">
            <p>
                <span>${data.nickname}: </span>
                ${data.message}
            </p>
            <p class="msg-time">
                <span>${fullDate}</span>
            </p>
        </div>
    `
    $messages.innerHTML += $messageTemplate
}

function sendMessage(message, input){ 
    if(message){ 
        const data = { 
            nickname: nickname, 
            room: room, 
            message: message 
        }
        socket.emit('message', data)
    
        input.value = ''
    }
}

document
    .getElementById('logout-btn')
    .addEventListener('click', function(){ 
        window.location = 'index.html'
    })