const express = require('express')
const Sse =require('json-sse')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const data = "hello world"

const sse = new Sse(data)

const app = express()
app.use(jsonParser)


app.get('/stream', sse.init)

app.post('/message', 
  (request, response) => {
    const {message} = request.body
    sse.send(message)

    response.send(message)
  }
)

const port = process.env.PORT || 5000

app.listen(
  port, () => console.log(`Listening to port : ${port}`)
)