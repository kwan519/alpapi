import generate from '../../../RESTApi/adminControllers/generate'

const express = require('express')

const router = express.Router()

router.post('/preview/:site_id', generate.GeneratePage)

export default router
