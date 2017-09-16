import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-edit-booking-phone',
  templateUrl: './edit-booking-phone.component.html',
  styleUrls: ['./edit-booking-phone.component.scss']
})
export class EditBookingPhoneComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }


  /**
   * 底部按钮保存与取消
   */
  save() {
    this.close(null);
  }

  cancel() {
    this.close(null);
  }

}
