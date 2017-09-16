import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from "@angular/forms";
import {ApplicationService} from "../../../../core/service/application.service";
import {CustomizeFormValidateService} from "../../../../core/service/customize-form.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {
  GetPatientListRequest, GetPatientListResponse, SearchPatientRequest
} from '../../../../core/messages/patient-request-response';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {ProcessService} from "../../../../core/service/process.service";
import * as Process from "../../../../core/messages/process-request-response";
import {WorkerService} from "../../../../core/service/worker.service";
import {GlobalState} from "../../../../global.state";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {QiezziPaginator} from "../../../../shared/component/qiezzi-paginator/qiezzi-paginator";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {PatientService} from '../../../../core/service/patient.service';
import * as dic from '../../../../core/global_dic';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {DictDetailListRequest} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {promise} from "selenium-webdriver";



@Component({
  selector: 'app-select-goods',
  templateUrl: './select-goods.component.html',
  styleUrls: ['./select-goods.component.scss']
})
export class SelectGoodsComponent implements OnInit, AfterViewInit {
// 参数声明
  displayStatus: string;

  requestData: GetPatientListRequest; // 患者列表请求数据

  // 全选复选框
  item={Id:1};
  IsChooseAll: boolean=false; // 全选复选框
  goodsCheckedList= [];

  // 左侧滚动条设置
  centerLeftLoadReady: boolean;
  selectIndex: number;
  isBorderLeft: boolean;// 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        // GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }
  // 右侧滚动条设置
  centerRightLoadReady: boolean;
  isBorderRight: boolean;// 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        // GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }


  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private patientService: PatientService,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private HospitalService: HospitalService,
              private mScrollbarService: MalihuScrollbarService,
              private globalState: GlobalState) {
  }

  ngOnInit() {
    this.centerLeftLoadReady = true;
    this.centerRightLoadReady = true;
  }

  ngAfterViewInit(): void {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
  }



  /*
   * TODO 全选复选框
   * */
  selecctAllCheckBox(bool) {
    this.IsChooseAll = bool;
    this.goodsCheckedList = [];
    if (bool) {
      this.goodsCheckedList.push(this.item.Id);
      /*this.patientList.Items.forEach(value => {
       });*/
    }
  }
  selectBox(id) {
    if ( this.goodsCheckedList.indexOf(id) > -1) {
      this.goodsCheckedList.splice(this.goodsCheckedList.indexOf(id), 1);
    }else {
      this.goodsCheckedList.push(id);
    }
    console.log(this.goodsCheckedList);
  }


  clickFeeItem() { }
}
