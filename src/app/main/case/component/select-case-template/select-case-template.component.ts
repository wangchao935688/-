import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-select-case-template',
  templateUrl: './select-case-template.component.html',
  styleUrls: ['./select-case-template.component.scss']
})
export class SelectCaseTemplateComponent extends PopupWindowBaseComponent implements OnInit {
  /*TODO 设置参数*/
  rightComponentName = '选择模板';
  currentIdx: number = 0; // tab切换
  toggle: boolean = false;
  istoggle: boolean = false;
  advice = true;
  tabData = {
    data: ['病历模板', '医嘱模板', '历史病历'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
    }
  };
  constructor() {super() ; }

  ngOnInit() {
  }
  /*
  * TODO 级联菜单背景
  * */
  cascade () {
    this.toggle = !this.toggle;
  }
  /*
  * TODO 级联菜单背景
  * */
  treecascade () {
    this.toggle = !this.toggle;
  }
  /*
  * TODO tab切换
  * */
    changeTab(index) {
    console.log(index);
    this.currentIdx = index.index;
    if (this.currentIdx === 0 || this.currentIdx === 2) {
        this.advice = true;
    }
  }
}
