import Franchise from '../../restApis/franchise';

const express = require('express');

let router = express.Router();
router.use('/franchises', Franchise)

export default router