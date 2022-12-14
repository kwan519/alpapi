import '@babel/polyfill'
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import routes from './routes'
import db from './database'

const { compare } = require('bcrypt')
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

app.listen({ port: 80 }, () =>
  console.log('🚀 Server ready for Development Only')
)

app.post('/login', async (req, res) => {
  // check password
  const userData = await db.users.findOne({ where: { username: req.body.username, status: 'active' } })
  if (userData == null) {
    res.sendStatus(402)
  } else {
    const checkPassword = await compare(req.body.password, userData.password)
    if (!checkPassword) {
      res.send({ status: 200, message: 'wrong password' })
    } else {
      const jwtSecretKey = process.env.JWT_SECRET_KEY
      const data = {
        time: Date(),
        userId: userData.id_user,
        permission: userData.permission
      }
      const token = jwt.sign(data, jwtSecretKey)
      res.send({ status: 200, token })
    }
  }
})

app.use('/api', routes)

if (process.env.ENVIORNMENT === 'production') {
  const https = require('https')
  const options = {
    key: process.env.SSL_SERVER_KEY,
    cert: process.env.SSL_SERVER_CERT
  }

  // Creating https server by passing
  // options and app object
  https.createServer(options, app)
    .listen(3000, function (req, res) {
      console.log('Server started at port 3000')
    })
}
