const connection = require('../config/database');

let register = (dataToSet,callback) =>{
   console.log('insert into `users` set ?', dataToSet,'inserteed')
   connection.query("insert into `users` set ?",dataToSet,callback) 
}

module.exports = {
    register: register
}
