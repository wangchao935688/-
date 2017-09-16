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
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit, AfterViewInit {
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
  // echarts参数配置
  xData: any[] = [];
  yData: any[] = [];

  /*日期*/
  /*defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'}
  };
  @Output()
  onSelectLeft = new EventEmitter();*/



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

    this.getAttendanceReport();
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
  /**
   * 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.requestData.beginTime = evt.beginTime;
      this.requestData.endTime = evt.endTime;
      this.getAttendanceReport()
    }
  }
  // 日期
  /*onSelectDate(evt: any) {
    if (evt === 0) {
      this.onSelectLeft.emit();
    }
  }
  onDate(evt: any) {
    if (evt.index === 0) {
      this.onSelectLeft.emit(evt.date);
      this.options.rightOptions = Object.assign({}, this.options.rightOptions, {minDate: new Date(evt.date)});
    }
  }*/

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
  getAttendanceReport() {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsMainIncome(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.mainIncomeResponse = val;
      // 数据存在情况
      if (val) { // or  val && val.length
        val.Items.forEach((value, index, arr) => {
          let date = new Date(value.Date).getDate() + '日';
          let inflowMoney = value.Inflow;
          this.xData.push(date);
          this.yData.push(inflowMoney);
          // 获取dom,渲染echarts
          let dom = this.el.nativeElement.querySelector('#ec-main');
          console.log(val);
          // console.log("伪造的xData", this.xData);
          // console.log("伪造的yData", this.yData);
          //画折线图
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
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.xData
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
                name: 'line',
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
                data: this.yData
              }
            ]
          };
          let myEchart = init(dom);
          let options: any = option as EChartOption;
          myEchart.setOption(options);
        });
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
