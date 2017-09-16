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
  selector: 'app-outpatient-report-index',
  templateUrl: './outpatient-report-index.component.html',
  styleUrls: ['./outpatient-report-index.component.scss']
})
export class OutpatientReportIndexComponent implements OnInit, AfterViewInit {
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
  scrollbarOptionsLeft1 = { // 初复诊左栏滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsLeft2 = { // 预约损失左栏滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsLeft3 = { // 挂号损失左栏滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsLeft4 = { // 患者来源左栏滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsLeft5 = { // 就诊事项左栏滚动条设置
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
    this.clinicResponse = new ClinicResponse();
    this.requestData = new ClinicRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组，不得为空
    this.requestData.beginTime = '2017-06-01';
    this.requestData.endTime = '2017-06-30';

    this.getOutpatientReport();
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
      this.getOutpatientReport();
    }
  }
  /**
   * 查询
   */
  search() {
    // this.centerRouterLoading = 'show';
    // this.profitService.getAccountChangeRecordGetProfitStatistics(this.requestData).subscribe(val => {
    //   this.centerRouterLoading = 'hide';
    //   this.responseData = val;
    // });
  }

  // 日期
  /* onSelectDate(evt: any) {
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
          radius : '55%',
          center: ['50%', '60%'],
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
   * 获取门诊统计--统计分析
   */
  getOutpatientReport() {
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
        //初复诊  VisitList
        let firstReturnDom = this.el.nativeElement.querySelector('#firstReturn');  //挂号趋势dom
        let firstLegendData = ['出诊数量','复诊数量']; //初复诊数据
        let firstReturnData = [{value:val.FirstVisitNumber,name:'出诊数量'},{value:val.ReturnVisitNumber,name:'复诊数量'}]; //初复诊数据
        /*val.VisitList.forEach((value) => {
          firstReturnData.push();
        });*/
        this.drowPieEcharts(firstReturnDom,firstLegendData, firstReturnData);//渲染挂号趋势

        //预约流失  BookingCancelList
        let bookingLossDom = this.el.nativeElement.querySelector('#bookingLoss');  //预约流失dom
        let bookingLossLegendData = []; //预约流失图例数据
        let bookingLossData = []; //预约流失数据
        val.BookingCancelList.forEach((value) => {
          bookingLossLegendData.push(value.Name);
          bookingLossData.push({value:value.Num,name:value.Name});
         });
        this.drowPieEcharts(bookingLossDom,bookingLossLegendData, bookingLossData);//渲染预约流失

        //挂号流失  BookingCancelList
        let registLossDom = this.el.nativeElement.querySelector('#registLoss');  //挂号流失dom
        let registLossLegendData = []; //挂号流失图例数据
        let registLossData = []; //挂号流失数据
        val.PatlogCancelList.forEach((value) => {
          registLossLegendData.push(value.Name);
          registLossData.push({value:value.Num,name:value.Name});
        });
        this.drowPieEcharts(registLossDom,registLossLegendData, registLossData);//渲染挂号流失

        //患者来源  BookingCancelList
        let patientSourceDom = this.el.nativeElement.querySelector('#patientSource');  //患者来源dom
        let patientSourceLegendData = []; //患者来源图例数据
        let patientSourceData = []; //患者来源数据
        val.PatientsWiteList.forEach((value) => {
          patientSourceLegendData.push(value.Name);
          patientSourceData.push({value:value.Num,name:value.Name});
        });
        this.drowPieEcharts(patientSourceDom,patientSourceLegendData, patientSourceData);//渲染患者来源

        //就诊事项  BookingCancelList
        let outpatientMatterDom = this.el.nativeElement.querySelector('#outpatientMatter');  //就诊事项dom
        let outpatientMatterLegendData = []; //就诊事项图例数据
        let outpatientMatterData = []; //就诊事项数据
        val.AimList.forEach((value) => {
          outpatientMatterLegendData.push(value.Name);
          outpatientMatterData.push({value:value.Num,name:value.Name});
        });
        this.drowPieEcharts(outpatientMatterDom,outpatientMatterLegendData, outpatientMatterData);//渲染就诊事项



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
