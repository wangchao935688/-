import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChargeService} from '../../../../core/service/charge.service';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {UserService} from '../../../../core/service/user.service';
import * as UserRequestResponse from '../../../../core/messages/user-request-response';
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";
import {CustomizeSliderService, ICustomizeSlider} from "../../../../core/service/customize-slider.service";
import {ApplicationService} from "../../../../core/service/application.service";
import {WorkerService} from '../../../../core/service/worker.service';
import {WorkerType} from "../../../../core/enums/worker_type";
import * as WorkerRequestResponse from '../../../../core/messages/worker-request-response';
import {WorkerSimple} from '../../../../core/messages/model/worker_simple';
import * as GlobalDic from '../../../../core/global_dic';
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {CreateEditInputStockComponent} from '../create-edit-input-stock/create-edit-input-stock.component';
import {
  StockInListRequest,
  StockInListResponse
} from "../../../../core/messages/stock-request-response";
import {StockService} from "../../../../core/service/stock.service";


@Component({
  selector: 'app-input-stock-list',
  templateUrl: './input-stock-list.component.html',
  styleUrls: ['./input-stock-list.component.scss']
})
export class InputStockListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  //参数设置
  stockInListRequest: StockInListRequest = new StockInListRequest();     //获取入库单列表请求数据
  stockInListResponse: StockInListResponse = new StockInListResponse();  //获取入库单列表响应

  moduleName = '物品入库';
  listData: BillRequestResponse.BillListModel[];

  request: BillRequestResponse.GetBillListRequest = new BillRequestResponse.GetBillListRequest();
  response: BillRequestResponse.GetBillListResponse;
  cWorker: UserRequestResponse.WorkerInfoModel;

  isBorder: boolean;
  //当前选中项
  selectIndex: number;
  //是否显示没有数据
  showEmptyState = false;
  //分页显示
  showOrHide: any = {};
  //滚动条配置
  scrollbarOptions: any;
//数据加载中状态
  dataLoading: string;
//全屏的加载状态
  mainShowLoading: string = 'hide';
  //侧滑显示隐藏
  displayStatus: string;

  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;


// 筛选配置
  filterConfig: any = {
    // 入库日期
    'inputStackTime': {title: '入库日期', type: 'time'},
    // 供应商
    'supplier': {title: '供应商', type: 'list', data: ['AAAAA', 'BBBBB', 'CCCCC']},
    // 库管员
    'stockKeeper': {title: '库管员', type: 'list', data: ['张晓明', '李晨', '陈小春']}
  };
  /*'doctorList': {
   title: '医生',
   type: 'list',
   data: []
   },
   'visitTime': {title: '就诊日期', type: 'time'},*/


  constructor(private el: ElementRef,
              private chargeService: ChargeService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService,
              private stockService: StockService,
              private workerService: WorkerService) {
  }

  ngOnInit() {
    this.stockInListRequest.beginTime = null;   //开始时间    string
    this.stockInListRequest.endTime = null;     //结束时间    string
    this.stockInListRequest.supplierID = null;  //供应商id   string
    this.stockInListRequest.workerID = null;    //库管员id   string
    this.stockInListRequest.keyword = null;     //搜索关键字   string
    this.getStockInList();  //获取入库单列表

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

    this.cWorker = this.userService.getCurrentWorkeInfo();


    // GlobalSubscriber.on()

  }

  ngAfterViewInit(): void {
    // this.mainShowLoading = 'show';
    this.dataLoading = 'show';
    // this.application.workModule = this;
    // this.application.workBoard = this.el.nativeElement;
  }

  /**
   * 获取入库单列表 Loading
   */
  getStockInListLoading(){
    this.dataLoading = 'show';
    this.getStockInList();
  }
  /**
   * 获取入库单列表
   */
  getStockInList() {
    this.stockService.getStockInList(this.stockInListRequest).subscribe(val => {
      if (val) {  //数据存在
        this.stockInListResponse = val;
        console.log(11, val);
      } else {    //数据不存在
        this.showEmptyState = true;
      }
      this.dataLoading = 'hide';
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      // this.mainShowLoading = 'hide';
      this.dataLoading = 'hide';
    });
  }

  /**
   * 高级筛选回调
   * @param e
   */
  onConditionChanged(data) {
    console.log(data)
    /*this.request.DoctorCode='';
     if (data.doctorList!=-1){
     this.request.DoctorCode=this.doctorMap[data.doctorList].WorkerCode;
     }
     this.getBillList();*/
  }

  /**
   * 顶部搜索
   * @param e
   */
  onSearch(keyword) {
    this.request.KeyWords = keyword;
    // this.getBillList();
  }

  /**
   * 顶部的添加
   * @param e
   */
  onControl(e) {
    if (e === 0) {
      this.application.frontLayer.openPopupWindow(CreateEditInputStockComponent, '新增入库单', PopupWindowSize.BIGGER, 660, {}, false)
        .subscribe(t => {
          console.log("刷新列表了");
          // this.getBillList();
        });
    }
  }

  /*
   onControl(e) {
   if (evt === 0) {
   this.application.frontLayer.openPopupWindow( CreatePatientComponent, '新增患者', PopupWindowSize.MIDDLE, 680, null, false).subscribe(t => {
   if (t) {
   console.dir(t['data']['data']);
   this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
   this.getPatientList();
   }
   });
   }
   }
   */


  /**
   * 控制展示隐藏高级筛选
   * @param e
   */
  onShowFilter(e) {
    this.dataFilterComponent.changeStatus(e);
  }

  // 物品入库设置-跳转到入库明细查询
  onOptions(event) {
    // this.router.navigate(['input-stock-query'], {relativeTo: this.route});
    this.router.navigate(['stock/input-stock-query']);
  }

  /*
   * TODO 跳转到详情页
   * */
  clickFeeItem(evt, id, i) {
    let target = evt.srcElement || evt.target;
    if (target.className.indexOf('checkBox') > -1) {
      evt.stopPropagation();
      return true;
    } else if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
      this.selectIndex = i;
      this.router.navigate(['input-stock',id], {relativeTo: this.route});
      this.slider.show(this, evt);
    }
  }
  /**
   * TODO 分页改变
   * @param evt
   */
  onPageChange(evt: any) {
    this.stockInListRequest.pageIndex = evt.page;
    this.stockInListRequest.pageSize = evt.rows;
    this.getStockInListLoading();
  }

}
