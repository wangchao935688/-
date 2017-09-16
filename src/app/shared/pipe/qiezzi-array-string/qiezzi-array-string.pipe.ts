/**
 * Created by KingKong on 2017/7/18.
 */
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'qiezziArrayString'})
export class QiezziArrayStringPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (value === null || typeof value === 'undefined')
      return '';

    if (typeof value === 'string')
      return value;

    if (Array.isArray(value) && value.length > 0) {
      let ret = '';
      for (let item of value) {
        ret += Array.isArray(args) ? (item[args[0]] + (args[1] || ',')) : (item[args] + ',');
      }
      return ret.substring(0, ret.length - 1);
    } else
      return '';
  }
}
