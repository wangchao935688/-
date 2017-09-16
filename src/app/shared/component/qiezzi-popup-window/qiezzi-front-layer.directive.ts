import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[qiezziFrontLayer]'
})
export class QiezziFrontLayerDirective {
  constructor(public vcr: ViewContainerRef) {
  }
}
