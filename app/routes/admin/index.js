import ImportData from '../../RESTApi/adminControllers/importData'
import Theme from '../../RESTApi/adminControllers/theme'
import superAdmin from './superAdmin'
import sites from './sites'
import permission from '../../RESTApi/utilityController/permission'

const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.use((req, res, next) => {
  if (permission.IsAdmin(res.locals.userId) || permission.IsPublisher(res.locals.userId)) { next() } else { res.sendStatus(402) }
})

router.use('/superadmin', superAdmin)
router.use('/site', sites)
router.post('/importData', upload.single('uploadFile'), ImportData)

router.get('/themes', Theme.ThemeGet)
router.post('/theme/create', Theme.ThemeCreate)
router.post('/theme/delete', Theme.ThemeDelete)
router.post('/theme/update', Theme.ThemeUpdate)

export default router
