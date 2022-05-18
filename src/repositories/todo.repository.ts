import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteModel, Todo } from '../app/abstractions/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TODO_API_URL } from '../app/constants/common';

@Injectable({ providedIn: 'root' })
export class TodoRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(TODO_API_URL);
  }

  create(dto: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(TODO_API_URL, dto);
  }

  change({ id, ...updatedFields }: Todo): Observable<Todo> {
    return this.httpClient.patch<Todo>(`${TODO_API_URL}/${id}`, updatedFields);
  }

  delete(id: number): Observable<number> {
    return this.httpClient
      .delete<DeleteModel>(`${TODO_API_URL}/${id}`)
      .pipe(map(({ id: todoId }) => todoId));
  }
}
