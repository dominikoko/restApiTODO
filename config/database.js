const mysql = require('mysql')

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

module.exports = connection;