/**
 * Created by KingKong on 2017/5/12.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  local: any = null;
  session: any = null;
  memory: any = null;
  storageName: string ='qiezzi_storage';

  constructor() {
    this.local = (window.localStorage) ? window.localStorage : (window.sessionStorage ? window.sessionStorage : new MemoryStorage());
    this.session = window.sessionStorage ? window.sessionStorage : new MemoryStorage();
    this.memory = new MemoryStorage();
  }

  open(storageName?: string) {
    this.storageName = storageName;
  }

  getStore(key: string, type: StorageType) {
    if (!this.storageName) {
      throw new Error('not set storageName, please use open method');
    }
    let store = null;
    switch (type) {
      case StorageType.LOCAL:
        store = JSON.parse(this.local.getItem(this.storageName) || '{}')
        break;
      case StorageType.SESSION:
        store = JSON.parse(this.session.getItem(this.storageName) || '{}')
        break;
      case StorageType.MEMORY:
        store = JSON.parse(this.memory.getItem(this.storageName) || '{}');
        break;
    }
    return store.hasOwnProperty(key) ? store[key] : null;
  }

  removeStore(key: string, type: StorageType) {
    if (!this.storageName) {
      throw new Error('not set storageName, please use open method');
    }
    let store = null;
    switch (type) {
      case StorageType.LOCAL:
        store = JSON.parse(this.local.getItem(this.storageName) || '{}')
        break;
      case StorageType.SESSION:
        store = JSON.parse(this.session.getItem(this.storageName) || '{}')
        break;
      case StorageType.MEMORY:
        store = JSON.parse(this.memory.getItem(this.storageName) || '{}');
        break;
    }
    if (store.hasOwnProperty(key)) {
      delete store[key];
    }
    switch (type) {
      case StorageType.LOCAL:
        this.local.setItem(this.storageName, JSON.stringify(store));
        break;
      case StorageType.SESSION:
        this.session.setItem(this.storageName, JSON.stringify(store));
        break;
      case StorageType.MEMORY:
        this.memory.setItem(this.storageName, JSON.stringify(store));
        break;
    }
  }

  clearStore(type: StorageType) {
    if (!this.storageName) {
      throw new Error('not set storageName, please use open method');
    }
    switch (type) {
      case StorageType.LOCAL:
        this.local.setItem(this.storageName, '{}');
        break;
      case StorageType.SESSION:
        this.session.setItem(this.storageName, '{}');
        break;
      case StorageType.MEMORY:
        this.memory.setItem(this.storageName, '{}');
        break;
    }
  }

  setStore(key: string, value: string, type: StorageType) {
    if (!this.storageName) {
      throw new Error('not set storageName, please use open method');
    }
    let store = null;
    switch (type) {
      case StorageType.LOCAL:
        store = JSON.parse(this.local.getItem(this.storageName) || '{}')
        break;
      case StorageType.SESSION:
        store = JSON.parse(this.session.getItem(this.storageName) || '{}')
        break;
      case StorageType.MEMORY:
        store = JSON.parse(this.memory.getItem(this.storageName) || '{}');
        break;
    }
    store[key] = value;
    switch (type) {
      case StorageType.LOCAL:
        this.local.setItem(this.storageName, JSON.stringify(store));
        break;
      case StorageType.SESSION:
        this.session.setItem(this.storageName, JSON.stringify(store));
        break;
      case StorageType.MEMORY:
        this.memory.setItem(this.storageName, JSON.stringify(store));
        break;
    }
  }
}

export enum StorageType {
  LOCAL, SESSION, MEMORY
}

// 内存storage, 写入的localStorage临时存放在内存里，
// 程序关闭后，数据消失，防止不支持localStorage的浏览器报错
class MemoryStorage {
  keys: any[] = [];
  values: any[] = [];

  setItem(key: string, value: any) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.values[index] = value;
    } else {
      this.values.push(value);
      this.keys.push(key);
    }
  }

  getItem(key) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      return this.values[index];
    }
    return null;
  }

  removeItem(key) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      return this.values.splice(index, 1)[0];
    }
    return null;
  }

  clear() {
    this.values.length = 0;
    this.keys.length = 0;
  }

  key(index) {
    return index < this.keys.length ? this.keys[index] : null;
  }

  length() {
    return this.keys.length;
  }
}
