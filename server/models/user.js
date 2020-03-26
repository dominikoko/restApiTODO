let connection = require("../config/database");
 
let initialize = () => {
connection.query("create table IF NOT EXISTS users (userId INT auto_increment primary key, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"); 
}
 
module.exports = {
initialize: initialize
}