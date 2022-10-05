
import User from '../../../RESTApi/adminControllers/users'
import permission from '../../../RESTApi//utilityController/permission'
const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  // check is current user is admin
  // This route allow only admin
  if (permission.IsAdmin(res.locals.userId)) { next() } else { res.sendStatus(402) }
})

router.get('/userAll', User.UserAll)
router.get('/user', User.Detail)
router.post('/create', User.Create)
router.post('/delete', User.Delete)
router.post('/update', User.Update)

export default router
