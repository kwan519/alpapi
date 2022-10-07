import Site from '../../../RESTApi/adminControllers/site'
import setting from '../../../RESTApi/adminControllers/site/setting'

const express = require('express')

const router = express.Router()

router.get('/all', Site.SiteGetAll)
router.get('/', Site.SiteGet)
router.post('/create', Site.SiteCreate)
router.post('/delete', Site.SiteDelete)
router.post('/update', Site.SiteUpdate)

router.post('/settings/create', setting.Create)
router.post('/settings/update', setting.Update)
router.get('/settings', setting.SiteSettingsGet)

export default router
