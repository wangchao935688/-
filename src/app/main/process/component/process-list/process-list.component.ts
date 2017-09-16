import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ProcessService} from "../../../../core/service/process.service";
import * as Process from "../../../../core/messages/process-request-response";
import {CreateProcessComponent} from "../create-process/create-process.component";
import {WorkerService} from "../../../../core/service/worker.service";
import {GlobalState} from "../../../../global.state";
import {ApplicationService} from "../../../../core/service/application.service";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {QiezziPaginator} from "../../../../shared/component/qiezzi-paginator/qiezzi-paginator";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
/**
 * 外加工列表
 */
@Component({
  selector: 'process-list',
  templateUrl: 'process-list.component.html',
  styleUrls: ['process-list.component.scss']
})
export class ProcessListComponent implements OnInit, AfterViewInit, OnDestroy,IQiezziCenterHeaderComponent {
  //分页显示
  showOrHide: any = {};
  isBorder: boolean;
  displayStatus: string;
  dataLoading: string;

  @ViewChild(QiezziPaginator)
  pager: QiezziPaginator;

  requestData: Process.OutsideProcessGetListRequest;

  responseData: Process.OutsideProcessGetListResponse;

  processState: number = 0;

  selectIndex: number;

  showEmpty: boolean;

  list = ['待派送', '已取件', '已回件', '', '返工', '已戴走'];

  tabData = {
    data: ['待派送', '已取件', '已回件', '返工', '已戴走'],
    defaultIndex: 0,
    changeTab: (index) => {
      this.selectTabIndex(this.list.findIndex(val => val == index.title));
    }
  };
  scrollbarOptions: any = null;

  // 医生集合
  doctorList: SelectItem[];

  mainShowLoading: string = 'hide';

  constructor(private processService: ProcessService, private router: Router, private el: ElementRef,
              private route: ActivatedRoute, private workerService: WorkerService, private globalState: GlobalState,
              private slider: CustomizeSliderService, public application: ApplicationService) {

    this.requestData = new Process.OutsideProcessGetListRequest();
    this.responseData = new Process.OutsideProcessGetListResponse();
    this.responseData.TotalItems = 0;
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
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;

    this.doctorList = [];

    this.workerService.getWorkerList({WorkerType: 0}).subscribe(val => {
      val.Items.forEach(item => {
        this.doctorList.push({label: item.WorkerName, value: String(item.WorkerId)});
      });
    });
    this.searchProcessList();
  }

  ngAfterViewInit(): void {
  }

  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
    this.application.frontLayer.openPopupWindow(CreateProcessComponent, '新增外加工', PopupWindowSize.SMALL, 1000, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }

  onOptions(val: any) {
    this.router.navigate(['process-list/process-options']);
  }


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
      this.showEmpty = this.responseData.TotalItems == 0;
    }, error => {
      console.log(error);
    });
  }

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
    this.pager.first = 0;
    this.searchProcessList();
  }

  /**
   * 打开外加工详情
   * @param evt
   * @param id
   * @param i
   */
  openDetail(evt: any, id: string, i: number) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.selectIndex = i;
    this.router.navigate(['process', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  /**
   * 分页改变
   * @param evt
   */
  pageChange(evt: any) {
    this.selectIndex = -1;
    this.requestData.pageIndex = evt.page;
    if (this.responseData) {
      this.responseData.TotalItems = 0;
    }

    this.showEmpty = false;
    this.dataLoading = 'show';
    this.searchProcessList();
  }

  selectLeft(evt: any) {
    this.requestData.beginTime = evt;
  }

  selectRight(evt: any) {
    this.requestData.endTime = evt;
  }

  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
}

