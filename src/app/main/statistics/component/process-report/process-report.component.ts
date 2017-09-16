import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {QiezziLoadingComponent} from "../../../../shared/component/qiezzi-loading/qiezzi-loading.component";
import {Router, ActivatedRoute} from "@angular/router";
import {StatisticsService} from "../../../../core/service/statistics.service";
import {ApplicationService} from "../../../../core/service/application.service";

@Component({
  selector: 'app-process-report',
  templateUrl: './process-report.component.html',
  styleUrls: ['./process-report.component.scss']
})
export class ProcessReportComponent implements OnInit, AfterViewInit {

  // 参数声明
  showEmptyState= false;
  displayStatus = ''; //侧滑窗口
  mainShowLoading= 'hide'; // 全局加载框初始化隐藏
  mainDataLoading = 'hide';
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  currentIndex = 0;// 当前tab切换项
  // tab切换
  tabData = {
    data: ['诊所外加工统计', '医生个人外加工统计'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
    }
  };


  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private statisticsService: StatisticsService,
              private application: ApplicationService,) { }

  ngOnInit() {

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

  /*tab切换导航条*/
  changeTab(evt) {
    // console.log(evt);
    this.currentIndex = evt.index;
  }
  ngAfterViewInit(): void {
    // console.log('after执行');



  }

}
