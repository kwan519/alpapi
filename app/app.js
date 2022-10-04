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
  console.log('🚀 Server ready at http://localhost:')
)

app.post('/login', (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY

  // ** MOCK UP LOGIN
  const data = {
    time: Date(),
    userId: 1,
    siteId: 1
  }

  const token = jwt.sign(data, jwtSecretKey)
  res.send(token)
})

app.use('/api', routes)
