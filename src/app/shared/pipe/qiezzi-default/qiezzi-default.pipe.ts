import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'qiezziDefault'})
export class QiezziDefault implements PipeTransform {

  transform(flag: boolean) {
    if (flag)
      return '默认';
    else
      return '设为默认';
  }
}
