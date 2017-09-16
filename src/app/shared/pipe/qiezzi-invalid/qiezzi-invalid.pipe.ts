import {PipeTransform, Pipe} from "@angular/core";
/**
 * 充值作废pipe
 */
@Pipe({name: 'qiezziInvalid'})
export class QiezziInvalidPipe implements PipeTransform {

  transform(flag: boolean) {
    if (flag)
      return '已作废';
    else
      return '正常';
  }
}
