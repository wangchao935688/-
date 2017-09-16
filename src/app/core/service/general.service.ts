/**
 * Created by bingq on 2017/6/12.
 */
import {Injectable} from '@angular/core';
import {LocalStorageService, StorageType} from '../uitls/local-storage-service';

@Injectable()
export class GeneralService {
  constructor(private localStorageService: LocalStorageService) {

  }

  /**
   * 获取服务器时间
   */
  getServerTime() {
    return this.localStorageService.getStore('serverTime', StorageType.LOCAL);
  }
}
