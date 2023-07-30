const router = require("express").Router();
const {getUser , addUser} = require("../controller/users");
router.route("/save").get(getUser).post(addUser);
module.exports = router;