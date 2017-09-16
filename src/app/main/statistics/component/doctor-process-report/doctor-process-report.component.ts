import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  PersonProcessRequest,
  PersonProcessResponse
} from '../../../../core/messages/statistics-request-response';
import {
  GetListRequest,
  GetListWorkerFullResponse, WorkerListRequest, WorkerListResponse
} from '../../../../core/messages/worker-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";
import {WorkerService} from "../../../../core/service/worker.service";
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'app-doctor-process-report',
  templateUrl: './doctor-process-report.component.html',
  styleUrls: ['./doctor-process-report.component.scss']
})
export class DoctorProcessReportComponent implements OnInit,AfterViewInit {
  // 参数声明
  requestData: PersonProcessRequest;         //请求数据
  doctorProcessResponse: PersonProcessResponse; // 请求响应数据
  doctorListRequest: WorkerListRequest = new WorkerListRequest();   //获取医生列表请求数据
  doctorListResponse: WorkerListResponse; //医生列表相应数据
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
  // doctorList:any[]=[{label:'张三',value:'0'},{label:'李四',value:'1'},{label:'麻子',value:'2'}];  //下拉框医生选项
  doctorList: any[] = []; //下拉框医生选项
  renderBy: number = 0; //0费用趋势  1件数趋势渲染,默认为0,费用趋势渲染

  // echarts参数配置
  xData: any[] = [];
  yData: any[] = [];
  yData2: any[] = [];

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
    this.doctorProcessResponse = new PersonProcessResponse();
    this.requestData = new PersonProcessRequest();
    this.requestData.groupByDayOrMonth = 0; //0.按日分组 1.按月分组，不得为空
    // this.requestData.doctorID = 0; //医生ID
    //获取doctorID
    let userInfo = this.cookieService.getObject('currentWorker');
    this.requestData.doctorID=userInfo['WorkerID']; //doctorID
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';

    this.getDoctorProcess();
    this.getDoctorList();
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

  /**
   * 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.requestData.beginTime = evt.beginTime;
      this.requestData.endTime = evt.endTime;
      this.getDoctorProcess(this.renderBy);
    }
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

  clickRenderBy(num?: number) {
    this.renderBy = num;
    this.getDoctorProcess(this.renderBy);
  }

  /**
   * 下拉框选择
   */
  onChangeDoctor(event: any) {
    // this.requestData.doctorID = event.value;
    // console.log(event);
    this.requestData.doctorID = this.doctorList[event].value;
    this.getDoctorProcess(this.renderBy);
  }

  /**
   * 画饼形图
   * @param dom
   * @param xData
   * @param yData
   */
  drowBarEcharts(dom, xData, yData) {
    let option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {  // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
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
        axisTick: {
          alignWithLabel: true
        },
        boundaryGap: true,
        data: xData
      },
      yAxis: {
        type: 'value',
      },

      toolbox: {
        feature: {
          // saveAsImage: {}    //右上角保存图片
        }
      },
      series: [
        {
          name: '件数',
          type: 'bar',
          barWidth: '40%',
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
   * 获取医生列表
   * @param doctorListRequest
   */
  getDoctorList() {
    this.doctorListRequest.WorkerType = 0;
    this.workerService.getWorkerList(this.doctorListRequest).subscribe(val => {
      this.doctorListResponse = val;
      if (val) {  //数据存在
        val.Items.forEach(value => {
          // [{label:'张三',value:'0'},{label:'李四',value:'1'},{label:'麻子',value:'2'}];  //下拉框医生选项
          this.doctorList.push({label: value.WorkerName, value: value.WorkerId});
        });
        console.log(this.doctorList);
      }
      else { //数据不存在

      }
    });
  }

  /**
   * 医生外加工统计
   */
  getDoctorProcess(renderBy?: number) {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsPersonProcess(this.requestData).subscribe(val => {

      this.doctorProcessResponse = val;
      let xData: any[] = [];
      let yData: any[] = [];
      let yData2: any[] = [];
      // 获取dom,渲染echarts
      let dom = this.el.nativeElement.querySelector('#ec-main');
      // 数据存在情况
      if (val) { // or  val && val.length
        val.Items.forEach((value) => {
          let date = new Date(value.Date).getDate() + '日';
          // let doctorName = value.DoctorName;
          let num = value.Num;
          let price = value.Price;
          xData.push(date);
          yData.push(num);
          yData2.push(price);
        });
        //隐藏dataLoading
        this.dataLoading = 'hide';
        //echarts画柱状图
        if (renderBy === 0) { //0费用趋势
          this.drowBarEcharts(dom, xData, yData2);
        }
        else if (renderBy === 1) {  //1 件数趋势渲染
          this.drowBarEcharts(dom, xData, yData);
        } else {  //默认为0,费用趋势
          this.drowBarEcharts(dom, xData, yData2);
        }
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
