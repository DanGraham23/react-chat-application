const {addMessage, getMessage} = require("../controllers/messageController");
const {cookieJwtAuth} = require("../middleware/cookieJwtAuth");

const router = require("express").Router();

router.post("/addmsg",cookieJwtAuth,addMessage);
router.post("/getmsg",cookieJwtAuth, getMessage);

module.exports = router;