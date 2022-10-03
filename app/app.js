import '@babel/polyfill'
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import routes from './routes'

const bodyParser = require('body-parser')
// const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')

const app = express()

// Set up Global configuration access
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// async function startServer () {
//   const server = new ApolloServer({
//     modules: [
//     ]
//   })
//   await server.start()

//   server.applyMiddleware({ app })
// }

// startServer()

app.listen({ port: 5000 }, () =>
  console.log('🚀 Server ready at http://localhost:5000')
)

// a middleware function with no mount path. This code is executed for every request to the router
// router.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })

// app.post('/test', SubmitQuote)

app.post('/login', (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY

  const data = {
    time: Date(),
    userId: 12
  }

  const token = jwt.sign(data, jwtSecretKey)
  res.send(token)
})

app.get('/', (req, res) => {
  res.send('This api for Alp')
})

app.use('/api', routes)
