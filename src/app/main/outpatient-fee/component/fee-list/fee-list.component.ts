import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChargeService} from '../../../../core/service/charge.service';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {UserService} from '../../../../core/service/user.service';
import * as UserRequestResponse from '../../../../core/messages/user-request-response';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {CreateFeeComponent} from '../create-fee/create-fee.component';
import {ChargeComponent} from '../charge/charge.component';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {WorkerService} from '../../../../core/service/worker.service';
import {WorkerType} from '../../../../core/enums/worker_type';
import * as WorkerRequestResponse from '../../../../core/messages/worker-request-response';
import {WorkerSimple} from '../../../../core/messages/model/worker_simple';
import * as GlobalDic from '../../../../core/global_dic';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';

@Component({
  selector: 'app-fee-list',
  templateUrl: 'fee-list.component.html',
  styleUrls: ['fee-list.component.scss']
})
export class FeeListComponent implements OnInit, AfterViewInit , OnDestroy, ICustomizeSlider, IQiezziCenterHeaderComponent {
  moduleName = '门诊收费';
  listData: BillRequestResponse.BillListModel[];
  // 当前tab切换项
  currentIdx = -1;
  request: BillRequestResponse.GetBillListRequest = new BillRequestResponse.GetBillListRequest();
  response: BillRequestResponse.GetBillListResponse;
  cWorker: UserRequestResponse.WorkerInfoModel;

  isBorder: boolean;
  // 当前选中项
  selectIndex: number;
  // 是否显示没有数据
  showEmptyState = false;
  // 分页显示
  showOrHide: any = {};
  // 滚动条配置
  scrollbarOptions: any;
// 数据加载中状态
  dataLoading: string;
// 全屏的加载状态
  mainShowLoading = 'hide';
  // 侧滑显示隐藏
  displayStatus: string;

  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;

// 顶部tab映射
  tabMap: number[] = [0, 1, 3, 2, -1];

  filterConfig: any = {
    'doctorList': {
      title: '医生',
      type: 'list',
      data: []
    },
    'visitTime': {title: '就诊日期', type: 'time'},
  };

  // 医生映射 map
  doctorMap: WorkerSimple [] = [];

  // 订单状态集合
  billStatusDic= GlobalDic.billStatus;

  constructor(private el: ElementRef, private chargeService: ChargeService,
              private userService: UserService,
              private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService,
              private application: ApplicationService, private workerService: WorkerService) {
    this.request.PageIndex = 1;
    this.request.PageSize = 2;
    this.request.StartTime = '';
    this.request.EndTime = '';
    this.request.KeyWords = '';
    this.request.DoctorCode = '';
  }

  onOptions(event) {
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
    // 初始化tab选项卡
    this.realTabIndex(0);
    // 设置医生
    let getDoctorRequest = new WorkerRequestResponse.GetListRequest();
    getDoctorRequest.workerTypeArray = [WorkerType.doctor];
    this.workerService.getGetList(getDoctorRequest).subscribe(t => {
      t.forEach((value) => {
        this.filterConfig.doctorList.data.push(value.WorkerName);
        this.doctorMap.push(value);
      });
    });
    //    设置当前医生的默认值
    // this.request.DoctorCode = this.cWorker.WorkerCode;
    //
    // GlobalSubscriber.on()

  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  ngAfterViewInit(): void {
  }

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

  /**
   * 中间Tab筛选
   * @param idx
   */
  selectTabIndex(e) {
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
      this.request.PageIndex = 1;
      this.getBillList();
    }
  }

  clickFeeItem(evt, fee: BillRequestResponse.BillModel, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();

    this.selectIndex = i;
    this.router.navigate(['fee', fee.ID], { relativeTo: this.route});
    this.slider.show(this, evt);
  }

  onPageChange(e) {
    this.request.PageIndex = Number(e.page);
    this.getBillList();
  }

  onFeeEdit(fee: BillRequestResponse.BillModel, e) {
    if (e.target.tagName.toLowerCase() === 'i') {
     this.application.frontLayer.openPopupWindow(CreateFeeComponent, '编辑收费单', PopupWindowSize.LARGE, 660, {'feeId': fee.ID}, false)
        .subscribe(t => {
          console.log('刷新列表了');
          this.getBillList();
        });
      e.stopPropagation();
    }
  }

  /**
   * 去收费
   * @param feeId
   * @param e
   */
  goCharge(feeId, e) {
    if (e.target.tagName.toLowerCase() === 'i') {
      this.application.frontLayer.openPopupWindow(ChargeComponent, '收费', PopupWindowSize.LARGE, 580, {'feeId': feeId}, false)
        .subscribe(t => {
          console.log('刷新列表了');
          this.getBillList();
        });
      e.stopPropagation();
    }
  }

  /**
   * 顶部搜索
   * @param e
   */
  onSearch(keyword) {
    this.request.KeyWords = keyword;
    this.getBillList();
  }

  /**
   * 高级筛选回调
   * @param e
   */
  onConditionChanged(data) {
    // console.log(data);
    this.request.DoctorCode = '';
    if (data.doctorList !== -1) {
      this.request.DoctorCode = this.doctorMap[data.doctorList].WorkerCode;
    }
    this.getBillList();
  }
  /**
   * 顶部的添加
   * @param e
   */
  onControl(e) {
    if (e === 0) {
      this.application.frontLayer.openPopupWindow(CreateFeeComponent, '新增收费单', PopupWindowSize.LARGE, 800, {}, false)
        .subscribe(t => {
          console.log('刷新列表了');
          this.getBillList();
        });
    }
  }

  /**
   * 控制展示隐藏高级筛选
   * @param e
   */
  onShowFilter(e) {
    this.dataFilterComponent.changeStatus(e);
  }

}
