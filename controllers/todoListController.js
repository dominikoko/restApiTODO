var todoModel=require('../models/todoModel');
module.exports={
todoForm:function(req, res) {
    res.render('todo-form');
},
createTodo:function(req,res){
    const userDetails= req.body;
    todoModel.createtodo(userDetails,function(data){
      res.redirect('/todo/form');
      console.log(data.affectedRows + " record(s) updated");
    });
},
fetchTodo:function(req,res){
    
    todoModel.fetchtodo(function(data){
    res.render('todo-list', { title: 'User TODO List',fetchData:data}); 
    });
  },
editTodo:function(req,res){
    const editId=req.params.id;
    todoModel.edittodo(editId,function(data){
      res.render('todo-form', { editData:data});
      console.log(data.affectedRows + " record(s) updated");
    });
   
},
UpdateTodo:function(req,res){
  const updateData=req.body; 
  const updateId=req.params.id;
  todoModel.Updatetodo(updateData,updateId,function(data){
    res.redirect('/todo/fetch');
    console.log(data.affectedRows + " record(s) updated");
  });
  
},
deleteTodo:function(req,res){
   
  const deleteId=req.params.id;
  todoModel.deletetodo(deleteId,function(data){
    res.redirect('/todo/fetch');
    console.log(data.affectedRows + " record(s) updated");
  });
  
}
}