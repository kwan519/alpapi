import ImportData from '../../RESTApi/adminControllers/importData'
import Theme from '../../RESTApi/adminControllers/theme'
import superAdmin from './superAdmin'
import sites from './sites'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const express = require('express')
const multer = require('multer')
const upload = multer()

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

router.get('/themes', Theme.ThemeGet)
router.post('/theme/create', Theme.ThemeCreate)
router.post('/theme/delete', Theme.ThemeDelete)
router.post('/theme/update', Theme.ThemeUpdate)

export default router
