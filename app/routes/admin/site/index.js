import Site from '../../../RESTApi/adminControllers/site'
import outSourceApi from '../../../RESTApi/adminControllers/site/outSourceApi'
import setting from '../../../RESTApi/adminControllers/site/setting'
import permission from '../../../RESTApi/utilityController/permission'

const express = require('express')

const router = express.Router()

router.use(async (req, res, next) => {
  const role = await permission.GetPermission(res.locals.userId)
  res.locals.permission = role
  // If  there a path === 'delete'
  if (req._parsedUrl.path.includes('delete')) {
    // Check is authen as Admin or publisher
    if (role === 'member') {
      res.sendStatus(401)
    } else {
      next()
    }
  } else {
    next()
  }
})

router.get('/all', Site.SiteGetAll)
router.get('/', Site.SiteGet)
router.post('/create', Site.SiteCreate)
router.post('/delete', Site.SiteDelete)
router.post('/update', Site.SiteUpdate)

router.post('/setting/create', setting.Create)
router.post('/setting/update', setting.Update)
router.get('/setting', setting.SiteSettingsGet)

router.post('/setting/apiOutsource/create', outSourceApi.Create)
router.post('/setting/apiOutsource/update', outSourceApi.Update)
router.post('/setting/apiOutsource/delete', outSourceApi.Delete)

export default router
