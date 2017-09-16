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
import { CreateEditReturnStockComponent } from '../create-edit-return-stock/create-edit-return-stock.component';

@Component({
  selector: 'app-return-goods-list',
  templateUrl: './return-goods-list.component.html',
  styleUrls: ['./return-goods-list.component.scss']
})
export class ReturnGoodsListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {

  moduleName = '物品退货';
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
    // 退货日期
    'returnGoodsTime': {title: '退货日期', type: 'time'},
    // 退货人
    'returnGoodsMan': {title: '退货人',type: 'list', data: ['AAAAA', 'BBBBB', 'CCCCC']},
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
              private workerService: WorkerService) {
    this.request.PageIndex = 1;
    this.request.PageSize = 2;
    this.request.StartTime = '';
    this.request.EndTime = '';
    this.request.KeyWords = '';
    this.request.DoctorCode = '';
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

    this.cWorker = this.userService.getCurrentWorkeInfo();


    // GlobalSubscriber.on()

  }


  ngAfterViewInit(): void {
    // this.application.workModule = this;
    // this.application.workBoard = this.el.nativeElement;
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
      this.application.frontLayer.openPopupWindow(CreateEditReturnStockComponent, '新增退货单', PopupWindowSize.BIGGER, 700, {}, false)
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
    // this.router.navigate(['return-goods-query'], {relativeTo: this.route});
    this.router.navigate(['stock/return-goods-query']);
  }

  /*
   * TODO 跳转到详情页
   * */
  clickFeeItem(evt, patientId, i) {
    let target = evt.srcElement || evt.target;
    if (target.className.indexOf('checkBox') > -1) {
      evt.stopPropagation();
      return true;
    }else if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
      this.selectIndex = i;
      this.router.navigate(['return-goods'], {relativeTo: this.route});
      this.slider.show(this, evt);
    }
  }
}
