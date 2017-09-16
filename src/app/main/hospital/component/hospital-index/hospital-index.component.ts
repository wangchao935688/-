import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApplicationService} from 'app/core/service/application.service';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {
  QiezziInputPopComponent,
  InputPopData
} from "../../../../shared/component/qiezzi-input-pop/qiezzi-input-pop.component";
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {InputForm} from "../../../../core/forms/input.form";
import {QiezziInvalidComponent} from "app/shared/component/qiezzi-invalid/qiezzi-invalid.component";
import {EditHospitalAddressComponent} from "../edit-hospital-address/edit-hospital-address.component";
import {EditBookingPhoneComponent} from "../edit-booking-phone/edit-booking-phone.component";
import {HospitalAuthenticateComponent} from "../hospital-authenticate/hospital-authenticate.component";

@Component({
  selector: 'app-hospital-index',
  templateUrl: './hospital-index.component.html',
  styleUrls: ['./hospital-index.component.scss']
})
export class HospitalIndexComponent implements OnInit, AfterViewInit, ICustomizeSlider {

  // 设置参数
  displayStatus = ''; // 隐藏侧滑框
  isBorder = '';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};// 滚动条设置

  constructor(private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService) {

  }

  ngOnInit() {
  }


  // 顶部设置和添加
  onOptions(event) {
  }

  onControlClick(event) {
  }


  ngAfterViewInit(): void {

  }

  /**
   * 公用单个输入框
   * @param e
   */
  demo_input_pop(e, title, inputName) {
    let data = new InputPopData();
    // title是弹窗顶title
    // inputName是输入框前面的字
    data.inputName = inputName;
    data.formName = 'ProcessCompleted';
    data.required = true;
    data.isTextarea = false;
    data.okHandler = (formModel: InputForm) => {
      console.log(JSON.stringify(formModel));
    };
    this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, title, PopupWindowSize.SMALL, 'auto', data, false
    ).subscribe(t => {
      console.log(t);
    })
  }

  /**
   * 弹出多行输入框
   * 参考充值-作废
   */
  openTextInput(e, title) {

    this.application.frontLayer.openPopupWindow(QiezziInvalidComponent, title, PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {

    });
  }

  /**
   * 修改诊所地址
   */
  editAddress() {
    this.application.frontLayer.openPopupWindow(EditHospitalAddressComponent, '修改诊所地址', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {

    });
  }

  /**
   * 预约电话
   */
  editBookingPhone() {
    this.application.frontLayer.openPopupWindow(EditBookingPhoneComponent, '设置预约电话', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {

    });
  }

  /**
   * 认证
   */
  toAutherticate() {
    this.application.frontLayer.openPopupWindow(HospitalAuthenticateComponent, '添加认证信息', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {

    });
  }
}
