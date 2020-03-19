var express = require('express');
var todoController=require('../controllers/todoListController');
var router = express.Router();
router.get('/form', todoController.todoForm );

router.post('/create', todoController.createTodo);

router.get('/fetch', todoController.fetchTodo);

router.get('/edit/:id', todoController.editTodo);

router.post('/edit/:id', todoController.UpdateTodo);

router.get('/delete/:id', todoController.deleteTodo);
module.exports = router;