import Site from '../../../RESTApi/adminControllers/site'

const express = require('express')

const router = express.Router()

router.get('/all', Site.SiteGetAll)
router.get('/', Site.SiteGet)
router.post('/create', Site.SiteCreate)
router.post('/delete', Site.SiteDelete)
router.post('/update', Site.SiteUpdate)

export default router
