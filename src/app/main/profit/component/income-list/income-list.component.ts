import {Component, ViewChild, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";
import {ProfitService} from "../../../../core/service/profit.service";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
import {
  AccountChangeRecordGetProfitListRequest,
  AccountChangeRecordGetProfitListResponse, AccountChangeRecordGetProfitStatisticsRequest,
  AccountChangeRecordGetProfitStatisticsResponse
} from "../../../../core/messages/profit-request-response";
import {CustomizeSliderService, ICustomizeSlider} from "../../../../core/service/customize-slider.service";
@Component({
  selector: 'income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit, ICustomizeSlider {
  displayStatus: string;

  moduleName: string = '利润';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  selectIndex: number;

  requestData: AccountChangeRecordGetProfitListRequest;

  responseData: AccountChangeRecordGetProfitListResponse;

  showData: boolean;

  statisticsRequest: AccountChangeRecordGetProfitStatisticsRequest;
  statisticsResponse: AccountChangeRecordGetProfitStatisticsResponse;

  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;

  centerRouterLoading: string = 'show';

  filterConfig: any = {
    time: {title: '收费时间', type: 'time'},
    operator: {title: '类别', type: 'list', data: ['主营收入', '日常收入']},
  };

  constructor(private route: ActivatedRoute, private router: Router, private slider: CustomizeSliderService, private profitService: ProfitService, private mScrollbarService: MalihuScrollbarService) {

  }

  ngOnInit() {
    this.centerRouterLoading = 'show';
    this.requestData = new AccountChangeRecordGetProfitListRequest();
    this.responseData = new AccountChangeRecordGetProfitListResponse();
    this.requestData.InflowOrOutflow = 0;
    this.requestData.MainOrOther = '';
    this.requestData.OtherType = '';
    this.requestData.beginTime = '';
    this.requestData.endTime = '';
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    this.statisticsRequest = new AccountChangeRecordGetProfitStatisticsRequest();
    this.statisticsResponse = new AccountChangeRecordGetProfitStatisticsResponse();
    this.statisticsRequest.inflowOrOutflow = 0;
    this.statisticsRequest.otherType = '';
    this.route.params.subscribe((val:any) => {
      this.requestData.beginTime = val.beginTime;
      this.requestData.endTime = val.endTime;
      this.statisticsRequest.beginTime = val.beginTime;
      this.statisticsRequest.endTime = val.endTime;
      this.search();
    })
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
    this.mScrollbarService.destroy('#appCenterContent');
    this.router.navigate(['profit']);
  }

  onShowFilter(stat) {
    this.dataFilterComponent.changeStatus(stat);
  }

  onConditionChanged(evt: any) {
    if (evt.operator > -1) {
      this.requestData.MainOrOther = evt.operator;
      this.statisticsRequest.mainOrOther = evt.operator;
    } else {
      this.requestData.MainOrOther = '';
    }
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
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.selectIndex = i;
    this.router.navigate(['income-detail'], {queryParams: {id: id}, relativeTo: this.route});
    this.slider.show(this, evt);
  }
}
