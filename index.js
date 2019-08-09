const express = require('express')
const Sse =require('json-sse')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const messages =['hello world']

const sse = new Sse(messages)

const app = express()
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', 
  (request, response) => {
    const {message} = request.body
    messages.push(message)

    sse.updateInit(messages)
    sse.send(message)

    response.send(message)
  }
)

const port = process.env.PORT || 5000

app.listen(
  port, () => console.log(`Listening to port : ${port}`)
)