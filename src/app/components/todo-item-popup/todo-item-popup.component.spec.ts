import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemPopupComponent } from './todo-item-popup.component';

describe('TodoItemPopupComponent', () => {
  let component: TodoItemPopupComponent;
  let fixture: ComponentFixture<TodoItemPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
