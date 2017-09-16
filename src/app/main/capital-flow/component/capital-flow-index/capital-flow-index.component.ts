import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {CustomizeSliderService} from 'app/core/service/customize-slider.service';
import {CapitalFlowTransferComponent} from '../capital-flow-transfer/capital-flow-transfer.component';
import {AccountService} from '../../../../core/service/account.service';
import {
  GetCashFlowListResponse,
  GetCashFlowStatisticsResponse,
  GetCashFlowListRequest, GetCashFlowStatisticsRequest
} from '../../../../core/messages/capital-cashier-request-response';
import {CapitalFlowCount, CapitalFlowList} from '../../../../core/messages/mocks/capital-cashier-mock';
import {ApplicationService} from 'app/core/service/application.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {HospitalAccountFull} from '../../../../core/messages/hospital-account-request-response';
import {IQiezziCenterHeaderComponent} from 'app/shared/component/qiezzi-center-header/qiezzi-center-header.component';

@Component({
  selector: 'app-capital-flow-index',
  templateUrl: './capital-flow-index.component.html',
  styleUrls: ['./capital-flow-index.component.scss'],
  viewProviders: [AccountService]
})
export class CapitalFlowIndexComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  moduleName = '资金流水'; //  设置页头名称
  displayStatus = ''; // 隐藏侧滑框
  centerLoadReady = true; // 左侧列表滚动条显示
  centerRightLoadReady = true; // 中间滚动条显示
  isBorder: boolean; // 顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  mainShowLoadingLift: string; // 左侧loading
  mainShowLoadingRight: string; // 右侧loading
  showEmptyState = false; // 初始化时，空数据提示不显示
  showEmptyStateAccount = false; // 初始化时，账号列表空数据提示不显示
  showOrHide: any = {}; // 初始化时，默认分页控件不显示
  selectIndex: number; // 账号序号,标记选中状态
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'}; // 滚动条设置
  scrollbarOptionsRight = {axis: 'y', theme: 'minimal-dark'}; // 右侧滚动条设置
  AccountList: Array<HospitalAccountFull>; // 账号列表
  totalBalance = 0; // 总资产
  flowIndex: number; // 流水列表序号，标记选中的状态
  /*
   * 定义服务器返回数据
   * */
  FlowList: GetCashFlowListResponse = null; // 流水列表响应
  requestData: GetCashFlowListRequest = new GetCashFlowListRequest(); // 流水列表请求
  getCashFlowStatisticsRequest: GetCashFlowStatisticsRequest = new GetCashFlowStatisticsRequest();// 流水统计请求
  Count: GetCashFlowStatisticsResponse; // 流水统计
  constructor(private router: Router,
              private route: ActivatedRoute,
              public el: ElementRef,
              private accountService: AccountService,
              private slider: CustomizeSliderService,
              private application: ApplicationService) {
  }

  ngOnInit() {
    this.requestData = new GetCashFlowListRequest();
    this.getAccountList(); // 加载账户列表
    this.getFlowList();   // 页面加载完成时，加载流水列表
    this.getCapitalFlowCount(); // 加载流水统计
  }

  ngAfterViewInit(): void {
    this.mainShowLoadingLift = 'show';
    this.mainShowLoadingRight = 'show';
  }
  /*
  * TODO 加载账户列表  loading
  * */
  getAccountLoadingList() {
    this.mainShowLoadingLift = 'show';
    this.getAccountList();
  }
  /*
   * TODO 加载  账户列表
   * */
  getAccountList() {
    this.accountService.getCapitalFlowAccount({IncludeAdvanceAccount: 0}).subscribe(val => {
      this.mainShowLoadingLift = 'hide';
      if (!val || val.length === 0) {
        this.showEmptyStateAccount = true; // 显示空数据状态
      } else {
        this.AccountList = val;
        this.totalBalance = 0; // 初始化时，置为0
        this.AccountList.forEach(value => { // 账户金额叠加
          this.totalBalance += value.Balance;
        });
      }
    }, error => {
      this.mainShowLoadingLift = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }

  /*
   * TODO 点击账号列表，加载  流水列表
   * */
  clickAccountItem(evt, ID, i) {
    if (evt.currentTarget.className.indexOf('capital-flow-content-left-list-item') > -1) {
      evt.stopPropagation();
    }
    this.selectIndex = i; // 第i项变为选中状态
    this.requestData.accountID = ID; // 不确定是doctorID  还是 accountID
    this.getCashFlowStatisticsRequest.accountID = ID;
    this.flowIndex = -1;
    this.router.navigate(['../'], {relativeTo: this.route});
    this.slider.show(this, evt);
    this.getFlowListLoading();
    this.getCapitalFlowCount();
  }
  /*
  * TODO 加载流水列表  loading
  * */
  getFlowListLoading() {
    this.mainShowLoadingRight = 'show';
    this.getFlowList();
  }
  /*
   * TODO 获取流水列表
   * */
  getFlowList() {
    if (this.FlowList) {
      this.FlowList['Items'] = [];
      this.FlowList['TotalItems'] = 0; // 隐藏分页
    }
    this.accountService.getCapitalFlowList(this.requestData).subscribe(val => {
      this.mainShowLoadingRight = 'hide';
      if (!val || val.Items.length === 0) {
        this.showEmptyState = true; // 显示空数据状态
        this.showOrHide = false;
      } else {
        this.centerLoadReady = true; // 加载滚动条
        this.FlowList = val; // 渲染数据
      }
    }, error => {
      this.mainShowLoadingRight = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }

  /*
  * TODO 请求统计数据
  * */
  getCapitalFlowCount() {
    this.accountService.getCapitalFlowCount(this.getCashFlowStatisticsRequest).subscribe(val => {
      if (val) {
        this.Count = val; // 渲染数据
      }
    });
  }
  /*
   * TODO clickFlowItem方法，加载详情  侧滑
   * */
  clickFlowItem(evt, checkId, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.flowIndex = i; // 第i项变为选中状态
    this.router.navigate(['detail', checkId], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  /*
   * TODO 转账功能，transfer方法调用弹框模块
   * */
  openPopupWindow(evt) {
    this.application.frontLayer.openPopupWindow(CapitalFlowTransferComponent, '转账', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {
      if (t && t.data) {
        this.getAccountLoadingList();
      }
    });
  }

  /*
   * TODO 点击分页控件，触发onPageChange方法
   * TODO 获取当前页码
   * TODO 请求服务器，获取当前页的数据列表
   * */
  onPageChange(e) {
    this.requestData.pageIndex = Number(e.page);
    this.getFlowListLoading();
    this.getCapitalFlowCount();
  }

  /**
   * TODO 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.requestData.beginTime = evt.beginTime;
      this.requestData.endTime = evt.endTime;
      this.getCashFlowStatisticsRequest.beginTime = evt.beginTime;
      this.getCashFlowStatisticsRequest.endTime = evt.endTime;
      this.getFlowListLoading();
      this.getCapitalFlowCount();
    }
  }

  onControlClick(evt) {
  }

  onSearch(evt) {
  }

  onOptions(evt) {
  }

  onShowFilter(evt) {
  }

  onControl(evt) {}
}
