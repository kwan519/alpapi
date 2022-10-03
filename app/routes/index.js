import client from './client'
import admin from './admin'

const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.use('/admin', admin)
router.use('/client', client)

export default router
