const connection = require("../config/database");

let getTodo = (criteria, callback) => {
connection.query(`select * from todo where 1`,criteria, callback);
}
 
let getTodoDetail = (criteria, callback) => {
    let conditions = "";
criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
connection.query(`select * from todo where 1 ${conditions}`, callback);
}
 
let createTodo = (dataToSet, callback) => {
console.log("insert into Todo set ? ", dataToSet,'pankaj')
connection.query("insert into todo set ? ", dataToSet, callback);
}
 
let deleteTodo = (criteria, callback) => {
let conditions = "";
criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
console.log(`delete from Todo where 1 ${conditions}`);
connection.query(`delete from todo where 1 ${conditions}`, callback);
 
}
 
let updateTodo = (criteria,dataToSet,callback) => {
    let conditions = "";
let setData = "";
criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
dataToSet.task ? setData += `task = '${dataToSet.task}'` : true;
dataToSet.title ? setData += `, title = '${dataToSet.title}'` : true;
console.log(`UPDATE Todo SET ${setData} where 1 ${conditions}`);
connection.query(`UPDATE Todo SET ${setData} where 1 ${conditions}`, callback);
}
module.exports = {
getTodo : getTodo,
createTodo : createTodo,
deleteTodo : deleteTodo,
updateTodo : updateTodo,
getTodoDetail : getTodoDetail
}