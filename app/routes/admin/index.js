import ImportData from '../../RESTApi/adminControllers/importData'
import Theme from '../../RESTApi/adminControllers/theme'
import superAdmin from './superAdmin'
import sites from './site'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.use((req, res, next) => {
  const header = req.header('authorization')
  if (header === undefined) {
    res.sendStatus(401)
    return
  }

  const typeBearer = header.includes('Bearer')
  if (typeBearer) {
    const headers = header.split(' ')
    const token = headers[1]
    const data = jwt.decode(token)

    // Check Token is stil validated
    // Token will expire after 1 days
    if (moment().isBefore(moment().date(data.time).add(1, 'days'))) {
      res.locals.userId = data.userId
      res.locals.permission = data.permission
      next()
    } else {
      res.sendStatus(401)
    }
  } else {
    // Not allow other authenticate type
    res.sendStatus(401)
  }
})

router.use('/superadmin', superAdmin)
router.use('/site', sites)
router.post('/importData', upload.single('uploadFile'), ImportData)



export default router
