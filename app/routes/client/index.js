import SubmitQuote from '../../RESTApi/clientControllers/dyno/submitQuote'

const express = require('express')

const router = express.Router()

router.post('/submitQuote', SubmitQuote)

export default router
