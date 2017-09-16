import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {AccountService} from '../../../../core/service/account.service';
import {
  GetCashFlowListRequest, GetCashFlowListResponse,
  GetCashFlowStatisticsRequest, GetCashFlowStatisticsResponse,
} from '../../../../core/messages/capital-cashier-request-response';
import {ApplicationService} from 'app/core/service/application.service';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
@Component({
  selector: 'charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.scss'],
  viewProviders: [AccountService]
})
export class ChargeListComponent implements OnInit, AfterViewInit, ICustomizeSlider {



  showSearch: boolean = true;





  filterConfig: any = {
    'Time': {title: '时间', type: 'time'},
    'adminList': {
      title: '操作人',
      type: 'list',
      data: ['庄恕', '陆晨曦', '扬帆', '陈绍聪', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦']
    },
    'accountList': {
      title: '账户类别', type: 'list', data: ['现金', '支付宝', '微信']
    },
  };
  moduleName = '收银对账'; //  设置页头名称
  displayStatus = ''; // 隐藏侧滑框
  centerLoadReady = false; // 滚动条内部内容，默认隐藏，设置2秒后显示
  centerRightLoadReady = false; // 滚动条内部内容，默认隐藏，设置2秒后显示
  isBorder: boolean; // 顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;
  mainShowLoadingRight: string;
  @ViewChild('centerRouterLoading') // 设置加载状态提示框
  centerRouterLoading: QiezziLoadingComponent;
  @ViewChild('dataLoading') // 设置数据加载状态
  dataLoading: QiezziLoadingComponent;
  showEmptyState = false; // 初始化时，空数据提示不显示
  showEmptyStateAccount = false; // 初始化时，账号列表空数据提示不显示
  showOrHide: any = {}; // 初始化时，默认分页控件不显示
  selectIndex: number; // 账号序号,标记选中状态
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};// 滚动条设置
  scrollbarOptionsRight = {axis: 'y', theme: 'minimal-dark'};// 右侧滚动条设置
  /*
   * 定义请求
   */
  CountRequestData: GetCashFlowStatisticsRequest;
  /*
   * 定义服务器返回数据
   * */
  Count: GetCashFlowStatisticsResponse; // 流水统计
  FlowList: GetCashFlowListResponse; // 流水列表
  flowIndex: number; // 流水列表序号，标记选中的状态

  /*
   * 定义请求数据类型  ？？？？？
   * */
  // 账户ID，留空则不限
  accountID?: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string;
  // 查询的页码，留空则查询第一页
  pageIndex: number;
  // 查询的条数，留空则按默认
  pageSize: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public el: ElementRef,
              private AccountService: AccountService,
              private application: ApplicationService,
              private slider: CustomizeSliderService) {
  }

  onShowFilter(stat) {
    this.dataFilterComponent.changeStatus(stat);
  };

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /*
     * TODO 初始化加载全部流水列表
     * */
    this.application.workBoard = this.el.nativeElement; // 设置跳转
    this.centerRightLoadReady = true; // 中间滚动条显示
    this.beginTime = (new Date()).toLocaleDateString(); // 默认当前开始时间为当天
    this.endTime = (new Date()).toLocaleDateString();  // 默认当前结束时间为当天
    this.pageIndex = 1;  // 默认加载第一页
    this.pageSize = 10;  // 默认加载10条
    this.CountRequestData = new GetCashFlowStatisticsRequest;
    this.CountRequestData.beginTime = '';
    this.CountRequestData.endTime = '';
    this.getFlowList();   // 页面加载完成时，加载流水列表
    this.getCountList();  // 加载预存款统计
  }

  /*
   * TODO 请求服务器，获取流水列表
   * */
  getFlowList(requestData?: GetCashFlowListRequest) {
    this.mainShowLoadingRight = 'show';
    requestData = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      beginTime: this.beginTime,
      endTime: this.endTime
    };
    this.AccountService.getCapitalFlowList(requestData).subscribe(val => {
      setTimeout(() => {
        this.mainShowLoadingRight = 'hide';
      }, 2000);
      if (!val || val.Items.length === 0) {
        this.showEmptyStateAccount = true; // 显示空数据状态
        this.showOrHide = false;
      } else {
        this.centerLoadReady = true; // 加载滚动条
        console.log(val.Items);
        this.FlowList = val; // 渲染数据
      }
    });
  }


  /**
   * TODO 获取流水统计
   * @param CountRequestData
   * */
  getCountList() {
    console.log(this.CountRequestData);
    this.AccountService.getCapitalFlowCount(this.CountRequestData).subscribe(val => {
      this.Count = val;
      console.log(val);
    });
  }

  /*
   * TODO clickFlowItem方法，加载详情
   * */
  clickFeeItem(evt, outId: string, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    // this.selectIndex = i;
    // this.router. navigate (['check-detail'], {queryParams: {'feeId': fee}, relativeTo: this.route});
    // this.slider.show(this, evt);

    this.router.navigate(['check-detail', outId], {relativeTo: this.route});
    this.slider.show(this, evt);
  }


  /*
   * TODO 点击分页控件，触发onPageChange方法
   * TODO 获取当前页码
   * TODO 请求服务器，获取当前页的数据列表
   * */
  onPageChange(e) {
    this.pageIndex = Number(e.page);
    this.getFlowList();
    console.log(this.pageIndex);
  }

  /**
   * TODO 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.beginTime = evt.beginTime;
      this.endTime = evt.endTime;
      console.log(this.beginTime);
      console.log(this.endTime);
      this.getFlowList();
    }
  }

  onConditionChanged(evt: any) {
  };
}
