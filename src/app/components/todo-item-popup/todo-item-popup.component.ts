import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag, ToDo } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-item-popup',
  templateUrl: './todo-item-popup.component.html',
  styleUrls: ['./todo-item-popup.component.scss']
})
export class TodoItemPopupComponent implements OnInit {

  form!: FormGroup
  selectedTags = []
  @Input('tags') tags!: Tag[]
  @Input('itemToEdit') itemToEdit: ToDo | null = null
  @Output() onAdd: EventEmitter<{title: string, text: string, tags: Tag[]}> = new EventEmitter()
  @Output() onEdit: EventEmitter<ToDo> = new EventEmitter()


  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.itemToEdit ? this.itemToEdit.title : '', Validators.required),
      text: new FormControl(this.itemToEdit ? this.itemToEdit.text : '', Validators.required)
    })
  }

  changeFilter() {

  }

  checkSelectedTag(tag: Tag) : boolean {
    return this.itemToEdit ? this.itemToEdit.tags.map(tag => tag.id).includes(tag.id) : false
  }

  save() {
    console.error(this.itemToEdit)
    if (this.itemToEdit) {
      this.onEdit.emit({
        ...this.itemToEdit,
        title: this.form.value.title,
        text: this.form.value.text,
        tags: this.selectedTags
      })
      return
    }
    const newTodo = {title: this.form.value.title, text: this.form.value.text, tags: this.selectedTags}
    this.onAdd.emit(newTodo)
  }
}
