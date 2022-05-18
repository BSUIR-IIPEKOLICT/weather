import { Injectable } from '@angular/core';
import { Todo } from '../abstractions/models';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { FirestoreRepository } from './firestore.repository';

@Injectable({ providedIn: 'root' })
export class TodoRepository extends FirestoreRepository {
  private readonly collection = collection(this.database, 'todos');

  getAll(): Observable<Todo[]> {
    return from(getDocs(this.collection)).pipe(
      map((data) =>
        data.docs.map((document) => ({ ...document.data(), id: document.id } as Todo))
      )
    );
  }

  create(dto: Pick<Todo, 'text' | 'isCompleted' | 'isImportant'>): Observable<Todo> {
    return from(addDoc(this.collection, dto)).pipe(
      map((document) => ({ ...dto, id: document.id }))
    );
  }

  change({ id, ...updatedFields }: Todo): Observable<Todo> {
    const { text, isCompleted, isImportant } = updatedFields;

    return from(
      updateDoc(doc(this.collection, id), { text, isCompleted, isImportant })
    ).pipe(map(() => ({ id, ...updatedFields })));
  }

  delete(id: string): Observable<string> {
    return from(deleteDoc(doc(this.collection, id))).pipe(map(() => id));
  }
}
