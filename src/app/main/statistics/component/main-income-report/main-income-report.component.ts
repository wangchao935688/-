import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  MainIncomeRequest,
  MainIncomeResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";


@Component({
  selector: 'app-main-income-report',
  templateUrl: './main-income-report.component.html',
  styleUrls: ['./main-income-report.component.scss']
})
export class MainIncomeReportComponent implements OnInit, AfterViewInit {
  // 参数声明
  requestData: MainIncomeRequest;         //请求数据
  mainIncomeResponse: MainIncomeResponse; // 请求响应数据
  showEmptyState= false;
  displayStatus = '';
  mainShowLoading= 'hide'; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;

  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  /*日期*/
  defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'}
  };
  @Output()
  onSelectLeft = new EventEmitter();



  /*jsj: MainIncomeResponse = {
   "TotalInflow": 1.0,
   "TotalOutflow": 2.0,
   "TotalSum": 3.0,
   "Items": [
   {
   "Date": "2017-05-01T14:45:32.458878+08:00",
   "Inflow": 4.0,
   "Outflow": 5.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-02T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-03T14:45:32.458878+08:00",
   "Inflow": 7.0,
   "Outflow": 3.0,
   "Sum": 11.0
   },
   {
   "Date": "2017-05-04T14:45:32.458878+08:00",
   "Inflow": 9.0,
   "Outflow": 1.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-05T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 23.0,
   "Sum": 24.0
   },
   {
   "Date": "2017-05-06T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 13.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-07T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 23.0,
   "Sum": 24.0
   },
   {
   "Date": "2017-05-08T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-09T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-10T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-11T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-12T14:45:32.458878+08:00",
   "Inflow": 20.0,
   "Outflow": 3.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-13T14:45:32.458878+08:00",
   "Inflow": 2.0,
   "Outflow": 13.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-14T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 31.0,
   "Sum": 4.0
   },
   {
   "Date": "2017-05-15T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 13.0,
   "Sum": 34.0
   },
   {
   "Date": "2017-05-16T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 23.0,
   "Sum": 42.0
   },
   {
   "Date": "2017-05-17T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 13.0,
   "Sum": 44.0
   },
   {
   "Date": "2017-05-18T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 13.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-19T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 23.0,
   "Sum": 34.0
   },
   {
   "Date": "2017-05-20T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 13.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-21T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 23.0,
   "Sum": 34.0
   },
   {
   "Date": "2017-05-22T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 13.0,
   "Sum": 24.0
   },
   {
   "Date": "2017-05-23T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 13.0,
   "Sum": 34.0
   },
   {
   "Date": "2017-05-24T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 31.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-25T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 32.0,
   "Sum": 24.0
   },
   {
   "Date": "2017-05-26T14:45:32.458878+08:00",
   "Inflow": 32.0,
   "Outflow": 13.0,
   "Sum": 34.0
   },
   {
   "Date": "2017-05-27T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 32.0,
   "Sum": 43.0
   }, {
   "Date": "2017-05-28T14:45:32.458878+08:00",
   "Inflow": 23.0,
   "Outflow": 23.0,
   "Sum": 24.0
   },
   {
   "Date": "2017-05-29T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 13.0,
   "Sum": 42.0
   },
   {
   "Date": "2017-05-30T14:45:32.458878+08:00",
   "Inflow": 12.0,
   "Outflow": 23.0,
   "Sum": 14.0
   },
   {
   "Date": "2017-05-31T14:45:32.458878+08:00",
   "Inflow": 22.0,
   "Outflow": 63.0,
   "Sum": 41.0
   }
   ]
   };*/

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private statisticsService: StatisticsService,
              private application: ApplicationService,) {
  }

  ngOnInit() {
    this.mainIncomeResponse = new MainIncomeResponse();
    this.requestData = new MainIncomeRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组，不得为空
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';

    this.getMainIncome();
  }

  /**
   * 顶部头函数
   */
  onControl(event){

  }
  onSearch(event) {

  }

  onOptions(event) {

  }

  onShowFilter(event) {

  }

  /**
   * 获取本周
   */
  getCurrWeek() {

  }
  // 日期
  onSelectDate(evt: any) {
    if (evt === 0) {
      this.onSelectLeft.emit();
    }
  }
  onDate(evt: any) {
    if (evt.index === 0) {
      this.onSelectLeft.emit(evt.date);
      this.options.rightOptions = Object.assign({}, this.options.rightOptions, {minDate: new Date(evt.date)});
    }
  }
  /**
   * 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.requestData.beginTime = evt.beginTime;
      this.requestData.endTime = evt.endTime;
      this.getMainIncome();
    }
  }
  /**
   * 画单条折线图
   * 传入dom,xDate,yDate,
   */
  drowSingleLineEcharts(dom, xData, yData) {
    let option = {
      title: {
        text: '',  //类似标题
        subtext: '',        //标题下面的小标题
        sublink: '',        //小标题的链接,例如 https://github.com/ecomfe/echarts-stat
        left: 'center'      //水平居左中右
      },
      tooltip: {
        trigger: 'axis',
        /*axisPointer: {
         type: 'cross'
         }*/
      },
      grid: {
        top:'3%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        type: 'value',
      },

      toolbox: {
        feature: {
          // saveAsImage: {}
        }
      },
      series: [
        {
          name: '收入',
          type: 'line',
          label: {
            emphasis: {
              show: true,
              position: 'left',
              textStyle: {
                color: 'blue',
                fontSize: 16
              }
            }
          },
          data: yData
        }
      ]
    };
    let myEchart = init(dom);
    let options: any = option as EChartOption;
    myEchart.setOption(options);
  }
  /**
   *
   this.dataLoading = 'show';
   this.workerService.getWorkerDetail({Id: Id}).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val) { // or  val && val.length
       // 赋值
      }else {
          // 状态为空数据
      }
    }, error => {
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
   */

  /**
   * 获取主营收入
   */
  getMainIncome() {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsMainIncome(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.mainIncomeResponse = val;
      // echarts参数配置
      let xData: any[] = [];
      let yData: any[] = [];
      // 获取dom,渲染echarts
      let dom = this.el.nativeElement.querySelector('#ec-main');
      // 数据存在情况
      if (val) { // or  val && val.length
        val.Items.forEach((value, index, arr) => {
          let date = new Date(value.Date).getDate() + '日';
          let inflowMoney = value.Inflow;
          xData.push(date);
          yData.push(inflowMoney);
        });
        //画图
        this.drowSingleLineEcharts(dom, xData, yData);
      }else {
        // 状态为空数据
      }
    }, error => {
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }


  ngAfterViewInit(): void {
    // console.log('after执行');
  }


}
