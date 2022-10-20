import theme from '../../../RESTApi/adminControllers/theme'
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

router.get('/all',theme.get)
router.get('/', Site.SiteGet)
router.post('/create', Site.SiteCreate)
router.post('/delete', Site.SiteDelete)
router.post('/update', Site.SiteUpdate)


export default router
