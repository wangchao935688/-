import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  ProfitRequest,
  ProfitResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";


@Component({
  selector: 'app-profit-report',
  templateUrl: './profit-report.component.html',
  styleUrls: ['./profit-report.component.scss']
})
export class ProfitReportComponent implements OnInit, AfterViewInit {
  // 参数声明
  requestData: ProfitRequest;         //请求数据
  profitResponse: ProfitResponse; // 利润 请求响应数据
  showEmptyState = false;
  displayStatus = '';
  mainShowLoading = 'hide'; // 全局加载框初始化隐藏
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




  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private statisticsService: StatisticsService,
              private application: ApplicationService,) {
  }

  ngOnInit() {
    this.profitResponse = new ProfitResponse();
    this.requestData = new ProfitRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组，不得为空
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';

    this.getProfit();
  }

  /**
   * 顶部头函数
   */
  onControl(event) {

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
      this.getProfit();
    }
  }
  /**
   * 画2条折线图
   * 传入dom,xDate,yDate,yDate2
   */
  drowDoubleLineEcharts(dom, xData, yData,yData2){
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
        top: '3%',
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
          itemStyle: {
            normal: {
              lineStyle: {
                color: 'red'
              }
            }
          },
          data: yData
        },
        {
          name: '支出',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: 'blue'
              }
            }
          },
          data: yData2
        }
      ]
    };
    let myEchart = init(dom);
    let options: any = option as EChartOption;
    myEchart.setOption(options);
  }

  /**
   * 获取利润
   */
  getProfit() {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsProfit(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.profitResponse = val;
      //设置参数
      let xData: any[] = [];
      let yData: any[] = [];  //收入
      let yData2: any[] = []; //支出
      // 获取dom,渲染echarts
      let dom = this.el.nativeElement.querySelector('#ec-main');
      // 数据存在情况
      if (val) { // or  val && val.length
        val.Items.forEach((value, index, arr) => {
          let date = new Date(value.Date).getDate() + '日';
          let sumMoney = value.Sum;
          let inflow = value.Inflow;
          let outflow = value.Outflow;
          xData.push(date);
          yData.push(inflow);
          yData2.push(outflow);
        });
        this.drowDoubleLineEcharts(dom, xData, yData,yData2)
      } else {
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
