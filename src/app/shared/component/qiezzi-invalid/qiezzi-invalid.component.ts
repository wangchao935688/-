import {Component, OnInit, Input, AfterViewInit} from '@angular/core';

import {PopupWindowBaseComponent} from '../qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-qiezzi-invalid',
  templateUrl: './qiezzi-invalid.component.html',
  styleUrls: ['./qiezzi-invalid.component.scss']
})
export class QiezziInvalidComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {

  @Input()
  data: any;

  reason: string; // 原因
  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this.data);
  }

  ngAfterViewInit(): void {
    // this.ready('我已经准备完毕');
  }

  /**
   * 确定
   */
  makeSure() {
    this.notify(true, this.reason);
  }

  /**
   * 取消
   */
  cancel() {
    this.notify(false);
  }

  notify(flag: boolean, reason?: string) {
    this.close({'result': flag, 'reason': reason});
  }

}
