import { Component, OnInit } from '@angular/core';
import { Tag, ToDo } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  searchInput = ''
  isItemPopup = false
  itemToEdit: null | ToDo = null
  selectedFilterIds: number[] = []
  tags: Tag[] = []
  todos: ToDo[] = []

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.api.getTodos()
      .subscribe((todos: ToDo[]) => this.todos = todos)
    this.api.getTags()
      .subscribe(tags => {
        this.tags = tags
      })
  }

  editFilters(tagId: number) {
    if (this.selectedFilterIds.includes(tagId)) {
      this.selectedFilterIds = this.selectedFilterIds.filter(filterTagId => filterTagId != tagId)
    }
    else {
      this.selectedFilterIds.push(tagId)
    }
    this.filter()
  }

  removeTodo(todoId: string | number) {
    this.api.removeTodo(todoId)
      .subscribe(() =>  this.todos = this.todos.filter(todo => todo.id != todoId))
  }

  doTodo(todoId: number) {
    this.api.setDoneStatus(todoId)
      .subscribe(() => {
        const idx = this.todos.findIndex(todo => todo.id == todoId)
        console.error(idx)
        if (idx != -1) this.todos[idx].is_active = false
      })
  }

  search() {
    this.api.searchTodos(this.searchInput)
      .subscribe((searchResult: ToDo[]) => this.todos = searchResult)
  }

  addTodo(todo: any) {
    this.api.addTodo(todo)
      .subscribe(
        (newTodo: ToDo) => this.todos.unshift(newTodo),
        (error: any) => this.showPermissionDeny()
      )
    this.isItemPopup = false
  }

  showPermissionDeny() {
    alert('Обычный пользователь не может добавлять более 5 задач.')
  }

  editTodo(todo: {id: number, title: string, text: string, tags: number[]}) {
    this.api.editTodo(todo)
      .subscribe((newTodo: ToDo) => {
        const editIndex = this.todos.findIndex(foundTodo => foundTodo.id == todo.id)
        this.todos[editIndex] = newTodo
        this.itemToEdit = null
      })
    this.isItemPopup = false
  }

  filter() {
    this.api.getTodos(this.selectedFilterIds)
      .subscribe((todos: ToDo[]) => this.todos = todos)
  }

  openEditPopup(todo: ToDo) {
    this.itemToEdit = todo
    this.isItemPopup = true
  }

  logout() {
    this.auth.logout()
  }

}
