import '@babel/polyfill'
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import SubmitQuote from './RESTApi/clientControllers/dyno/submitQuote'

const bodyParser = require('body-parser')
// const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')

const app = express()

// Set up Global configuration access
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// app.request.setHeader('Content-Type', 'application/json')

// async function startServer () {
//   const server = new ApolloServer({
//     modules: [
//       require('./graphqL/tickets'),
//       require('./graphqL/users')
//     ]
//   })
//   await server.start()

//   server.applyMiddleware({ app })
// }

// startServer()

app.listen({ port: 5000 }, () =>
  console.log('🚀 Server ready at http://localhost:5000')
)

app.get('/', (req, res) => res.send('This api for Alp'))

app.post('/test', SubmitQuote)

app.post('/login', (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY

  const data = {
    time: Date(),
    userId: 12
  }

  const token = jwt.sign(data, jwtSecretKey)
  res.send(token)
})