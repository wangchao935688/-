import {Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from 'app/core/service/application.service';
import {ECharts, EChartOption, EChartTitleOption, init} from 'echarts';

import {
  AllProcessRequest,
  AllProcessResponse
} from '../../../../core/messages/statistics-request-response';
import {StatisticsService} from '../../../../core/service/statistics.service';
import {DoubleDate} from "../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component";


@Component({
  selector: 'app-clinic-process-report',
  templateUrl: './clinic-process-report.component.html',
  styleUrls: ['./clinic-process-report.component.scss']
})
export class ClinicProcessReportComponent implements OnInit,AfterViewInit {
  // 参数声明
  requestData: AllProcessRequest;         //请求数据
  clinicProcessResponse: AllProcessResponse; // 请求响应数据
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
  doctorList:any[]=[{label:'张三',value:'0'},{label:'李四',value:'1'},{label:'麻子',value:'2'}];  //下拉框医生选项
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
              private application: ApplicationService,) {
  }

  ngOnInit() {
    this.clinicProcessResponse = new AllProcessResponse();
    this.requestData = new AllProcessRequest();
    this.requestData.beginTime = '2017-05-01';
    this.requestData.endTime = '2017-05-31';

    this.getClinicProcess();
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
      this.getClinicProcess(this.renderBy);
    }
  }

  /**
   * 点击切换渲染排序
   * @param num
   */
  clickRenderBy(num?: number) {
    this.renderBy = num;
    this.getClinicProcess(this.renderBy);
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
          name: 'line',
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
   * 诊所外加工统计
   */
  getClinicProcess(renderBy?: number) {
    this.dataLoading = 'show';
    this.statisticsService.getStatisticsAllProcess(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.clinicProcessResponse = val;
      // 数据存在情况
      if (val) { // or  val && val.length
        let xData:any[]=[];
        let yData:any[]=[];
        let yData2:any[]=[];
        // 获取dom,渲染echarts
        let dom = this.el.nativeElement.querySelector('#ec-main');
        val.Items.forEach((value, index, arr) => {
          let doctorName = value.DoctorName;
          let num = value.Num;
          let price = value.Price;
          xData.push(doctorName);
          yData.push(num);
          yData2.push(price);
        });
        //echarts画柱状图
        // this.drowBarEcharts(dom,xData,yData);
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
