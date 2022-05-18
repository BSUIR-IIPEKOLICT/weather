import { Injectable } from '@angular/core';
import { TodoRepository } from '../repositories/todo.repository';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../abstractions/models';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: Subject<Todo[]> = new Subject<Todo[]>();
  private prevTodos: Todo[] = [];
  private triggerUpdate: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly todoRepository: TodoRepository) {
    this.triggerUpdate
      .pipe(switchMap(() => this.todoRepository.getAll()))
      .subscribe((todos: Todo[]) => this.todos.next(todos));

    this.todos.subscribe((todos: Todo[]) => {
      this.prevTodos = todos;
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  create(text: string, isImportant: boolean, isCompleted: boolean) {
    this.todoRepository
      .create({ text, isCompleted, isImportant })
      .subscribe((todo: Todo) => this.todos.next(this.prevTodos.concat([todo])));
  }

  change(todo: Todo) {
    this.todoRepository.change(todo).subscribe((changedTodo: Todo) => {
      this.todos.next(
        this.prevTodos.map((t: Todo) => (t.id === changedTodo.id ? changedTodo : t))
      );
    });
  }

  delete(id: string) {
    this.todoRepository.delete(id).subscribe((deletedId: string) => {
      this.todos.next(this.prevTodos.filter(({ id: todoId }) => todoId !== deletedId));
    });
  }

  refresh() {
    this.triggerUpdate.next(true);
  }
}
