if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const mysql = require ('mysql');
const initializePassport = require('./passport-config')


initializePassport(passport, 
    email=>{ //users.find(user => user.email === email)
    connection.query("SELECT `email` FROM `users` WHERE email ='"+user.email+"'",(err,rows)=>{
        if(err)
        return done(err);
        else
        return rows
        console.log('the email is equal')
    })
}
)



app.use(express.urlencoded({extended:false}))
app.set('view-engine','ejs');
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Database connection

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'passWORD',
    database:'usersDB',
});

connection.connect((err)=>{
    if(!err)
    console.log('db connection succeded')
    else
    console.log('db connection failed /n Error' + JSON.stringify(err,undefined,2))
});


app.get('/',(req,res)=>{
    res.render('index.ejs',{name: 'Kayle'})
    })

app.get('/login',(req,res,next)=>{
    res.render('login.ejs')
})


app.post('/login',passport.authenticate(('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})))

app.get('/register',(req,res,next)=>{
    res.render('register.ejs')
})

app.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        connection.query("INSERT INTO `users`(`username`,`email`,`password`) VALUES ('"+req.body.username+"','"+req.body.email+"','"+hashedPassword+"')",(err,result)=>{
            if(err) throw err;
            console.log('1 record inserted')
        });
        res.redirect('/login')
    }
    catch{
        res.redirect('/register')
    }
    
})


app.listen(3000,()=>console.log('Server is running at port 3000'));

// //get a user with specific id
// app.get('/users/:id',(req,res,next)=>{
//     connection.query('SELECT * FROM users WHERE userID = ?',[req.params.id],(err,rows,fields)=>{
//         if(!err) 
//         res.json(rows);
//         else
//         console.log(err);
//     })
// })
