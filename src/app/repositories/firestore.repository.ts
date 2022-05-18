import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../constants/common';

const database = getFirestore(initializeApp(FIREBASE_CONFIG));

export abstract class FirestoreRepository {
  protected readonly database = database;
}
