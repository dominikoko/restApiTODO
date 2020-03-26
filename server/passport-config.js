const LocalStrategy = require('passport-local').Strategy
const passport = require('passport') // test


const bcrypt = require('bcrypt');

async function initialize(passport,getUserByEmail){
    const authUser = async (email,password,done) =>{
    const user = getUserByEmail(email)
    if(user == null){
        return done(null, false, {message: 'No user with that email'})
    }

    try {
        if (await bcrypt.compare(password, user.password)){ // thinking about adding await
        return done(null, user)
        } else{
            return done(null, false,{message: 'Incorrect password'})
        }
    }
    catch(e){
        return done(e)
    }
    }
    
    passport.use(new LocalStrategy({
        usernameField: 'email'
    },authUser))
    passport.serializeUser((user,done)=>{})
    passport.deserializeUser((id,done)=>{})
}

module.exports = initialize