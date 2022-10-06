
import accessSites from '../../../RESTApi/adminControllers/accessSites'
import User from '../../../RESTApi/adminControllers/users'
import permission from '../../../RESTApi/utilityController/permission'

const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  // check is current user is admin
  // This route allow only admin
  if (permission.IsAdmin(res.locals.userId)) { next() } else { res.sendStatus(402) }
})

router.get('/user/all', User.UserAll)
router.get('/user', User.UserGet)
router.post('/user/create', User.Create)
router.post('/user/delete', User.Delete)
router.post('/user/update', User.Update)

router.post('/accessSite/create', accessSites.Create)
router.post('/accessSite/update', accessSites.Update)
router.post('/accessSite/delete', accessSites.Delete)
router.get('/accessSite/all', accessSites.GetAllByAdmin)

export default router
