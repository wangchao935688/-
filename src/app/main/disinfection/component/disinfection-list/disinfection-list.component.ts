import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProcessService} from '../../../../core/service/process.service';
import * as Process from '../../../../core/messages/process-request-response';
import {CreateEditDisinfectionComponent} from '../create-edit-disinfection/create-edit-disinfection.component';
import {WorkerService} from '../../../../core/service/worker.service';
import {GlobalState} from '../../../../global.state';
import {ApplicationService} from '../../../../core/service/application.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {ChargeService} from '../../../../core/service/charge.service';
import {QiezziPaginator} from '../../../../shared/component/qiezzi-paginator/qiezzi-paginator';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {SelectItem} from '../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component';
@Component({
  selector: 'disinfection-list',
  templateUrl: './disinfection-list.component.html',
  styleUrls: ['./disinfection-list.component.scss']
})
export class DisinfectionListComponent implements OnInit, AfterViewInit, OnDestroy, IQiezziCenterHeaderComponent {
  /*获取回访接口*/
  request: BillRequestResponse.GetBillListRequest = new BillRequestResponse.GetBillListRequest();
  response: BillRequestResponse.GetBillListResponse;
  /*接口*/
  listData: BillRequestResponse.BillListModel[];
  /*获取外加工接口*/
  requestData: Process.OutsideProcessGetListRequest;
  responseData: Process.OutsideProcessGetListResponse;
  /*医生列表*/
  doctorList: SelectItem[];
  /*出口状态*/
  displayStatus: '';
  // 数据加载中状态
  dataLoading: string;
  /*loading加载*/
  mainShowLoading = 'hide';
  /*选中项*/
  selectIndex: number;
  showEmpty: boolean;
  /*滚动条*/
  scrollbarOptions = {
    axis: 'y', theme: 'minimal-dark'};
  processState = 0;
  // 当前tab切换项
  currentIdx = -1;
  // 是否显示没有数据
  showEmptyState = false;
  // 分页显示
  showOrHide: any = {};
  constructor(private processService: ProcessService,
              private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private workerService: WorkerService,
              private globalState: GlobalState,
              private slider: CustomizeSliderService,
              private chargeService: ChargeService,
              public application: ApplicationService) {
    this.requestData = new Process.OutsideProcessGetListRequest();
    this.responseData = new Process.OutsideProcessGetListResponse();
    this.responseData.TotalItems = 0;
    this.globalState.subscribe('searchProcessList', val => this.searchProcessList());
  }
  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.doctorList = [];
    this.workerService.getWorkerList({WorkerType: 0}).subscribe(val => {
      val.Items.forEach(item => {
        this.doctorList.push({label: item.WorkerName, value: String(item.WorkerId)});
      });
      // this.application.mainModule.mainShowLoading = 'hide';
    });
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
    // this.application.mainModule.mainShowLoading = 'hide';
  };
  // 获取收费单数据
  getBillList() {
    this.request.Status = this.currentIdx === -1 ? '' : this.currentIdx;
    this.dataLoading = 'show';
    this.chargeService.getBillList(this.request)
      .subscribe(t => {
        this.response = t;
        this.listData = t.Items;
        this.request.PageIndex = t.CurrentPage;

        if (!this.listData || this.listData.length === 0) {
          this.showEmptyState = true;
          this.showOrHide['display'] = 'none';
        } else {
          this.showEmptyState = false;
          if (this.response.TotalPages > 1) {
            delete this.showOrHide['display'];
          }
        }
        this.dataLoading = 'hide';
      });
  }
  onOptions() {
    this.router.navigate(['disinfection-list/disinfection-option']);
  };
  /*新增消毒记录*/
  onControlClick(evt: any) {
    this.application.frontLayer.openPopupWindow(CreateEditDisinfectionComponent, '新增消毒记录', PopupWindowSize.SMALL, 550, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
  /*查询*/
  searchProcessList() {
    this.selectIndex = -1;
    this.router.navigate(['.'], {relativeTo: this.route});
    this.dataLoading = 'show';
    if (this.responseData) {
      this.responseData.Items = [];
      this.responseData.TotalItems = 0;
    }
    this.processService.getOutsideProcessGetList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.responseData = val;
      this.showEmpty = this.responseData.TotalItems === 0;
    });
  }
  /*切换*/
  selectTabIndex(index: number) {
    this.router.navigate(['.'], {relativeTo: this.route});
    this.selectIndex = -1;
    this.processState = index;
    this.requestData.status = index;
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    if (this.responseData) {
      this.responseData.Items = [];
      this.responseData.TotalItems = 0;
    }
    this.showEmpty = false;
    this.dataLoading = 'show';
    // this.pager.first = 0;
    this.searchProcessList();
  }
  /**
   * 打开外加工详情
   * @param evt
   * @param id
   * @param i
   */
  openDetail(evt: any) {
    // console.log(evt);
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.router.navigate(['disinfection'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
  /*左日期*/
  selectLeft(evt: any) {
    this.requestData.beginTime = evt;
  }
/*右日期*/
  selectRight(evt: any) {
    this.requestData.endTime = evt;
  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  onPageChange(evt) {
    /*this.request.PageIndex = Number(evt.page);*/
    this.getBillList();
  }
  onSearch(val: any): void {
  }
  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
  }
}
