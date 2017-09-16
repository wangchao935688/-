import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from "@angular/forms";

import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {CustomizeFormValidateService} from "../../../../core/service/customize-form.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";

import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {GlobalState} from "../../../../global.state";
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {HospitalService} from '../../../../core/service/hospital.service';
import {PatientService} from '../../../../core/service/patient.service';


@Component({
  selector: 'app-stockinfo',
  templateUrl: './stockinfo.component.html',
  styleUrls: ['./stockinfo.component.scss']
})

export class StockinfoComponent implements OnInit, AfterViewInit {

  mainShowLoading = 'hide';

  pageIndex: number =0;
  centerRightLoadReady = true;
  displayStatus: string;

  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示

  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};

  selectedButtons: any;
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  centerLeftLoadReady = true;
  isBorderLeft: boolean;// 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }
  buttonGroupData = [
    {title: 'gfhy', value: '1'},
    {title: 'gfhy', value: '2'},
    {title: 'gfhy', value: '3'}
  ];

  tabData = {
    data: ['当前库存', '底量报警', '批次明细查询'],
    // dataURL:string[]=['current-stock','low-volume-alarm','batch-detail-query'],
    defaultIndex : 0,
    changeTab: (index) => {
      console.log(index);
    }
  };
  FlowList = {
    Items: [
      {
        goodname: '牙酸利多卡因注射液',
        nowcount: '2',
        price: '5.00',
        totil: '15.00'
      },
      {
        goodname: '牙酸利多卡因注射液',
        nowcount: '2',
        price: '5.00',
        totil: '15.00'
      },
      {
        goodname: '牙酸利多卡因注射液',
        nowcount: '2',
        price: '5.00',
        totil: '15.00'
      },
      {
        goodname: '牙酸利多卡因注射液',
        nowcount: '2',
        price: '5.00',
        totil: '15.00'
      }
    ]
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

  constructor(
        public el: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private slider: CustomizeSliderService,
        private application: ApplicationService,
        private form: CustomizeFormValidateService,
        private patientService: PatientService,
        private HospitalService: HospitalService,
        private mScrollbarService: MalihuScrollbarService,
        private globalState: GlobalState) {
}

  onOptionClick() {
    this.router.navigate(['../list'], {relativeTo: this.route});
  }

  onScroll(evt) {
    this.isBorder = evt.top < -55;
  }

  ngOnInit() {
    // this.router.navigate(['current-stock'], {relativeTo: this.route});//默认跳转当前库存
    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (evt) {
          self.onScroll({top: this.mcs.top});
        }
      }
    };

    //this.formName = 'Patient';
    //this.form.buildForm(this);
  }

  ngAfterViewInit(): void {

  }

  // tab切换
  changeTab(obj) {
    // console.log(obj.index);
    // let dataURL:string[]=['current-stock','low-volume-alarm','batch-detail-query'];

    this.pageIndex=obj.index;
    // this.router.navigate([this.dataURL[obj.index]], {relativeTo: this.route});
    // this.router.navigate([dataURL[obj.index]], {relativeTo: this.route});
  }

  changeTab1(index) {
    console.log(index);
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

  onControlClick(evt) {

  }
}
