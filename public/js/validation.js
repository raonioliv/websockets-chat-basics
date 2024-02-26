// const $select_room_form = document.forms['enter-room'] 
const $select_room_form = document.forms['enter-room']

$select_room_form.addEventListener('submit', function(ev){ 
    ev.preventDefault()
    const [ room, nickname ] = ev.target
    nickname.classList.remove('is-invalid')
    document.querySelector('#error-message').textContent = ''
    if(!nickname.value){ 
        nickname.classList.add('is-invalid')
        document.querySelector('#error-message').textContent = 'Nickname obrigatório!'
        return
    }

    ev.target.submit()
})