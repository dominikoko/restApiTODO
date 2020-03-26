import { Component, OnInit } from "@angular/core";
import {NgForm, NgModel, FormControl, FormGroup, Validators } from "@angular/forms";
import * as uuid from "uuid";
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";

@Component({
  selector: "app-todo",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  allTodos: Todo[];
  editTodo: Todo;
  statusCode: any; 
  requestProcessing = false;
  todoIdToUpdate = null;
  processValidation = false;

  todoForm = new FormGroup({
    title: new FormControl("", Validators.required),
    task: new FormControl("", Validators.required)
  });

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  edit(todo) {
    this.editTodo = todo
  }

  update() {
    if (this.editTodo) {
      this.todoListService.updateTodo(this.editTodo).subscribe(todo => {
        const ix = todo ? this.allTodos.findIndex(h => h.id === todo.id) : -1
        if (ix > -1) {
          this.allTodos[ix] = todo
        }
      })
      this.editTodo = undefined
    }
  }

  getAllTodos() {
    this.todoListService.getAllTodos().subscribe(
      data => (this.allTodos = data),
      errorCode => (this.statusCode = errorCode)
    );
  }

  onTodoFormSubmit() {
    this.processValidation = true;
    if (this.todoForm.invalid) {
      return;
    }

    this.preProcessConfigurations();
    let todo = this.todoForm.value;
    if (this.todoIdToUpdate === null) {
      this.todoListService.getAllTodos().subscribe(todos => {
        todo.id = uuid.v4();
        console.log(todo, "this is form data---");

        this.todoListService.createTodo(todo).subscribe(
          successCode => {
            this.statusCode = successCode;
            this.getAllTodos();
            this.backToCreateTodo();
          },
          errorCode => (this.statusCode = errorCode)
        );
      });
    } else {
      todo.id = this.todoIdToUpdate;
      this.todoListService.updateTodo(todo).subscribe(
        successCode => {
          this.statusCode = successCode;
          this.getAllTodos();
          this.backToCreateTodo();
        },
        errorCode => (this.statusCode = errorCode)
      );
    }
  }

  loadTodoToEdit(todoId: string) {
    this.preProcessConfigurations();
    this.todoListService.getTodoById(todoId).subscribe(
      todo => {
        console.log(todo, "done");
        this.todoIdToUpdate = todo.id;
        this.todoForm.setValue({ title: todo.title, task: todo.task });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => (this.statusCode = errorCode)
    );
  }

  deleteTodo(todoId: string) {
    this.preProcessConfigurations();
    this.todoListService.deleteTodoById(todoId).subscribe(
      successCode => {
        this.statusCode = 204;
        this.getAllTodos();
        this.backToCreateTodo();
      },
      errorCode => (this.statusCode = errorCode)
    );
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  backToCreateTodo() {
    this.todoIdToUpdate = null;
    this.todoForm.reset();
    this.processValidation = false;
  }
}
