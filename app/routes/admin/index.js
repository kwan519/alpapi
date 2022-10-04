import ImportData from '../../RESTApi/adminControllers/importData'
import Theme from '../../RESTApi/adminControllers/theme'
import Site from '../../RESTApi/adminControllers/site'

const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.use((req, res, next) => {
  next()
})

router.post('/importData', upload.single('uploadFile'), ImportData)
router.get('/themes', Theme.ThemeGet)
router.post('/theme/create', Theme.ThemeCreate)
router.post('/theme/delete', Theme.ThemeDelete)
router.post('/theme/update', Theme.ThemeUpdate)

router.get('/site', Site.SiteGet)
router.get('/sites', Site.SiteGetAll)
router.post('/site/create', Site.SiteCreate)
router.post('/site/delete', Site.SiteDelete)
router.post('/site/update', Site.SiteUpdate)

export default router
