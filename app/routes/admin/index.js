import ImportData from '../../RESTApi/adminControllers/importData'
import Theme from '../../RESTApi/adminControllers/theme'
import Site from '../../RESTApi/adminControllers/site'
import superAdmin from './superAdmin'
import permission from '../../RESTApi/utilityController/permission'

const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.use((req, res, next) => {
  if (permission.IsAdmin(res.locals.userId) || permission.IsPublisher(res.locals.userId)) { next() } else { res.sendStatus(402) }
})

router.use('/superadmin', superAdmin)

// TODO : need to update route theme and sites
router.post('/importData', upload.single('uploadFile'), ImportData)
router.get('/themes', Theme.ThemeGet)
router.post('/theme/create', Theme.ThemeCreate)
router.post('/theme/delete', Theme.ThemeDelete)
router.post('/theme/update', Theme.ThemeUpdate)

router.get('/site', Site.SiteGet)
router.get('/siteAll', Site.SiteGetAll)
router.post('/site/create', Site.SiteCreate)
router.post('/site/delete', Site.SiteDelete)
router.post('/site/update', Site.SiteUpdate)

export default router
