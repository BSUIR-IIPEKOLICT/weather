import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../abstractions/models';
import { Subscription } from 'rxjs';
import { REFRESH_TIME } from '../constants/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, OnDestroy {
  todos: Todo[] | undefined;
  editedTodo: Todo | undefined;
  subscription: Subscription = new Subscription();
  form: FormGroup | undefined;

  constructor(private readonly todoService: TodoService) {}

  get textControl(): AbstractControl | null {
    return this.form?.get('text') || null;
  }

  get isImportantControl(): AbstractControl | null {
    return this.form?.get('isImportant') || null;
  }

  ngOnInit() {
    this.subscription = this.todoService.getTodos().subscribe((newValue: Todo[]) => {
      this.todos = newValue;
    });

    this.form = new FormGroup({
      text: new FormControl(null, [Validators.required, Validators.nullValidator]),
      isImportant: new FormControl(false, []),
    });

    this.todoService.refresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPick(todo: Todo) {
    this.editedTodo = todo;
    this.textControl?.setValue(todo.text);
    this.onChangeImportant(todo.isImportant);
  }

  onChangeCompleted(todo: Todo) {
    this.todoService.change({ ...todo, isCompleted: !todo.isCompleted });
  }

  onChangeImportant(value: boolean) {
    this.isImportantControl?.setValue(value);
  }

  onSubmit() {
    if (!this.textControl?.value) {
      return;
    }

    if (this.editedTodo) {
      this.todoService.change({
        id: this.editedTodo.id,
        text: this.textControl.value,
        isImportant: !!this.isImportantControl.value,
        isCompleted: this.editedTodo.isCompleted,
      });

      this.editedTodo = undefined;
    } else {
      this.todoService.create(
        this.textControl.value,
        !!this.isImportantControl.value,
        false
      );
    }

    this.textControl.setValue(null);
    this.onChangeImportant(false);
  }

  onDelete(id: string) {
    this.todoService.delete(id);
  }

  refresh(event) {
    this.todoService.refresh();
    setTimeout(() => event.detail.complete(), REFRESH_TIME);
  }
}
