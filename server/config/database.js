var mysql = require('mysql');
const util = require('util')
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"passWORD",
    database:"usersDB",
});

connection.connect(err=>{
    if(!err)
    console.log('db connection succeded')
    else
    console.log('db connection failed /n Error' + JSON.stringify(err,undefined,2))
});

//connection.query = util.promisify(connection.query);

module.exports = connection;