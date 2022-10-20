import pageType from '../../../RESTApi/adminControllers/pageType'
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

router.get('/all', pageType.GetAll)
router.get('/', pageType.Get)
router.post('/create', pageType.Create)
router.post('/delete', pageType.Delete)
router.post('/update', pageType.Update)

export default router
