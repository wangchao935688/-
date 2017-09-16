import {Component, Input, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'app-create-option',
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.scss']
})
export class CreateOptionComponent  extends PopupWindowBaseComponent implements OnInit {
  @Input()
  data: any;

  index: number;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};
  constructor() {super(); }
  ngOnInit() {
    this.index = this.data.index;
    console.log(this.data);
    if (this.data.value) {

    }
  }
  /*
  * TODO 引入新增的服务
  * */
  ok() {
    if (this.index === 0) {
      console.log('新增患者来源');

    }else if (this.index === 1) {
      console.log('新增亲友关系');
    }else {
      console.log('新增会员类型');
    }
  }
}
