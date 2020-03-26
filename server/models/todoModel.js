var connection=require('../config/database');
module.exports={
   
  createTodo:function(userDetails,callback){
    var sql = 'INSERT INTO todo SET ?'; 
    connection.query(sql, userDetails,function (err, data) {
    if (err) throw err;
      return callback(data);
    });
  },
  fetchTodo:function(callback){
    var sql='SELECT * FROM todo';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    return callback(data);
    });  
  },
  editTodo:function(editId, callback){
    
    var sql=`SELECT * FROM todo WHERE id=${editId}`;
    connection.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data[0]);
    });
  },
  updateTodo:function(updateData,updateId,callback){
    
    var sql = `UPDATE todo SET ? WHERE id= ?`;
    connection.query(sql, [updateData, updateId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  },
  deleteTodo:function(deleteId,callback){
    var sql = 'DELETE FROM todo WHERE id = ?';
    connection.query(sql, [deleteId], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  }
}