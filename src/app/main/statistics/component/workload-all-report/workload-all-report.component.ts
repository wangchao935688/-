import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  AllWorkloadRequest,
  AllWorkloadResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";


@Component({
  selector: 'app-workload-all-report',
  templateUrl: './workload-all-report.component.html',
  styleUrls: ['./workload-all-report.component.scss']
})
export class WorkloadAllReportComponent implements OnInit,AfterViewInit {
  // 参数声明
  requestData: AllWorkloadRequest;         //请求数据
  allWorkloadResponse: AllWorkloadResponse; // 请求响应数据
  showEmptyState = false;
  displayStatus = '';
  mainShowLoading = 'hide'; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;

  renderBy: number = 0; //0收费趋势  1类别趋势渲染,默认为0,收费趋势渲染
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
    this.allWorkloadResponse = new AllWorkloadResponse();
    this.requestData = new AllWorkloadRequest();
    this.requestData.isIncludeType = true; //是否包含类别列表 必填 web true app false
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';

    this.getAllWorkload();
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
      this.getAllWorkload();
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
  /**
   * 点击切换渲染排序
   * @param num
   */
  clickRenderBy(num?: number) {
    this.renderBy = num;
    this.getAllWorkload(this.renderBy);
  }

  /**
   * 画柱状图
   * @param dom
   * @param xData
   * @param yData
   */
  drowBarEcharts(dom,xData,yData){
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
          name: '收入',
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
   * 全部医生工作量统计
   */
  getAllWorkload(renderBy?: number) {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsAllWorkload(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.allWorkloadResponse = val;
      // echarts参数配置
      let xData: any[] = [];
      let yData: any[] = [];
      let yData2: any[] = [];
      // 获取dom,渲染echarts
      let dom = this.el.nativeElement.querySelector('#ec-main');
      // 数据存在情况
      if (val) { // or  val && val.length
        if(renderBy===1){ //0收费趋势  1类别趋势渲染,默认为0,收费趋势渲染
          val.TypeList.forEach(value=>{
            let doctorName = value.DoctorName;
            let totalPrice = value.TotalPrice;
            xData.push(doctorName);
            yData.push(totalPrice);
          });
        }
        else{ //0收费趋势,默认为0,收费趋势渲染
          val.Items.forEach((value) => {
            // let date = new Date(value.Date).getDate() + '日';
            let doctorName = value.DoctorName;
            let totalPrice = value.TotalPrice;
            // let num = value.Num;
            xData.push(doctorName);
            yData.push(totalPrice);
            // this.yData2.push(price);
          });
        }
        //渲染
        this.drowBarEcharts(dom,xData,yData);
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
