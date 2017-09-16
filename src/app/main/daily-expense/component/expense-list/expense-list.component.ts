import {Component, AfterViewInit, OnInit, ElementRef, ViewChild} from '@angular/core';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateExpenseComponent} from '../create-expense/create-expense.component';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {
  GetListRequest, GetListResponse,
  GetTypeListRequest
} from '../../../../core/messages/income-and-expenses-request-response';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ApplicationService} from '../../../../core/service/application.service';

@Component({
  moduleId: 'module.id',
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.scss'],
})
export class ExpenseListComponent implements OnInit, AfterViewInit, ICustomizeSlider {
  /*
   * TODO 参数声明
   * */
  expenseList: GetListResponse; // 收支请求
  requestData: GetListRequest; // 收支列表
  getExpenseTypeListReq: GetTypeListRequest; // 类型请求
  getExpenseTypeListRes = []; // 返回类型列表
  expenseType: string;
  type = 0;
  typeID: string; // 选择收支类型
  beginTime: string; // 开始时间
  endTime: string; // 结束时间
  pageIndex= 1; // 开始页
  pageSize= 10; // 每页条数
/*
* 组件设置
* */
  isBorder = false;
  displayStatus = '';
  dataLoading = 'hide';
  mainDataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  moduleName = '日常收支';
  showEmptyState: boolean;
  selectIndex: number;
  tabData = {
    data: ['日常收入', '日常支出'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index.index);
    }
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private application: ApplicationService,
              private dailyExpenseService: DailyExpenseService,
              private slider: CustomizeSliderService) {
  }

  /**
   * 初始化因为是异步
   */
  ngOnInit() {
    this.mainDataLoading = 'hide';
    this.expenseList = new GetListResponse();
    this.requestData = new GetListRequest();
    this.getExpenseTypeListReq = new GetTypeListRequest();
    this.type = 0; // 请求日常收入
    this.getExpenseTypeLists(); // 请求数据类型
    this.getExpenseList();
  }

  ngAfterViewInit(): void {
    this.mainDataLoading = 'show';
  }

  /**
   * TODO 获取日常收支列表
   * @param requestData
   */
  getExpenseList(requestData?: GetListRequest) {
    this.dataLoading = 'show';
    this.requestData = {
      type: this.type,
      typeID: this.typeID,
      beginTime: this.beginTime,
      endTime: this.endTime,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.dailyExpenseService.GetExpenseList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      if (val && val.TotalItems !== 0) {
        this.expenseList = val;
      } else {
        // 空数据
        this.showEmptyState = true;
      }
    });
  }

  /**
   *  TODO 获取日常收支类型列表
   * @param getExpenseTypeListReq
   */
  getExpenseTypeLists() {
    this.getExpenseTypeListRes = [];
    this.getExpenseTypeListReq = {type: this.type};
    this.dailyExpenseService.getExpenseTypeList(this.getExpenseTypeListReq).subscribe(val => {
      if (val) {
        val.forEach((value) => {
          this.getExpenseTypeListRes.push({label: value.TypeName, value: value.ID});
        });
      }
    });
  }

  /*
   * TODO 选择收支类型
   * */
  onChange(index) {
    this.typeID = this.getExpenseTypeListRes[index].value;
  }

  /**
   * TODO tab切换使tab类型和收支列表 收支类型 切换
   * @param index
   */
  changeTab(index) {
    this.type = index.index;
    this.beginTime = null;
    this.endTime = null;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.getExpenseList();
    this.getExpenseTypeLists();
  }

  /**
   * TODO 分页
   * @param evt
   * @constructor
   */
  DailyExpensePageChange(evt: any) {
    this.pageIndex = evt.page + 1;
    this.pageSize = evt.rows;
    this.getExpenseList();
  }

  /**
   * TODO 新增弹窗
   * @param index
   */
  onControlClick(index) {
    if (index === 0) {
      this.application.frontLayer.openPopupWindow(CreateExpenseComponent, '新增日常收支', PopupWindowSize.MIDDLE, 680, null, false).subscribe(t => {
        if (t) {
          console.dir(t['data']);
          this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
          this.getExpenseList();
        }
      });
    }
  }

  clickFeeItem(evt, feeId, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.selectIndex = i;
    this.router.navigate(['expense'], {queryParams: {'feeId': feeId}, relativeTo: this.route});
    this.slider.show(this, evt);
  }

  onPageChange() {
  }

  onFeeEdit(feeId) {

  }

  typelist() {
    this.router.navigate(['../type-list'], {relativeTo: this.route});
  }

  selectLeft(evt) { // 左侧日历
    if (evt) {
      this.beginTime = evt;
    }
  }

  selectRight(evt) { // 右侧日历
    if (evt) {
      this.endTime = evt;
    }
  }

  searchProcessList() { // 点击查询
    this.getExpenseList();
  }
}
