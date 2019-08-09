const express = require('express')
const Sse =require('json-sse')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const messages =['hello world']
const middleware = cors()
const sse = new Sse(messages)

const app = express()
app.use(middleware)
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', 
  (request, response) => {
    const {message} = request.body
    messages.push(message)

    sse.updateInit(messages)
    sse.send(messages)

    response.send(message)
  }
)

const port = process.env.PORT || 5000

app.listen(
  port, () => console.log(`Listening to port : ${port}`)
)