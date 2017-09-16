import {PipeTransform, Pipe} from "@angular/core";
@Pipe({name: 'qiezziTextNull'})
export class QiezziTextNullPipe implements PipeTransform {
  transform(text: string) {
    if (!text && (text == '' || text == null))
      return '-    -';
    else
      return text;
  }
}
