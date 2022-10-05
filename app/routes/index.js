import client from './client'
import admin from './admin'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  const header = req.header('authorization')
  if (header === undefined) res.sendStatus(402)

  const typeBearer = header.includes('Bearer')
  if (typeBearer) {
    const headers = header.split(' ')
    const token = headers[1]
    const data = jwt.decode(token)

    // Check Token is stil validated
    // Token will expire after 30 days
    if (moment().isBefore(moment().date(data.time).add(30, 'days'))) {
      res.locals.siteId = data.siteId
      res.locals.userId = data.userId
      next()
    } else {
      res.sendStatus(401)
    }
  } else {
    // Not allow other authenticate type
    res.sendStatus(401)
  }
})

router.use('/admin', admin)
router.use('/client', client)
export default router
