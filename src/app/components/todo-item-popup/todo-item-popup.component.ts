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
  selectedTags: Tag[] = []
  @Input('tags') tags!: Tag[]
  @Input('itemToEdit') itemToEdit: ToDo | null = null
  @Output() onAdd: EventEmitter<{title: string, text: string, tags: number[]}> = new EventEmitter()
  @Output() onEdit: EventEmitter<{id: number, title: string, text: string, tags: number[]}> = new EventEmitter()


  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.itemToEdit ? this.itemToEdit.title : '', Validators.required),
      text: new FormControl(this.itemToEdit ? this.itemToEdit.text : '', Validators.required)
    })
    if (this.itemToEdit) this.selectedTags = [...this.itemToEdit.tags]
  }

  changeFilter(event: any, tag: Tag) {
    if (event.checked) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag)
      }
      return
    }
    if (this.selectedTags.find(findTag => findTag.id == tag.id)) {
      this.selectedTags = this.selectedTags.filter(filterTag => filterTag.id != tag.id)
    }
    
    console.error(this.selectedTags)
  }

  checkSelectedTag(tag: Tag) : boolean {
    return this.itemToEdit ? this.itemToEdit.tags.map(tag => tag.id).includes(tag.id) : false
  }

  save() {
    console.error(this.itemToEdit, this.selectedTags)
    const newTodo = {
      title: this.form.value.title, 
      text: this.form.value.text, 
      tags: this.selectedTags.map(tag => tag.id)
    }
    if (this.itemToEdit) {
      this.onEdit.emit({
        ...newTodo,
        id: this.itemToEdit.id
      })
      return
    }
    this.onAdd.emit(newTodo)
  }
}
