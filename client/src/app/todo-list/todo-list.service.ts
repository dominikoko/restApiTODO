import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Todo } from "./todo.js";

@Injectable()
export class TodoListService {
  todoUrl = "http://localhost:3000/todo";
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.todoUrl + "/get-Todo")
      .pipe(catchError(this.handleError));
  }

  createTodo(todo: Todo): Observable<Todo> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post<Todo>(
        this.todoUrl + "/create-Todo",
        JSON.stringify(todo),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getTodoById(todoId: string): Observable<Todo> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    console.log(this.todoUrl + "/get-Todo-by-id?id=" + todoId);
    return this.http
      .get<Todo>(this.todoUrl + "/get-Todo-by-id?id=" + todoId)
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http // change route
      .put<Todo>(this.todoUrl + `/update-Todo/${todo.id}`, todo, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteTodoById(todoId: string): Observable<Todo> {
    let httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .delete<Todo>(this.todoUrl + "/delete-Todo?id=" + todoId)
      .pipe(catchError(this.handleError));
  }
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
