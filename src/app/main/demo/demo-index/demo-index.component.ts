import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {DemoNoticeComponent} from '../popup/demo-notice/demo-notice.component';
import {ApplicationService} from '../../../core/service/application.service';
import {PopupWindowSize} from '../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../core/service/customize-form.service';
import {CustomizeSliderService, ICustomizeSlider} from '../../../core/service/customize-slider.service';
import {CreateDemoForm} from '../../../core/forms/demo/create-demo-form';

@Component({
  selector: 'app-home-index',
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.css']
})
export class DemoIndexComponent implements OnInit, ICustomizeSlider, ICustomizeFormValidate {
  displayStatus: string;

  formName: string;
  formGroup: FormGroup;

  formModel: CreateDemoForm;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  selectedButtons: any;

  buttonGroupData = [
    {title: 'gfhy', value: '1'},
    {title: 'gfhy', value: '2'},
    {title: 'gfhy', value: '3'}
  ];

  tabData = {
    data: ['选项', '选项卡2', '选项卡3测试', '选项卡4测试超长'],
    defaultIndex: 1,
    changeTab: (index) => {
      console.log(index);
    }
  };

  errorMessage = '用户名密码错误';
  dropdownList = [
    {key: '测试标题1', value: '1'},
    {key: '测试标题2', value: '2'},
    {key: '测试标题3', value: '3'},
    {key: '测试标题4', value: '4'},
    {key: '测试标题5', value: '5'},
    {key: '测试标题6', value: '6'}];

  isBorder: boolean;
  scrollbarOptions: any = null;

  constructor(public el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService) {
  }

  onOptionClick() {
    this.router.navigate(['../list'], {relativeTo: this.route});
  }

  ngOnInit() {
    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (evt) {
          self.isBorder = this.mcs.top < -55;
        }
      }
    };

    this.formName = 'Demo';
    this.formModel = new CreateDemoForm();
    this.form.buildForm(this);
  }
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  changeTab(index) {
    console.log(index);
  }

  changeTab1(index) {
    console.log(index);
  }

  clickOpenPopup() {
    this.application.frontLayer.openPopupWindow(DemoNoticeComponent, '新增患者1', PopupWindowSize.SMALL, 300, null, false).subscribe(t => {
    });
  }

  onIconClick(index) {
    console.log('点击图标的索引是' + index);
  }

  changeError() {
    this.errorMessage = '';
  }

  changeError1() {
    this.errorMessage = '用户名密码错误';
  }

  testNamedRouter() {
    this.router.navigate([{outlets: {'right-detail': ['detail']}}], {relativeTo: this.route.parent});
  }

  onRadioClick() {
    console.log('aaaaa');
  }
}
