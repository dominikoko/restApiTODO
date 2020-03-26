const express = require('express'),
router = express.Router(),
connection = require('../config/database'),
session = require('express-session'),
loginService = require('../services/user')
const mysql = require('mysql');
const jwt = require('jsonwebtoken')

// get user

router.get('/users', (req,res)=>{
   connection.query('SELECT * FROM user', (err, rows, fields) => {
       if(!err)
           res.send(rows); 
       else 
           console.log(err);
   })
 });
 
 // login api

 router.post('/loginUser', (req, res) => {
   let userData = req.body;
   var userName  = userData.username;
   var password = userData.password;
   console.log(userData);
   connection.query('SELECT * FROM users WHERE username = ?',[userName], (err, rows, fields) => {
     if (err) {
       console.log(err);
       return res.status(500).send( {'error' :'Sorry username does not exits'} );    
     } else {
       if (rows.length >0) {
         if ( rows[0].password == password) {
           return res.status(200).send( {'success' :'login successful '} );
         } else {
             return res.status(401).send({ 'error': 'Invalid Password' });  
         }
       } else{
           return res.status(404).send('Sorry username does not exits');        
       }   
     }
   });
 });

 module.exports = router;