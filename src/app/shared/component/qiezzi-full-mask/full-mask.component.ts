/**
 * Created by KingKong on 2017/5/12.
 */
import {Input, Component, HostBinding, ElementRef} from '@angular/core';

@Component({
  selector: 'qiezzi-full-mask',
  template: '',
  styles: [':host{width:100%;height:100%;display:block;position:absolute;z-index:-1;left:0;top:0;}']
})
export class QiezziFullMaskComponent {
  @HostBinding('style.backgroundColor')
  private hostColor = '#333333';

  @HostBinding('style.opacity')
  private hostOpacity = 0.6;

  constructor(public el: ElementRef) {
  }

  @Input()
  set color(value: string) {
    if (value !== this.hostColor) {
      this.hostColor = value;
    }
  }

  @Input()
  set opacity(value: number) {
    if (value !== this.hostOpacity) {
      this.hostOpacity = value;
    }
  }
}


