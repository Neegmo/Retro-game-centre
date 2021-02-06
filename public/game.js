const socket = io.connect('192.168.1.105:3000')

let direction = 'o';

socket.on('click', data => {

  direction = data;

})

const GAMEWIDTH = 750;
const GAMEHEIGHT = 450;

const PADDLEWITDH = 100;
const PADDLEHEIGHT = 20;
const PADDLESPEED = 4;

const BRICKWIDTH = 75;
const BRICKHEIGHT = 45;

let paddle;
let cursor;
let ball;
let bricks;
let bricks2;

const config = {
  type: Phaser.AUTO,
  width: GAMEWIDTH,
  height: GAMEHEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  parent: 'phaser-game',
}

function preload() {
    this.load.image('brick', 'assets/brick.png');
}

function create()  
{


  paddle = this.add.rectangle(GAMEWIDTH/2, GAMEHEIGHT - PADDLEHEIGHT, PADDLEWITDH, PADDLEHEIGHT, 0x007C6B);
  this.physics.add.existing(paddle, false);
  paddle.body.setCollideWorldBounds(true);
  paddle.body.immovable = true;
  paddle.body.moves = false;


  ball = this.add.circle(GAMEWIDTH/2, GAMEHEIGHT/3, 10, 0x007C6B);
  this.physics.add.existing(ball, false);
  ball.body.setCollideWorldBounds(true).setVelocity(200.200).setBounce(1, 1);

  bricks = this.physics.add.staticGroup({
    key: 'brick',
    repeat: 10,
    setXY: { x: 75/2, y: 45/2, stepX: 75 }
  });

  bricks2 = this.physics.add.staticGroup({
    key: 'brick',
    repeat: 10,
    setXY: { x: 75/2, y: 45/2+45, stepX: 75 }
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(paddle, ball);
  this.physics.add.collider(ball, bricks, brickBreak, null, this);
  this.physics.add.collider(ball, bricks2, brickBreak, null, this);

}

function update () 
{
 

  

  if(direction === 'l' && paddle.x > 0 + PADDLEWITDH/2){

    paddle.x -= PADDLESPEED;

  }
  else if(direction === 'r' && paddle.x < GAMEWIDTH - PADDLEWITDH/2){

    paddle.x += PADDLESPEED;

  }


}

function brickBreak(ball, brick){

  brick.disableBody(true, true);

}


const game = new Phaser.Game(config)