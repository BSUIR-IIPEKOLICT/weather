import { Injectable } from '@angular/core';
import { FirestoreRepository } from './firestore.repository';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Setting } from '../abstractions/models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SettingsRepository extends FirestoreRepository {
  private readonly collection = collection(this.database, 'settings');

  getAll(): Observable<Setting[]> {
    return from(getDocs(this.collection)).pipe(
      map((data) =>
        data.docs.map((document) => ({ ...document.data(), id: document.id } as Setting))
      )
    );
  }

  create(dto: Pick<Setting, 'city'>): Observable<Setting> {
    return from(addDoc(this.collection, dto)).pipe(
      map((document) => ({ ...dto, id: document.id }))
    );
  }

  change({ id, ...updatedFields }: Setting): Observable<Setting> {
    const { city } = updatedFields;
    return from(updateDoc(doc(this.collection, id), { city })).pipe(
      map(() => ({ id, ...updatedFields }))
    );
  }

  delete(id: string): Observable<string> {
    return from(deleteDoc(doc(this.collection, id))).pipe(map(() => id));
  }
}
