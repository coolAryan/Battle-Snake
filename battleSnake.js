// 1 st battle-snake using js
const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'AryanJain12',
    color: '#00ff00',
    head: 'ski',
    tail: 'bolt'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var gameData = request.body

  var possibleMoves = []


  var head = gameData.you.head
  var neck = gameData.you.body[1]
  console.log(head, neck)
  if (head.x == neck.x && head.y < neck.y) {
    possibleMoves = ['down', 'left', 'right']
  }
  if (head.x > neck.x && head.y == neck.y) {
    possibleMoves = ['up', 'down', 'right']
  }
  if (head.x < neck.x && head.y == neck.y) {
    possibleMoves = ['up', 'down', 'left']
  }
  if (head.x == neck.x && head.y > neck.y) {
    possibleMoves = ['up', 'left', 'right']
  }
  if (head.x == 0) {
    possibleMoves = possibleMoves.filter((move) => move !== 'left')
  }
  if (head.y == 0) {
    possibleMoves = possibleMoves.filter((move) => move !== 'down')
  }
  if (head.y == 10) {
    possibleMoves = possibleMoves.filter((move) => move !== 'up')
  }
  if (head.x == 10) {
    possibleMoves = possibleMoves.filter((move) => move !== 'right')
  }

  var move = 'up'
  if (gameData.turn > 0) {
    console.log(possibleMoves)
    move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
  }

  // var move='down'
  // var maxY=gameData.board.height-1
  // var maxX=gameData.board.width-1
  // var head=gameData.you.head
  //     if(head.y==0)
  //     {
  //       move='left'
  //     }
  //     else if(head.x==maxX)
  //     {
  //         move='up'
  //     }
  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
