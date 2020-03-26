let async = require('async'),
parseString = require('xml2js').parseString;
const userDao = require('../dao/userDAO')

const register = (data, callback) =>{
async.auto({
    user:(callback)=>{
        let dataToSet ={
        "username":data.username,
        "email":data.email,
        "password":data.password
        }
        console.log(dataToSet);
        userDao.register(dataToSet,(err,dbData)=>{
            if(err){
                console.log(err,'error with registration');
                callback(null,"Server is busy");
                return;
            }
            else{
            callback(null,{"result:":dataToSet});
              
            }
        });
    }
    }, (err, response) => {
    callback(response.user);
    
    });
    }


const login = (data,callback)=>{
    async.auto({
    user:(callback)=>{
        const criteria={
            username: data.username,
            password: data.password
        }
        userDao.login(criteria,(err,data)=>{
        if(err){
        console.log("smth wrong with login")
    return;}
    callback(null,data)//check with data    
})
        return;
    }
    
    },(err,response)=>{
        callback(response.user)
    })
}


 

 module.exports ={
     register : register,
     login: login
 }


 /*

exports.login = async function(req, res){
    var message = ''; 
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
 
  app.post("/register", async (req, res) => {
   try {
     const hashedPassword = await bcrypt.hash(req.body.password, 10)
     connection.query(
       "INSERT INTO `users`(`username`,`email`,`password`) VALUES ('" +
         req.body.username +
         "','" +
         req.body.email +
         "','" +
         req.body.password +
         "')",
       (err, result) => {
         if (err) throw err;
         console.log("1 record inserted");
       }
     );
     res.redirect("/login");
   } catch {
     res.redirect("/register");
   }
 });

 
 app.get("/", (req, res) => {
   res.render("index.ejs", { name: "Kayle" });
 });
 
 app.get("/login", (req, res, next) => {
   res.render("login.ejs");
 });
 
 app.get("/register", (req, res, next) => {
   res.render("register.ejs");
 });
 app.post("/login", user.login); //call for login post
 
 app.get("/todo", (req, res, next) => {
   res.render("todo.ejs");
 });
 
 app.post("/register", async (req, res) => {
   try {
     const hashedPassword = await bcrypt.hash(req.body.password, 10)
     connection.query(
       "INSERT INTO `users`(`username`,`email`,`password`) VALUES ('" +
         req.body.username +
         "','" +
         req.body.email +
         "','" +
         req.body.password +
         "')",
       (err, result) => {
         if (err) throw err;
         console.log("1 record inserted");
       }
     );
     res.redirect("/login");
   } catch {
     res.redirect("/register");
   }
 });
 
 
 */