const express = require('express'),
router = express.Router(),
connection = require('../config/database'),
session = require('express-session'),
userService = require('../services/user')

router.post("/registerNewUser",(req,res)=>{
   userService.register(req.body,data=>{
     res.send(data);
   });
});

module.exports = router;