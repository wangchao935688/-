import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  PersonWorkloadRequest,
  PersonWorkloadResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {
  WorkerListRequest,
  WorkerListResponse
} from '../../../../core/messages/worker-request-response';
import {WorkerService} from "../../../../core/service/worker.service";
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-workload-doctor-report',
  templateUrl: './workload-doctor-report.component.html',
  styleUrls: ['./workload-doctor-report.component.scss']
})
export class WorkloadDoctorReportComponent implements OnInit,AfterViewInit {
  // 参数声明
  requestData: PersonWorkloadRequest;         //请求数据
  personWorkloadResponse: PersonWorkloadResponse; // 请求响应数据
  doctorListRequest: WorkerListRequest = new WorkerListRequest();   //获取医生列表请求数据
  doctorListResponse: WorkerListResponse; //医生列表相应数据
  doctorList: any[] = []; //下拉框医生选项
  showEmptyState = false;
  displayStatus = '';
  mainShowLoading = 'hide'; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;

  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  radioSelectValue = [];// 暂时的属性,下拉框
  renderBy: number = 0; //0费用趋势  1件数趋势渲染,默认为0,费用趋势渲染


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
              private workerService: WorkerService,
              private application: ApplicationService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.personWorkloadResponse = new PersonWorkloadResponse();
    this.requestData = new PersonWorkloadRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组 必填
    //获取doctorID
    let userInfo = this.cookieService.getObject('currentWorker');
    this.requestData.doctorID=userInfo['WorkerID']; //doctorID
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';
    this.requestData.isIncludeType = true; //是否包含类别列表 必填 web true app false
    this.getDoctorWorkload();
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
      this.getDoctorWorkload();
    }
  }
  /**
   * 下拉框选择
   */
  onChange(event) {
    /*switch (event) {
     case -1: this.requestData.OrderBy = 8; break;
     case 1: this.requestData.OrderBy = 2; break;
     case 2: this.requestData.OrderBy = 12; break;
     case 3: this.requestData.OrderBy = 13; break;
     }
     this.getPatientList();*/
    this.requestData.doctorID = this.doctorList[event].value;
    this.getDoctorWorkload(this.renderBy);
  }
  /**
   * 点击切换渲染排序
   * @param num
   */
  clickRenderBy(num?: number) {
    this.renderBy = num;
    this.getDoctorWorkload(this.renderBy);
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
   * 医生个人工作量
   */
  getDoctorWorkload(renderBy?: number) {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsPersonWorkload(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.personWorkloadResponse = val;
      // echarts参数配置
      let xData: any[] = [];
      let yData: any[] = [];
      let yData2: any[] = [];
      // 获取dom,渲染echarts
      let dom = this.el.nativeElement.querySelector('#ec-main');
      // 数据存在情况
      if (val) { // or  val && val.length
        if(renderBy===1){ //0收费趋势  1类别趋势渲染,默认为0,收费趋势渲染
          val.Items.forEach((value) => {
            let date = new Date(value.Date).getDate() + '日';
            // let doctorName = value.DoctorName;
            let totalPrice = value.TotalPrice;
            // let num = value.Num;
            xData.push(date);
            yData.push(totalPrice);
            // yData2.push(price);
          });
        }
        else{
          val.TypeList.forEach((value) => {
            let date = new Date(value.Date).getDate() + '日';
            // let doctorName = value.DoctorName;
            let totalPrice = value.TotalPrice;
            // let num = value.Num;
            xData.push(date);
            yData.push(totalPrice);
            // yData2.push(price);
          });
        }

        // 画折线图
        this.drowSingleLineEcharts(dom, xData, yData);
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
