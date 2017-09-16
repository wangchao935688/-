import {Pipe, PipeTransform} from '@angular/core';
/**
 * 充值日期pipe
 * 0:当年的显示格式：月-日 时:分
 * 不是当年的显示格式：年-月-日 时:分
 * 1：当天的显示：时：分；当年的显示：月-日；不是当年的显示：年-月-日
 */
@Pipe({name: 'qiezziDateAuto'})
export class QiezziDateAutoPipe implements PipeTransform {
  transform(date: string, num: number) {
    let d = new Date(date);
    if (num == 0) {
      if (d.getFullYear() == new Date().getFullYear())
        return (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay()) + ' ' + d.getHours() + ':' + d.getMinutes();
      else
        return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay()) + ' ' + d.getHours() + ':' + d.getMinutes();
    }
    if (num == 1) {
      if (d.getDay() == new Date().getDay())
        return d.getHours() + ':' + d.getMinutes();
      else if (d.getFullYear() == new Date().getFullYear())
        return (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay());
      else
        return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay());
    }
    if (num == 2) {
      if (d.getFullYear() !== new Date().getFullYear()) {
        return d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay());
      }else if (d.getDay() !== new Date().getDay() || d.getMonth() !== new Date().getMonth()) {
        return (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDay() < 10 ? '0' + d.getDay() : d.getDay());
      }else {
        return  d.getHours() + ':' + d.getMinutes();
      }
    }
  }
}
