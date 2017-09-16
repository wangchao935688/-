import {Component, Input, OnInit} from '@angular/core';
import {
  FollowUpUpdateRequest,
  FollowUpAddResultRequest,
  FollowUpGetResponse, FollowUpGetRequest, FollowUpGetListpatientIDRequest, FollowUpGetListpatientIDResponse
} from '../../../../core/messages/return-visit-request-response';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {FRONT_LAYER_POPUP_COMPONENT} from '../../../../core/constants/global-subscriber-events';
import {ReturnVisitCancelComponent} from '../return-visit-cancel/return-visit-cancel.component';
import {ReturnVisitAddUpdateComponent} from '../return-visit-add-update/return-visit-add-update.component';
import {ApplicationService} from '../../../../core/service/application.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {ChargeService} from '../../../../core/service/charge.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {QiezziInvalidComponent} from '../../../../shared/component/qiezzi-invalid/qiezzi-invalid.component';
import {ActivatedRoute} from '@angular/router';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {
  CaseDetailsRequest, CaseDetailsResponse,
  CaseListRequest, CaseListResponse
} from '../../../../core/messages/case-request-response';
import {CaseService} from '../../../../core/service/case.service';
import {DetailsResponse} from '../../../../core/messages/bill-request-response';
import {isBoolean} from "util";
import {stringDistance} from "codelyzer/util/utils";
import {CreateEditBookingComponent} from "../../../schedule/component/create-edit-booking/create-edit-booking.component";
@Component({
  selector: 'return-visit-handler',
  templateUrl: 'return-visit-handler.component.html',
  styleUrls: ['return-visit-handler.component.scss']
})
export class ReturnVisitHandlerComponent extends PopupWindowBaseComponent implements OnInit {
  /*接数据接口的Id*/
  @Input()
  data: any;
  onParentClose: Function;
  /*操作*/
  toggle: boolean = false;
  currentInd= [false];
  currentIndex= [false];
  currentIndx= [false];
  tagList = [];
  caseImageList = [];
  /*
   * 患者收费
   * */
  WorkerName: any;
  isShow = -1;
  isInterview = -1;
  isCharge = -1;
  // 顶部tab映射
  tabMap: number[] = [0, 1, 2];
  listData: BillRequestResponse.BillListModel[];
  // 回访详情
  returnVisitDetail: FollowUpUpdateRequest;
// 当前tab切换项
  currentIdx = 0;
  request: BillRequestResponse.GetPatientBillRequest = new BillRequestResponse.GetPatientBillRequest();
  response: Array<BillRequestResponse.GetPatientBillResponse>;
  id: string;
  patientId: string;
  /*左侧回访数据接口*/
  responseData: FollowUpGetResponse;
  requestData: FollowUpGetRequest;
  /*病历详情数据接口*/
  caseDetailsResponse: CaseDetailsResponse;
  caseDetailsRequest: CaseDetailsRequest;
  /*病历列表数据接口*/
  caseListRequest: CaseListRequest;
  caseListResponse: CaseListResponse;
  /*
   * TODO 右侧回访
   * */
  FollowUpGetListpatientIDResponse: FollowUpGetListpatientIDResponse;
  // 回访结果
  returnVisitResult: FollowUpAddResultRequest;
  // 分页显示
  showOrHide: any = {};
  /*
   * TODO 收费单详情
   * */
  detailsResponse: DetailsResponse;
  // 回访详情集合
  returnVisitDetailList: Array<FollowUpGetResponse>;
// 是否显示没有数据
  showEmptyState = false;
  item: any;
  tabData = {
    data: ['病历', '收费', '回访'],
    defaultIndex: 0
  };
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptions = {// 右侧侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarTextarea = {// 多行文本框右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  teethList: any;
  // 数据加载中状态
  dataLoading: string;
  showEmpty: boolean;
  returnVisitContent: string = null;
  result: string;
  showCaseEmptyState = false;
  showPayEmptyState = false;
  showVisitEmptyState = false;
  constructor(private returnVisitService: ReturnVisitService,
              private application: ApplicationService,
              private chargeService: ChargeService,
              private route: ActivatedRoute,
              private caseService: CaseService
  ) {
    super();
    this.returnVisitDetail = new FollowUpUpdateRequest();
    this.responseData = new FollowUpGetResponse();
    this.requestData = new FollowUpGetRequest();
  }

  ngOnInit() {
    console.log(this.data);
    this.id = this.data.id;
    this.patientId = this.data.patientId;
    this.getReturnVisitDetail(); // 获取个人信息
    // 初始化tab选项卡
    this.teethList = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];
    this.returnVisitResult = new FollowUpAddResultRequest();
    this.realTabIndex(0);
    this.getListpatientID();
    this.getBillList();
    this.getCaseList();
  }

