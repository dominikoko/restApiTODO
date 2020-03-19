// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

const connection = require('../config/database')
const bcrypt = require('bcrypt')
var session = require('express-session')
exports.login = async function(req, res){
   var message = ''; 
   //const hashedPassword = await bcrypt.hash(req.body.password, 10)
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
     
      var sql="SELECT username,email FROM `users` WHERE `username`='"+name+"' and password = '"+pass+"'";                           
      connection.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.userId = results[0];
            console.log(results[0].id);
            res.redirect('/todo');
            console.log(pass) // checking pass
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
            console.log('smth went wrong with login')
            console.log(pass) // checking pass

          }
                 
      });
   } else {
      res.render('todo.ejs',{message: message});
      console.log(pass) // checking pass

    }         
};



// module.exports = router;
