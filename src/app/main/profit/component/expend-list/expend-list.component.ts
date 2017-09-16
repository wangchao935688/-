import {Component, OnInit, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ProfitService} from "../../../../core/service/profit.service";
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";
import {
  AccountChangeRecordGetProfitListRequest,
  AccountChangeRecordGetProfitListResponse,
  AccountChangeRecordGetProfitStatisticsResponse,
  AccountChangeRecordGetProfitStatisticsRequest
} from "../../../../core/messages/profit-request-response";
import {DailyExpenseService} from "../../../../core/service/daily-expense.service";
import {GetTypeListResponse} from "../../../../core/messages/income-and-expenses-request-response";
import {CustomizeSliderService, ICustomizeSlider} from "../../../../core/service/customize-slider.service";
@Component({
  selector: 'expend-list',
  templateUrl: './expend-list.component.html',
  styleUrls: ['./expend-list.component.scss']
})
export class ExpendListComponent implements OnInit,ICustomizeSlider {
  displayStatus: string;

  moduleName: string = '利润';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  selectIndex: number;

  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;

  requestData: AccountChangeRecordGetProfitListRequest;

  responseData: AccountChangeRecordGetProfitListResponse;

  statisticsRequest: AccountChangeRecordGetProfitStatisticsRequest;
  statisticsResponse: AccountChangeRecordGetProfitStatisticsResponse;

  showData: boolean;

  filterConfig: any = {
    time: {title: '收费时间', type: 'time'},
    operator: {title: '类别'},
  }

  operator: GetTypeListResponse[];

  centerRouterLoading: string = 'hide';

  constructor(private route: ActivatedRoute, private router: Router, private slider: CustomizeSliderService, private profitService: ProfitService, private dailyExpenseService: DailyExpenseService) {
  }

  ngOnInit() {
    this.requestData = new AccountChangeRecordGetProfitListRequest();
    this.responseData = new AccountChangeRecordGetProfitListResponse();
    this.requestData.InflowOrOutflow = 1;
    this.requestData.MainOrOther = 1;
    this.requestData.OtherType = '';
    this.requestData.beginTime = '';
    this.requestData.endTime = '';
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    this.statisticsRequest = new AccountChangeRecordGetProfitStatisticsRequest();
    this.statisticsResponse = new AccountChangeRecordGetProfitStatisticsResponse();
    this.statisticsRequest.inflowOrOutflow = 1;
    this.statisticsRequest.mainOrOther = '';
    this.statisticsRequest.otherType = '';
    this.route.params.subscribe(val => {
      this.requestData.beginTime = val.beginTime;
      this.requestData.endTime = val.endTime;
      this.statisticsRequest.beginTime = val.beginTime;
      this.statisticsRequest.endTime = val.endTime;
      this.search();
    })
    this.search();


    this.dailyExpenseService.getExpenseTypeList({type: 1}).subscribe(val => {
      let data: string[] = [];
      this.operator = val;
      val.forEach(item => {
        data.push(item.TypeName);
      })
      this.filterConfig.operator = {title: '类别', type: 'list', data: data};
    });
  }

  search() {
    this.showData = false;
    this.responseData = new AccountChangeRecordGetProfitListResponse();
    this.centerRouterLoading = 'show';
    this.profitService.getAccountChangeRecordGetProfitList(this.requestData).subscribe(val => {
      this.centerRouterLoading = 'hide';
      this.showData = true;
      this.responseData = val;
    }, err => {
      this.centerRouterLoading = 'hide';
      this.showData = true;
    });

    this.profitService.getAccountChangeRecordGetProfitStatistics(this.statisticsRequest).subscribe(val => {
      this.statisticsResponse = val;
    });
  }

  jump() {
    this.router.navigate(['profit']);
  }

  onShowFilter(stat) {
    this.dataFilterComponent.changeStatus(stat);
  }

  onConditionChanged(evt: any) {
    this.requestData.OtherType = evt.operator;
    // this.requestData.
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    this.search();
  }

  /**
   * 分页改变
   * @param evt
   */
  pageChange(evt: any) {
    this.requestData.pageIndex = evt.page;
    this.requestData.pageSize = evt.rows;
    this.search();
    /*if (this.responseData) {
     this.responseData.TotalItems = 0;
     }
     this.showEmpty = false;
     this.centerRouterLoading.show();
     this.searchProcessList();*/
  }

  /**
   * 打开详情
   * @param id
   */
  openDetail(evt: any, id: string, i: number) {
    // this.router.navigate(['process'], {queryParams: {'Id': id}, relativeTo: this.route});
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.selectIndex = i;
    this.router.navigate(['expend-detail'], {queryParams: {id: id}, relativeTo: this.route});
    this.slider.show(this, evt);
  }

}
