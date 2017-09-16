import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  ClinicRequest,
  ClinicResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";


@Component({
  selector: 'app-outpatient-visit-report',
  templateUrl: './outpatient-visit-report.component.html',
  styleUrls: ['./outpatient-visit-report.component.scss']
})
export class OutpatientVisitReportComponent implements OnInit, AfterViewInit {
  // 参数声明
  requestData: ClinicRequest;         //请求数据
  clinicResponse: ClinicResponse; // 请求响应数据
  showEmptyState = false;
  displayStatus = '';
  mainShowLoading = 'hide'; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;

  //scrollbarOptions: any;  // 滚动条配置

  // echarts参数配置
  xData: any[] = [];
  yData: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private statisticsService: StatisticsService,
              private application: ApplicationService,) { }

  ngOnInit() {
    this.clinicResponse = new ClinicResponse();
    this.requestData = new ClinicRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组，不得为空
    this.requestData.beginTime = '2017-06-01';
    this.requestData.endTime = '2017-06-30';

    this.getOutpatientVisit();
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
      this.getOutpatientVisit();
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
          name: '人次',
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
   * 获取门诊统计--就诊人次
   */
  getOutpatientVisit(){
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsClinic(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.clinicResponse = val;
      // console.log(1111,val);
      // 数据存在情况
      if (val) { // or  val && val.length
        //就诊列表----就诊趋势----SeeDoctorList
        let allVisitDom = this.el.nativeElement.querySelector('#allVisit');  //就诊趋势dom
        let allVisitXData = []; //就诊趋势X
        let allVisitYData = []; //就诊趋势Y
        val.SeeDoctorList.forEach((value) => {
          let date = new Date(value.Date).getDate() + '日';  //日期
          let num = value.Num;    //人次
          allVisitXData.push(date);
          allVisitYData.push(num);
        });
        // console.log(2222,val);
        // console.log('x',allVisitXData);
        // console.log('y',allVisitYData);
        this.drowSingleLineEcharts(allVisitDom, allVisitXData, allVisitYData);//渲染就诊趋势
        //预约趋势  BookingList
        let bookingReportDom = this.el.nativeElement.querySelector('#bookingReport');  //就诊趋势dom
        let bookingReportXData = []; //预约趋势X
        let bookingReportYData = []; //预约趋势Y
        val.BookingList.forEach((value) => {
          let date = new Date(value.Date).getDate() + '日';  //日期
          let num = value.Num;    //人次
          bookingReportXData.push(date);
          bookingReportYData.push(num);
        });
        this.drowSingleLineEcharts(bookingReportDom, bookingReportXData, bookingReportYData);//渲染预约趋势

        //挂号趋势  PatlogList
        let registReportDom = this.el.nativeElement.querySelector('#registReport');  //挂号趋势dom
        let registReportXData = []; //挂号趋势X
        let registReportYData = []; //挂号趋势Y
        val.PatlogList.forEach((value) => {
          let date = new Date(value.Date).getDate() + '日';  //日期
          let num = value.Num;    //人次
          registReportXData.push(date);
          registReportYData.push(num);
        });
        this.drowSingleLineEcharts(registReportDom, registReportXData, registReportYData);//渲染挂号趋势
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
