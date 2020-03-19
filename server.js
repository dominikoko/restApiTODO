if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const morgan = require('morgan');
const session = require('express-session');
const user = require('./routes/user')
const bodyParser = require('body-parser')
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require ('mysql');
const connection = require('./config/database')
const cors = require('cors');
// const events = require('./events')
const app = express()
  .use(cors())
  .use(bodyParser.json())
//   .use(events(connection));

app.use(express.urlencoded({extended:false}))
app.set('view-engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(session({secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false}));

app.get('/',(req,res)=>{
    res.render('index.ejs',{name: 'Kayle'})
    })

app.get('/login',(req,res,next)=>{
    res.render('login.ejs')
})

app.get('/register',(req,res,next)=>{
res.render('register.ejs')
})
app.post('/login', user.login);//call for login post

app.get('/todo',(req,res,next)=>{
    res.render('todo.ejs')
})


app.post('/register', async (req,res)=>{
    try{
        //const hashedPassword = await bcrypt.hash(req.body.password, 10)
        connection.query("INSERT INTO `users`(`username`,`email`,`password`) VALUES ('"+req.body.username+"','"+req.body.email+"','"+req.body.password+"')",(err,result)=>{
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

// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// const bodyparser = require('body-parser');
// const flash = require('express-flash');


// initializePassport(passport, 
//     email=>{ //users.find(user => user.email === email)
//     connection.query("SELECT `email` FROM `users` WHERE email ='"+user.email+"'",(err,rows)=>{
//         if(err)
//         return done(err);
//         else
//         return rows
//         console.log('the email is equal')
//     })
// }
// )
