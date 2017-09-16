import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'create-edit-medical',
  templateUrl: './create-edit-medical.component.html',
  styleUrls: ['./create-edit-medical.component.scss']
})
export class CreateEditMedicalComponent extends PopupWindowBaseComponent implements OnInit {
  IsCtrl = false;
  controlList= [ '#E6E7F3', '#DBDBDB', '#ACA6FF', '#7BCA9E', '#FE4E74', '#7A80FA', '#FFB18C' ];
  selectedColorIndex: number;
  formModel: any;
  constructor() {super(); }

  ngOnInit() {
  }
  /*
   * 控制颜色选择框
   * */
  showColorList() {
    this.IsCtrl = ! this.IsCtrl;
    console.log(1111111);
  }
  moreItemClick(evt, i) {
    this.selectedColorIndex = i;
    this.formModel.Color = this.controlList[this.selectedColorIndex];
  }
  /*取消*/
  cancel() {
    this.close();
  }
  /*保存*/
  accountTransfer() {
    this.close();
  }
}
