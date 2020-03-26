var express = require("express");
(router = express.Router()), (todoService = require("../services/todo"));

router.post("/create-Todo", (req, res) => {
  todoService.createTodo(req.body, data => {
    res.send(data);
  });
});

router.put("/update-Todo/:id", (req, res) => {
  todoService.updateTodo(req.body, data => {
    res.send(data);
  });
});

router.delete("/delete-Todo", (req, res) => {
  todoService.deleteTodo(req.query, data => {
    res.send(data);
  });
});

router.get("/get-Todo", (req, res) => {
  todoService.getTodo(req.query, data => {
    res.send(data);
  });
});

router.get("/get-Todo-by-id", (req, res) => {
  articleService.getTodoById(req.query, data => {
    res.send(data);
  });
});

module.exports = router;
