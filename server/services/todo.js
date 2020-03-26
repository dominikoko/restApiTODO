const async = require('async'),
parseString = require('xml2js').parseString;
 
todoDAO = require('../DAO/todoDAO');
 
 
/**API to create the atricle */
let createTodo = (data, callback) => {
async.auto({
todo: (cb) => {
var dataToSet = {
"category":data.category?data.category:'',
"title":data.title,
}
console.log(dataToSet);
todoDAO.createTodo(dataToSet, (err, dbData) => {
if (err) {
cb(null, { "statusCode": 401, "statusMessage": "Server is busy" });
return;
}
 
cb(null, { "statusCode": 200, "statusMessage": "data updated","result":dataToSet });
});
}
}, (err, response) => {
callback(response.todo);
});
}
 
let updateTodo = (data,callback) => {
async.auto({
todoUpdate :(cb) =>{
if (!data.id) {
cb(null, { "statusCode":401, "statusMessage": "missing the parameter" })
return;
}
console.log('phase 1');
var criteria = {
id : data.id,
}
var dataToSet={
"category": data.category,
"title":data.title,
}
console.log(criteria,'test',dataToSet);
                    todoDAO.updateTodo(criteria, dataToSet, (err, dbData)=>{
                        if(err){
cb(null,{"statusCode":401,"statusMessage":"server is busy"});
                        return; 
                        }
                        else{
cb(null, { "statusCode": 200, "statusMessage": "data updated","result":dataToSet });                        
                        }
                    });
}
}, (err,response) => {
callback(response.todoUpdate);
});
}
 
/**API to delete the subject */
let deleteTodo = (data,callback) => {
console.log(data,'data to set')
async.auto({
removeTodo :(cb) =>{
if (!data.id) {
cb(null, { "statusCode": 401, "statusMessage": "missing the parameter" })
return;
}
var criteria = {
id : data.id,
}
todoDAO.deleteTodo(criteria,(err,dbData) => {
if (err) {
console.log(err);
cb(null, { "statusCode": 401, "statusMessage": "server is busy" });
return;
}
cb(null, { "statusCode": 200, "statusMessage": "data deleted" });
});
}
}, (err,response) => {
callback(response.removeTodo);
});
}
 
let getTodo = (data, callback) => {
async.auto({
todo: (cb) => {
todoDAO.getTodo({},(err, data) => {
if (err) {
cb(null, {"errorCode": "Server error","statusMessage": "server is busy"});
return;
}
cb(null, data);
return;
});
}
}, (err, response) => {
callback(response.todo);
})
}
 
let getTodoById = (data, callback) => {
async.auto({
todo: (cb) => {
let criteria = {
"id":data.id
}
todoDAO.getTodoDetail(criteria,(err, data) => {
if (err) {
console.log(err,'error----');
cb(null, {"errorCode": "server error","statusMessage": "server is busy"});
return;
}
cb(null, data[0]);
return;
});
}
}, (err, response) => {
callback(response.todo);
})
}
 
module.exports = {
createTodo : createTodo,
updateTodo : updateTodo,
deleteTodo : deleteTodo,
getTodo : getTodo,
getTodoById : getTodoById
};