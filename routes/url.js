// const express = require('express');
// const {handleGenerateNewShortURL}=require("../controllers/url")
// const router =express.Router();
// router.post("/",handleGenerateNewShortURL);
// module.exports=router;

const express = require('express');
const { handleGenerateShortUrl,handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;