  /*
   * TODO 病历列表
   * */
  getCaseList() {
    this.showCaseEmptyState = false;
      this.caseListRequest = {patientID: this.patientId};
    this.caseService.getCaseList(this.caseListRequest).subscribe(val => {
      console.log(val);
      if (val && val.length > 0) {
        this.tabData.data[0] = '病历（' + val.length + '）';
        console.dir(this.tabData.data);
        this.caseListResponse = val;
      }else {
        this.showCaseEmptyState = true;
      }
    });
  }

  /*
   * TODO 病历详情
   * */
  getCaseDetails(id, index) {
    console.log(111, id);
    this.caseDetailsRequest = {Id: id};
    if (this.isShow === index) {
      this.toggle = !this.toggle;
      this.currentInd[index] = !this.currentInd[index];
    } else {
      this.isShow = index;
      this.currentInd[this.isShow] = !this.currentInd[this.isShow];
      this.toggle = !this.toggle;
    }
    this.caseService.getCaseDetails(this.caseDetailsRequest).subscribe(val => {
      this.dataLoading = 'hide';
      // console.log(val);
      if (val) {
        this.caseDetailsResponse = val;
        // console.log(val);
        // 标签列表
        if (this.caseDetailsResponse.RelationNameList && this.caseDetailsResponse.RelationNameList.length > 0) {
          this.caseDetailsResponse.RelationNameList.forEach(value => {
            this.tagList.push({title: value.Name});
          });
        }
        // 判断是否是图片列表
        if (this.caseDetailsResponse.IsImageCase) {
          this.caseImageList = this.caseDetailsResponse.CaseImage.split(',');
          if (!this.caseImageList[0]) {
            this.showEmpty = true;
          } else {
            this.showEmpty = false;
          }
        } else { // 如果不是图片列表，将检查的图片字符串转化成数组
          this.caseDetailsResponse.CaseItemList.forEach(value => {
            if (value.Images) {
              value['imgList'] = value.Images.split(',');
            } else {
              value['imgList'] = [];
            }
          });
        }
      }
    });
  }

  /*
   * TODO 左侧回访
   * */
  getReturnVisitDetail() {
    this.returnVisitService.getReturnVisitDetail(this.id).subscribe((val: FollowUpGetResponse) => {
      this.responseData = val;
      if (this.responseData && this.responseData.Content) {
        this.returnVisitContent = this.responseData.Content;
      }
      console.log(val);
      let name = '';
      this.responseData.InterviewWorkerList.forEach(value => {
        name += value.WorkerName + '/';
      });
      this.WorkerName = name.slice(0, name.length - 2);
    });
  }

  /*
   * TODO 右侧回访数据
   * */
  getListpatientID() {
    this.showVisitEmptyState = true;
    this.returnVisitService.getListpatientID(this.patientId).subscribe((value) => {
      console.log(value);
      if (value && value['length'] > 0) {
        this.tabData.data[2] = '回访（' + value['length'] + '）';
        this.FollowUpGetListpatientIDResponse = value;
        console.dir(this.tabData.data);
        this.showVisitEmptyState = false;
      }else {
        this.showVisitEmptyState = true;
      }
    });
  }
  /*
  * TODO 左侧数据详情
  * */
  getListpatient(index) {
    if (this.isInterview === index) {
      this.toggle = !this.toggle;
      this.currentIndex[index] = !this.currentIndex[index];
    } else {
      this.isInterview = index;
      this.currentIndex[this.isInterview] = !this.currentIndex[this.isInterview];
      this.toggle = !this.toggle;
    }
  }
  /*
   * TODO 取消
   * */
  cancel() {
    this.application.frontLayer.openPopupWindow(QiezziInvalidComponent, '取消原因', PopupWindowSize.SMALL, 'auto', false).subscribe(t => {
      if (t) {
        console.dir(t['data']['data']);
        this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
      }
    });
  }

