const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");

router.get('/get-role',roleController.get_role);
router.post('/add-role',roleController.add_role);


module.exports = router;