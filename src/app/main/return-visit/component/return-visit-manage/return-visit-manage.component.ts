import {Component, AfterViewInit, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {
  FollowUpGetListRequest,
  FollowUpGetListResponse, FollowUpGetRequest, FollowUpGetResponse, FollowUpGetTypeListResponse, InterviewSimple,
} from '../../../../core/messages/return-visit-request-response';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {GlobalState} from '../../../../global.state';
import {ApplicationService} from '../../../../core/service/application.service';
import {SelectItem} from '../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {ReturnVisitAddUpdateComponent} from '../return-visit-add-update/return-visit-add-update.component';
import {ReturnVisitHandlerComponent} from '../return-visit-handler/return-visit-handler.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {WorkerService} from '../../../../core/service/worker.service';
import {WorkerListRequest, WorkerListResponse, WorkerPeople} from '../../../../core/messages/worker-request-response';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {DictDetailListRequest} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
/**
 *
 */

@Component({
  selector: 'return-visit-manage',
  templateUrl: 'return-visit-manage.component.html',
  styleUrls: ['return-visit-manage.scss'],
})
export class ReturnVisitManageComponent implements AfterViewInit, OnInit, IQiezziCenterHeaderComponent {

  moduleName = '回访管理';
  // 分页显示
  showEmptyState = false;
  showOrHide: any = {};
  // 当前tab切换项
  currentIdx = 0;
  /*回访列表*/
  id: string; //  回访的id
  requestData: FollowUpGetListRequest = new FollowUpGetListRequest();
  responseData: FollowUpGetListResponse;
  toggle = false;
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'}; // 滚动条
  /*筛选接口数据*/
  workerListRequest: WorkerListRequest = new WorkerListRequest();
  workerListResponse: WorkerListResponse;
  /*高级筛选*/
  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;
  // this.filterConfig.doctorList.datta= []
  filterConfig: any = {
    'doctorList': {
      title: '医生',
      type: 'list',
      data: []
    },
    'InterviewName': {
      title: '回访人',
      type: 'list',
      data: []
    },
    'InterviewData': {
      title: '回访日期',
      type: 'time'
    },
    'InterviewType': {
      title: '回访类型',
      type: 'list',
      data: []
    },
  };
  data = [];
  /*筛选医生*/
  workers: WorkerPeople[]; // 加载 医生护士列表
  docList = []; // 医生下拉框
  InterviewName = []; // 回访人
  InterviewType = []; // 回访类型
  returnTypeList = []; // 回访类型列表
  Items: any;
  // 当前选中项
  selectIndex: number;
  WorkerName: any;
  displayStatus = '';
  doctorList: SelectItem[];
  patientId: string; // 患者的id
  returnVisitState = 0;
  /*
  * loading*/
  mainShowLoading = 'hide';
  dataLoading= 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  /*左侧回访数据接口*/
  response: FollowUpGetResponse;
  request: FollowUpGetRequest;
  scrollbarOptionsRight = { // 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  tabData = {
    data: ['进行中', '已完成'],
    defaultIndex: 0,
  };

  constructor(private returnVisitService: ReturnVisitService,
              public application: ApplicationService,
              private el: ElementRef,
              private router: Router,
              private slider: CustomizeSliderService,
              private route: ActivatedRoute,
              private workerService: WorkerService,
              private HospitalService: HospitalService
  ) {
    this.response = new FollowUpGetResponse();
    this.request = new FollowUpGetRequest();
  }

  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.requestData.OrderBy = 2;
    this.getFollowUpList(); // 加载回访列表
    this.getdocList(); // 加载医生列表
    this.getinterviewName(); // 加载 医生护士列表
    this.getReturnType(); // 加载回访类型
    // 初始化tab选项卡
    this.realTabIndex(0);
    this.selectIndex = -1;
  }
  ngAfterViewInit(): void {
    this.mainShowLoading = 'show';
  }
  /*
  * TODO 加载医生列表
  * */
  getdocList() {
    this.workerListRequest.WorkerType = 0;
    this.workerService.getWorkerList(this.workerListRequest).subscribe(val => {
      console.log(val);
      this.workerListResponse = val;
      this.workerListResponse.Items.forEach((value) => {
        this.docList.push(value.WorkerName);
      });
      this.filterConfig.doctorList.data = this.docList;
    });
  }
  /*
  * TODO 加载 医生护士列表
  * */
  getinterviewName () {
    this.workerService.getGetList({workerTypeArray: [0, 1]}).subscribe( val => {
      this.workers = val;
      this.workers.forEach((value) => {
        this.InterviewName.push(value.WorkerName);
      });
      this.filterConfig.InterviewName.data = this.InterviewName;
    });
  }
  /*
   * TODO 加载回访类型
   * */
  getReturnType() {
    this.returnVisitService.getReturnType().subscribe(val => {
      if (val && val.length > 0) {
        this.returnTypeList = val;
        this.returnTypeList.forEach(value => {
          this.InterviewType.push( value.TypeName);
        });
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /**
   * TODO 回访分页改变
   */
  onPageChange(evt: any) {
    this.requestData.PageIndex = evt.page;
    this.getFollowUpListLoading();
  }
  /*
  * TODO 回访列表  loading
  * */
  getFollowUpListLoading() {
    this.dataLoading = 'show';
    this.getFollowUpList();
  }
  /*
   * TODO 回访列表
   * */
  getFollowUpList() {
    if (this.responseData) {
      this.responseData.Items = [];
      this.responseData.TotalItems = 0;
    }
    this.returnVisitService.getFollowUpGetList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.mainShowLoading = 'hide';
      if (val && val.Items && val.Items.length > 0) {
        this.responseData = val;
        this.responseData.Items.forEach(value => {
          this.data.push(value.PatientModel.PatientName);
          if (value.InterviewTypeName) {
            this.InterviewType.push(value.InterviewTypeName);
          }
          let name = '';
          value.InterviewWorkerList.forEach(item => {
            name += item.WorkerName + '/';
          });
          value['WorkerNames'] = name.slice(0, name.length - 2);
          this.filterConfig.InterviewType.data = this.InterviewType;
        });
        this.showEmptyState = false;
      } else {
        this.showEmptyState = true;
      }
    }, error => {
      this.mainShowLoading = 'hide';
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }

  /*
  * TODO 新增回访人
  * */
  onControlClick(evt: any) {
    this.application.frontLayer.openPopupWindow(ReturnVisitAddUpdateComponent, '新增回访人', PopupWindowSize.SMALL, 600, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }

  /*
  * TODO 操作回访
  * */
  onInteriver(evt, item: InterviewSimple) {
    if (evt.currentTarget.className.indexOf('stop-propagation') > -1) {
      evt.stopPropagation();
    }
    console.log(item.Id, item.PatientModel.Id);
    this.application.frontLayer.openPopupWindow(ReturnVisitHandlerComponent, '回访', PopupWindowSize.BIGGER, 770, {
      patientId: item.PatientModel.Id,
      id: item.Id
    }, false).subscribe(t => {
      console.log('刷新列表了');
    });
  }
  /*
  * TODO 获取收费单数据
  * */
  getBillList() {
    this.dataLoading = 'show';
    this.returnVisitService.getFollowUpGetList(this.requestData).subscribe(value => {
      if (!value.Items || value.Items.length === 0) {
        this.showEmptyState = true;
        this.showOrHide['display'] = 'none';
      } else {
        this.showEmptyState = false;
        if (this.responseData.TotalPages > 1) {
          delete this.showOrHide['display'];
        }
      }
      this.dataLoading = 'hide';
    });
  }
  /*
  * TODO 侧滑  详情
  * */
  clickFeeItem(evt, id, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.selectIndex = i;
    this.router.navigate(['return-visit-detail', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
  /*
  * TODO 到回访设置页面
  * */
  onOptions() {
    this.router.navigate(['feedback/return-visit-option']);
  }
  /*
  * TODO tab切换
  * */
  changeTab(index) {
    this.currentIdx = index.index;
    if (this.currentIdx === 0) {
      this.toggle = false;
      this.requestData.state = 0;
    } else if (this.currentIdx === 1) {
      this.toggle = true;
      this.requestData.state = 2;
    }
    this.selectIndex = -1;
    this.requestData.PageIndex = 1;
    // this.router.navigate(['../'], {relativeTo: this.route});
    // this.slider.show(this, evt);
    this.router.navigate(['.'], {relativeTo: this.route});
    this.getBillList();
  }

  /**
   * TODO 顶部搜索
   */
  onSearch(keyword) {
    this.requestData.keyword = keyword;
    this.requestData.PageIndex = 1;
    this.getBillList();
  }
  /*
   *  TODO 显示筛选框
   * */
  onShowFilter(stat) {
    this.dataFilterComponent.changeStatus(stat);
  }
  /*
  * TODO 筛选过滤器
  * */
  onConditionChanged(data) {
    console.log(data);
    if (data.doctorList && data.doctorList !== -1) {
      this.requestData['doctorID'] = this.workerListResponse.Items[data.doctorList].WorkerId;
    }else {
      this.requestData['doctorID'] = null;
    }
    if (data.InterviewType && data.InterviewType !== -1) {
      this.requestData['typeID'] = this.returnTypeList[data.InterviewType].TypeID;
    }else {
      this.requestData['typeID'] = null;
    }
    if (data.InterviewName && data.InterviewName !== -1) {
      this.requestData['interviewWorkerID'] = this.workers[data.InterviewName].WorkerId;
    }else {
      this.requestData['interviewWorkerID'] = null;
    }
    this.requestData.PageIndex = 1;
    this.getBillList();
  }

  /**
   * 处理tab筛选请求
   * @param idx
   */
  realTabIndex(idx) {
    if (idx !== this.currentIdx) {
      this.showOrHide['display'] = 'none';
      this.showEmptyState = false;
      this.currentIdx = idx;
      this.requestData.PageIndex = 1;
      this.getBillList();
    }
  }
  onControl(evt) {}
}
