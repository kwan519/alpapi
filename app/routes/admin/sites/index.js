import Site from '../../../RESTApi/adminControllers/site'
import outSourceApi from '../../../RESTApi/adminControllers/site/outSourceApi'
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

router.post('/setting/apiOutsource/create', outSourceApi.Create)
router.post('/setting/apiOutsource/update', outSourceApi.Update)
router.post('/setting/apiOutsource/delete', outSourceApi.Delete)

export default router
