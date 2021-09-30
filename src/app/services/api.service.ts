import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag, ToDo, User } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _serverUrl = 'https://small-todo.herokuapp.com'

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${this._serverUrl}/api/sign_in`, user)
  }

  setDoneStatus(todoId: string | number): Observable<Tag> {
    return this.http.post<Tag>(`${this._serverUrl}/api/tag/${todoId}/deactive`, {})
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this._serverUrl}/api/tags`)
  }

  getTodos(filter?: string[]): Observable<ToDo[]> {
    if (!filter) return this.http.get<ToDo[]>(`${this._serverUrl}/api/tasks`)
    return this.http.get<ToDo[]>(`${this._serverUrl}/api/tasks?filter=${filter.join('_')}`)
  }

  addTodo(newTodo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(`${this._serverUrl}/api/tasks`, newTodo)
  }

  editTodo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this._serverUrl}/api/task/${todo.id}`, todo)
  }

  removeTodo(todoId: string | number): Observable<string> {
    return this.http.delete<string>(`${this._serverUrl}/api/task/${todoId}`)
  }

  searchTodos(searchString: string): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this._serverUrl}/api/search?q=${searchString}`)
  }

}
