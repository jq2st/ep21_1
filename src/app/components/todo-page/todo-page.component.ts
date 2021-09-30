import { Component, OnInit } from '@angular/core';
import { Tag, ToDo } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  searchInput = ''
  selectedFilterIds: string[] = []
  tags: Tag[] = []
  todos: ToDo[] = [
    { 
      id: 1,
      title: 'string',
      text: 'string',
      created_at: new Date(),
      is_active: true,
      tags: []
    },
    { 
      id: 2,
      title: 'string',
      text: 'string',
      created_at: new Date(),
      is_active: false,
      tags: []
    },
  ]

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getTodos()
      .subscribe((todos: ToDo[]) => this.todos = todos)
    this.api.getTags()
      .subscribe(tags => this.tags = tags)
  }

  removeTodo(todoId: string | number) {
    this.api.removeTodo(todoId)
      .subscribe(() => this.todos.filter(todo => todo.id != todoId))
  }

  doTodo(todoId: string | number) {
    this.api.setDoneStatus(todoId)
      .subscribe(() => this.todos.filter(todo => todo.id != todoId))
  }

  search() {
    this.api.searchTodos(this.searchInput)
      .subscribe((searchResult: ToDo[]) => this.todos = searchResult)
  }

  addTodo(todo: any) {
    this.api.addTodo(todo)
      .subscribe((newTodo: ToDo) => this.todos.push(todo))
  }

  filter() {
    this.api.getTodos(this.selectedFilterIds)
      .subscribe((todos: ToDo[]) => this.todos = todos)
  }

}
