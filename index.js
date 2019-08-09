const express = require('express')
const Sse =require('json-sse')
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const messages =['hello world']

const data = JSON.stringify(messages)

const middleware = cors()

const sse = new Sse(data)

const app = express()
app.use(middleware)
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', 
  (request, response) => {
    const {message} = request.body
    messages.push(message)

    const data = JSON.stringify(messages)

    sse.updateInit(data)
    sse.send(data)

    response.send(message)
  }
)

const port = process.env.PORT || 5000

app.listen(
  port, () => console.log(`Listening to port : ${port}`)
)