import generate from '../../../RESTApi/adminControllers/generate'

const express = require('express')

const router = express.Router()

router.get('/preview/:id_site/:id_page_type/:id_import_data', generate.GeneratePage)

export default router
