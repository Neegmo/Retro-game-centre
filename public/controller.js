const socket = io.connect('192.168.1.105:3000')



const buttonL = () => {
    socket.emit('click', 'l');
}

const buttonR = () => {
    socket.emit('click', 'r');
}

const buttonNone = () => {
    socket.emit('click', 'o');
}


