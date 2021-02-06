const express = require('express');

const app = express();

const socket = require('socket.io');


app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

  res.render('index.ejs');

});

app.get('/game', (req, res) => {

  res.render('game.ejs');

})

app.get('/controller', (req, res) => {

  res.render('controller.ejs');

})


const server =  app.listen(3000, () => {
  console.log('Listening on port 3000')
})

//navodimo socketu koj server koristi
const io = socket(server);

//sta se desava pri konenciji/otvaranju soketa
io.on('connection', socket => {

  console.log('made socket connection, socket id:', socket.id);

  socket.on('click', data => {

    io.sockets.emit('click', data);

  });

})