  /*
   * TODO 获取收费单数据
   * */
  getBillList() {
    this.showPayEmptyState = false;
    this.request = {patientID: this.patientId};
    this.dataLoading = 'show';
    this.chargeService.GetPatientBill(this.request).subscribe(t => {
      console.log(t);
      this.tabData.data[1] = '收费（' + t.length + '）';
      if (t && t.length > 0) {
        this.response = t;
        this.showOrHide['display'] = 'none';
      } else {
        this.showPayEmptyState = true;
      }
      this.dataLoading = 'hide';
    }, error => {
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 收费单详情
  * */
  getBill(id, index) {
    if (this.isCharge === index) {
      this.toggle = !this.toggle;
      this.currentIndx[index] = !this.currentIndx[index];
    } else {
      this.isCharge = index;
      this.currentIndx[this.isCharge] = !this.currentIndx[this.isCharge];
      this.toggle = !this.toggle;
    }
    this.chargeService.getBill({ID: id}).subscribe((val) => {
      console.log(val);
      this.detailsResponse = val;
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /**
   * 中间Tab筛选
   */
  changeTab(e) {
    this.realTabIndex(Number(e.index));
  }

  /**
   * 处理tab筛选请求
   * @param idx
   */
  realTabIndex(idx) {
    idx = this.tabMap[idx];
    if (idx !== this.currentIdx) {
      this.showOrHide['display'] = 'none';
      this.showEmptyState = false;
      this.listData = null;
      this.currentIdx = idx;
      if (idx === 1) {
        /*收费信息*/
        this.getBillList();
      } else if (idx === 0) {
        /*病历列表*/
        this.getCaseList();
      } else {
        this.getListpatientID(); // 回访信息
      }
    }
  }

  /**
   * 选择结果模板
   */
  selectTemplate(evt: any) {
    this.returnVisitResult.Result = evt.Content;
  }

  /**
   * TODO 提交回访结果
   */
  saveReturnVisitResult() {
    this.returnVisitResult.InterviewId = this.id;
    if (this.result) {
      this.returnVisitResult.Result = this.result;
      this.returnVisitService.saveReturnVisitResult(this.returnVisitResult).subscribe(val => {
        this.application.main.openPromptMessage('提交成功！', 3000);
      }, error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    }
  }

  /**
   * 取消回访
   */
  saveReturnVisitCancel() {
    GlobalSubscriber.fire(FRONT_LAYER_POPUP_COMPONENT, {
      component: ReturnVisitCancelComponent,
      componentName: '取消回访',
      data: this.returnVisitDetail.Id
    });
  }

  /**
   * 修改回访
   */
  saveReturnVisitUpdate() {
    GlobalSubscriber.fire(FRONT_LAYER_POPUP_COMPONENT, {
      component: ReturnVisitAddUpdateComponent,
      componentName: '修改回访',
      data: {Id: this.returnVisitDetail.Id, type: 1}
    });
    this.returnVisitService.saveReturnVisitUpdate(this.returnVisitDetail);
  }

  /**
   * 删除回访
   */
  saveReturnVisitDelete() {
    this.application.frontLayer.openConfirmDialog('您正在执行删除操作，确定要删除吗？').subscribe(t => {
      if (t != null && t) {
        console.log('删除');
        this.returnVisitService.saveReturnVisitDelete(this.returnVisitDetail.Id);
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
    });
  }

  /*
   * TODO 完成回访
   * */
  successVisit() {
    this.application.frontLayer.openConfirmDialog('确定完成回访?').subscribe(t => {
      if (t != null && t) {
        this.returnVisitService.saveReturnVisitDelete(this.returnVisitDetail.Id).subscribe(val => {
          console.log(val);
          this.application.main.openPromptMessage('完成！', 3000); // 提示成功
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
  /*
  * TODO 预约复诊
  * */
  booking() {
    this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '预约复诊', PopupWindowSize.MIDDLE, 810, null).subscribe(t => {
      if (t) {
        console.dir(t['data']['data']);
        this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
      }
    });
  }
  /*
  * TODO 监听回访结果输入
  * */
  sendResult() {
    console.log(this.result);
  }
  /*
  * TODO 监听回访内容输入
  * */
  sendContent() {
    console.log(this.returnVisitContent);
  }
}
