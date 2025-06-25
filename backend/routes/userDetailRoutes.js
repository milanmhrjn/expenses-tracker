const express = require('express');
const router = express.Router();
const userController = require('../controller/userDetails.controller');

router.get('/userDetails', userController.getAllUsers);
router.post('/userDetails', userController.createUsers);
router.put('/userDetails/:id', userController.updateUser);
router.delete('/userDetails/:id', userController.deleteUser);
router.get('/userDetails/:id', userController.getUserById);
 

module.exports = router;
