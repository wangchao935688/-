import {Pipe, PipeTransform} from '@angular/core';
import {dict} from "../../core/global_dic";

@Pipe({
  name: 'qiezziDic'
})
export class QiezziDicPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof args === 'string') {
      return dict.getDictByKey(args)[value];
    }
    else if (value === null || value === '' || typeof value === 'undefined' || !args) {
      if (args && args.hasOwnProperty(null))
        return args['null'];
      return null;
    }
    else {
      return args[value];
    }
  }

}
