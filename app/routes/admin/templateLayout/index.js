
import templateLayout from '../../../RESTApi/adminControllers/templateLayout'
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

router.get('/all', templateLayout.GetAll)
router.get('/', templateLayout.Get)
router.post('/create', templateLayout.Create)
router.post('/delete', templateLayout.Delete)
router.post('/update', templateLayout.Update)

export default router
