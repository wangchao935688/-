import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'create-edit-hostpial-account',
  templateUrl: './create-edit-hostpial-account.component.html',
  styleUrls: ['./create-edit-hostpial-account.component.scss']
})
export class CreateEditHostpialAccountComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() { super();}

  ngOnInit() {
  }
  /*保存*/
  accountTransfer() {
    this.close();
  }
  /*取消*/
  cancel() {
    this.close();
  }
}
