var connection=require('../config/database');
let initialize = () => {
  connection.query(
    "create table IF NOT EXISTS todo (id INT auto_increment primary key, task VARCHAR(30), title VARCHAR(24))"
  );
};
module.exports = {
  initialize: initialize
};
