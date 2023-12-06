const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get('/get-users',userController.get_users);
router.get('/get-user-by-id/:id',userController.get_user_by_id);
router.get('/get-user-and-roles/:id',userController.get_user_and_roles);
router.post('/add-user',userController.add_user);
router.put('/update-user/:id',userController.update_user);
router.delete('/delete-user/:id',userController.delete_user);

module.exports = router;