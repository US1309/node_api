const express = require('express');
const {postUserManagement, getUserManagement,putUserManagement,deleteUserManagement}=require('../controllers/userController');
const router = express.Router();

router.post('/userManagement',postUserManagement);
router.get('/usermanagement',getUserManagement);
router.put('/usermanagement/:userId',putUserManagement);
router.delete('/usermanagement/delete-user/:userId',deleteUserManagement);
module.exports=router;