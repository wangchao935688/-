import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-hospital-authenticate',
  templateUrl: './hospital-authenticate.component.html',
  styleUrls: ['./hospital-authenticate.component.scss']
})
export class HospitalAuthenticateComponent extends PopupWindowBaseComponent implements OnInit {

  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};//滚动条参数设置


  constructor() {
    super();
  }

  ngOnInit() {
  }


  /**
   * 底部按钮保存与取消
   */
  save(){
    this.close(null);
  }
  cancel(){
    this.close(null);
  }

}
