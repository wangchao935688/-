import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {ICustomizeSlider} from "../../../../core/service/customize-slider.service";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";

@Component({
  selector: 'app-outpatient-report',
  templateUrl: './outpatient-report.component.html',
  styleUrls: ['./outpatient-report.component.scss']
})
export class OutpatientReportComponent implements OnInit, AfterViewInit, OnDestroy, ICustomizeSlider, IQiezziCenterHeaderComponent {

  currentIndex = -1;    // 当前tab切换项

  isBorder: boolean;
  selectIndex: number;  // 当前选中项
  showEmptyState = false; // 是否显示没有数据
  showOrHide: any = {}; // 分页显示
  scrollbarOptions: any;  // 滚动条配置
  dataLoading: string;  // 数据加载中状态
  mainShowLoading = 'hide'; // 全屏的加载状态
  displayStatus: string;  // 侧滑显示隐藏

  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;


  constructor() {
  }

  ngOnInit() {
    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (event) {
          self.isBorder = this.mcs.top < -55;
        }
      }
    };
    this.currentIndex = 0;  // 初始化tab选项卡

  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  /**
   * Tab筛选
   * @param event
   */
  selectTabIndex(event) {
    if (event.index !== this.currentIndex) {
      this.showOrHide['display'] = 'none';
      this.showEmptyState = false;
      this.currentIndex = event.index;
    }
  }


  /**
   * 顶部搜索
   * @param event
   */
  onSearch(event) {
  }

  /**
   * 高级筛选回调
   * @param data
   */
  onConditionChanged(data) {
  }

  /**
   * 顶部的添加
   * @param event
   */
  onControl(event) {
  }

  /**
   * 控制展示隐藏高级筛选
   * @param event
   */
  onShowFilter(event) {
  }

  onOptions(event) {
  }

}
