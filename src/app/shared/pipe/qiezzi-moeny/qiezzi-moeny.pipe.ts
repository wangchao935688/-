import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'qiezziMoeny'})
export class QieziiMoneyPipe implements PipeTransform {
  transform(val: any, flag?: boolean) {
    if (val != '--' && val != null && val !== '') {
      if (flag) {
        return '￥' + (this.number_format(parseInt(val).toFixed(2)));
      }
      return this.number_format(parseInt(val).toFixed(2));
    } else {
      return val;
    }
  }

  number_format(num: any) {
    return num && num
        .toString()
        .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
  }
}
