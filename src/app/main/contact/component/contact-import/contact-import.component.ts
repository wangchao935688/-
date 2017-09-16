import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-contact-import',
  templateUrl: './contact-import.component.html',
  styleUrls: ['./contact-import.component.scss']
})
export class ContactImportComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }



  /**
   * 确定
   */
  ok() {
    const data: any = {'test': 'ddd'};
    super.sendMessage(data);
    data.aa = 9;
    super.close(data);
  }

  /**
   * 取消
   */
  cancel() {
    let data: any = {'test': 'ddd'};
    super.close(data);
  }
}
