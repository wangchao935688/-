import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[promptContainer]'
})
export class PromptContainerDirective {
  constructor(public vcr: ViewContainerRef) {
  }
}
