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
  selector: 'app-outpatient-booking-loss-report',
  templateUrl: './outpatient-booking-loss-report.component.html',
  styleUrls: ['./outpatient-booking-loss-report.component.scss']
})
export class OutpatientBookingLossReportComponent implements OnInit, AfterViewInit {
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

    this.getBookingLoss();
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
      this.getBookingLoss();
    }
  }
  /**
   * 画饼形图
   * @param dom
   * @param legendData  图例数据
   * @param data   饼形图数据
   */
  drowPieEcharts(dom,legendData,data) {
    let option = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        x: 'center',
        y:'bottom',
        data: legendData
      },
      series : [
        {
          name: '',
          type: 'pie',
          radius : '75%',
          center: ['45%', '45%'],
          data:data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    let myEchart = init(dom);
    let options: any = option as EChartOption;
    myEchart.setOption(options);
  }

  /**
   * 获取预约流失数据
   */
  getBookingLoss(){
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsClinic(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.clinicResponse = val;
      // console.log(1111,val);
      // 数据存在情况
      if (val) { // or  val && val.length
        //预约流失  BookingCancelList
        let bookingLossDom = this.el.nativeElement.querySelector('#bookingLoss');  //预约流失dom
        let bookingLossLegendData = []; //预约流失图例数据
        let bookingLossData = []; //预约流失数据
        val.BookingCancelList.forEach((value) => {
          bookingLossLegendData.push(value.Name);
          bookingLossData.push({value:value.Num,name:value.Name});
        });
        this.drowPieEcharts(bookingLossDom,bookingLossLegendData, bookingLossData);//渲染预约流失

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
