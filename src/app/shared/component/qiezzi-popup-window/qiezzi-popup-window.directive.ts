import {Directive, ViewContainerRef} from '@angular/core';

/**
 * 弹窗容器指令
 * **/
@Directive({
  selector: '[qiezziPopupWindow]'
})
export class QiezziPopupWindowDirective {
  constructor(public vcr: ViewContainerRef) {
  }
}
