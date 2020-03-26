var express = require("express");
(router = express.Router()), (todoService = require("../services/todo"));

router.post("/create-List", (req, res) => {
  todoService.createList(req.body, data => {
    res.send(data);
  });
});

router.put("/update-List", (req, res) => {
  todoService.updateList(req.body, data => {
    res.send(data);
  });
});

router.delete("/delete-List", (req, res) => {
  todoService.deleteList(req.query, data => {
    res.send(data);
  });
});

router.get("/get-List", (req, res) => {
  documentService.getList(req.query, data => {
    res.send(data);
  });
});

module.exports = router;
