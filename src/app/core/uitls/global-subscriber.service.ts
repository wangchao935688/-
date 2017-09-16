/**
 * Created by KingKong on 2017/6/5.
 */

import {Injectable} from '@angular/core';

class SubscriberStatus {
  once: boolean;
  callback: number;
}

@Injectable()
export class GlobalSubscriber {
  private static subscribers: Map<string, SubscriberStatus[]> = new Map<string, SubscriberStatus[]>();
  private static functions: Map<number, Function> = new Map<number, Function>();
  private static functionId = 0;

  static on(key: string, callback: Function) {
    GlobalSubscriber.functions.set(++GlobalSubscriber.functionId, callback);

    if (GlobalSubscriber.subscribers.has(key)) {
      GlobalSubscriber.subscribers.get(key).push({once: false, callback: GlobalSubscriber.functionId});
    } else {
      GlobalSubscriber.subscribers.set(key, [{once: false, callback: GlobalSubscriber.functionId}]);
    }
  }

  static once(key: string, callback: Function) {
    GlobalSubscriber.functions.set(++GlobalSubscriber.functionId, callback);

    if (GlobalSubscriber.subscribers.has(key)) {
      GlobalSubscriber.subscribers.get(key).push({once: true, callback: GlobalSubscriber.functionId});
    } else {
      GlobalSubscriber.subscribers.set(key, [{once: true, callback: GlobalSubscriber.functionId}]);
    }
  }

  static off(key: string, callback: Function) {
    const list: SubscriberStatus[] = GlobalSubscriber.subscribers.get(key);
    for (let i = 0; list.length && i < list.length; i++) {
      if (GlobalSubscriber.functions.get(list[i].callback) === callback) {
        GlobalSubscriber.functions.delete(list[i].callback);
        list.splice(i, 1);
        i--;
      }
    }
  }

  static offAll(key?: string) {
    if (key) {
      const list: SubscriberStatus[] = GlobalSubscriber.subscribers.get(key);
      for (const obj of list) {
        GlobalSubscriber.functions.delete(obj.callback);
      }
      list.splice(0);
      GlobalSubscriber.subscribers.delete(key);
    } else {
      const list = GlobalSubscriber.subscribers.entries();
      while (true) {
        const it = list.next();
        if (it.done) {
          break;
        }
        GlobalSubscriber.offAll(it.value[0]);
      }
    }
  }

  static fire(key: string, data?: any) {
    console.log(data)
    console.log(key)
    console.log('111')

    const list: SubscriberStatus[] = GlobalSubscriber.subscribers.get(key);
    let tmpDelList = [];
    if (list) {
      for (const obj of list) {
        GlobalSubscriber.functions.get(obj.callback)(data);

        if (obj.once === true) {
          GlobalSubscriber.functions.delete(obj.callback);
          tmpDelList.push(obj);
        }
      }
      tmpDelList.forEach(function (item) {
        list.splice(list.indexOf(item), 1);
      });
      tmpDelList.length = 0;
      tmpDelList = null;
    }
  }
}
