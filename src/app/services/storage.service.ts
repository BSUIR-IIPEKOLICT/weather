import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageInstance: Storage | null = null;

  constructor(private storage: Storage) {
    this.init().then();
  }

  set(key: string, value: any, resultCallback?: () => void) {
    this.storageInstance?.set(key, value).then(resultCallback);
  }

  async get(key: string, resultCallback?: (savedValue: any) => void) {
    return resultCallback
      ? this.storageInstance?.get(key).then(resultCallback)
      : this.storageInstance?.get(key);
  }

  private async init() {
    this.storageInstance = await this.storage.create();
  }
}
