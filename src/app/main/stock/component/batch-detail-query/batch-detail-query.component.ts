import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from "@angular/forms";

import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {CustomizeFormValidateService} from "../../../../core/service/customize-form.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";

import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {GlobalState} from "../../../../global.state";
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {HospitalService} from '../../../../core/service/hospital.service';
import {PatientService} from '../../../../core/service/patient.service';
import {
  GetCurrentGoodsListRequest,
  GetCurrentGoodsListResponse
} from "../../../../core/messages/goods-request-response";
import {
  BatchListRequest,
  BatchListResponse
} from "../../../../core/messages/stock-request-response";
import {GoodsService} from "../../../../core/service/goods.service";
import {StockService} from "../../../../core/service/stock.service";
import {QiezziLoadingComponent} from "../../../../shared/component/qiezzi-loading/qiezzi-loading.component";
import {DictDetailListRequest, DictDetailListResponse} from "../../../../core/messages/dict-request-response";


@Component({
  selector: 'app-batch-detail-query',
  templateUrl: './batch-detail-query.component.html',
  styleUrls: ['./batch-detail-query.component.scss']
})
export class BatchDetailQueryComponent implements OnInit {
// 参数声明
  requestData: BatchListRequest = new BatchListRequest(); //获取批次列表请求数据
  batchListResponse: BatchListResponse = new BatchListResponse(); //批次列表的响应数据
  dictDetailListRequest: DictDetailListRequest = new DictDetailListRequest();    //获取物品类别请求数据  字典
  dictDetailListResponse: DictDetailListResponse = new DictDetailListResponse(); //物品类别响应数据
  // 排序
  currentClick: number = 0;    //默认全部几列都是灰色,当前点击
  goodsNameSortBoolean: boolean;    //物品名称排序 1正序 2倒序
  numberSortBoolean: boolean;          //数量    3正序  4倒序
  batchNameSortBoolean: boolean;       //批次名称 5正序 6倒序
  productionDateSortBoolean: boolean;  //生产日期 7正序 8倒序
  shelfLifeDayNumSortBoolean: boolean; //保质期天数 9正序  10倒序
  shelfLifeDateSortBoolean: boolean;   //有效期    11正序  12倒序
  remainingDayNumSortBoolean: boolean; //剩余天数   13正序  14倒序

  pageIndex: number = 0;
  centerRightLoadReady = true;
  displayStatus: string;

  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  goodsKindsList: any[]=[];  //下拉框物品类别选项
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  showEmptyState = false;
  mainShowLoading: string; // 全局加载框初始化隐藏
  showOrHide: any = {}; //分页

  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};

  selectedButtons: any;
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  centerLeftLoadReady = true;
  isBorderLeft: boolean;// 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }

  isBorder: boolean;
  scrollbarOptions: any = null;

  constructor(public el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private patientService: PatientService,
              private HospitalService: HospitalService,
              private mScrollbarService: MalihuScrollbarService,
              private globalState: GlobalState,
              private goodsService: GoodsService,
              private stockService: StockService,) {
  }


  ngOnInit() {
    this.requestData.beginTime = null;
    this.requestData.endTime = null;
    this.requestData.keyword = null;  //搜索关键字string
    this.requestData.goodsType = null;  //物品类别code  string
    this.requestData.goodsStock = null;
    this.requestData.orderBy = 1;

    this.getCurrentGoodsList(); //获取物品当前库存信息
    this.dictDetailListRequest.SheetCode = 'Goods';
    this.getGoodsKindsList(); //获取物品类别,渲染到下拉框
  }

  ngAfterViewInit(): void {
    this.mainShowLoading = 'show';
    this.dataLoading = 'show';
  }

  selectLeft(evt: any) {
    this.requestData.beginTime = evt;
  }

  selectRight(evt: any) {
    this.requestData.endTime = evt;
  }

  /**
   * 获取物品批次明细查询Loading
   */
  getCurrentGoodsListLoading() {
    this.dataLoading = 'show';
    this.getCurrentGoodsList();
  }

  /**
   * 获取物品批次明细查询
   */
  getCurrentGoodsList() {
    this.stockService.getBatchList(this.requestData).subscribe(val => {
      //数据存在
      if (val) {
        this.batchListResponse = val;
      }
      else {
        this.showEmptyState = true;
      }
      this.dataLoading = 'hide';
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      this.dataLoading = 'hide';
    });
  }

  /**
   * 获取物品类别
   */
  getGoodsKindsList() {
    this.HospitalService.getDictDetailList(this.dictDetailListRequest).subscribe(val => {
      if (val && val.Items.length > 0) {
        //将全部添加到物品类别数组的头位置
        // val.Items.unshift({Name: '全部', Code: null, Id: null});
        // this.dictDetailListResponse = val;
        // [{label: '全部', value: '0'}, {label: '物品有库存', value: '1'}, {label: '物品无库存', value: '2'}]
        val.Items.forEach(value => {
          this.goodsKindsList.push({label: value.Name, value: value.Code});
          // console.log('forinafter',this.goodsKindsList);
        });
        // this.dataLoadingLeft = 'hide';
      }
    }, error => {
      // this.dataLoadingLeft = 'hide';
    });
  }

  /**
   * 下拉框选择
   */
  onChangeDropDownList(event: any) {
    console.log('event',event);
    this.requestData.goodsType = this.goodsKindsList[event].value;
    this.getCurrentGoodsListLoading();
  }

  /**
   * 搜索按钮事件
   */
  search() {
    this.getCurrentGoodsListLoading();
  }

  /**
   * 物品名称排序 1正序   2倒序
   */
  goodsNameSort() {
    this.goodsNameSortBoolean = !this.goodsNameSortBoolean;
    this.sort(1, 2, this.goodsNameSortBoolean);
    this.clickSort(1);
  }

  /**
   * 数量排序    3正序  4倒序
   */
  numberSort() {
    this.numberSortBoolean = !this.numberSortBoolean;
    this.sort(3, 4, this.numberSortBoolean);
    this.clickSort(2);
  }

  /**
   * 批次名称 5正序 6倒序
   */
  batchNameSort() {
    this.batchNameSortBoolean = !this.batchNameSortBoolean;
    this.sort(5, 6, this.batchNameSortBoolean);
    this.clickSort(3);
  }

  /**
   * 生产日期 7正序 8倒序
   */
  productionDateSort() {
    this.productionDateSortBoolean = !this.productionDateSortBoolean;
    this.sort(7, 8, this.productionDateSortBoolean);
    this.clickSort(4);
  }

  /**
   * 保质期天数 9正序  10倒序
   */
  shelfLifeDayNumSort() {
    this.shelfLifeDayNumSortBoolean = !this.shelfLifeDayNumSortBoolean;
    this.sort(9, 10, this.shelfLifeDayNumSortBoolean);
    this.clickSort(5);
  }

  /**
   * 有效期    11正序  12倒序
   */
  shelfLifeDateSort() {
    this.shelfLifeDateSortBoolean = !this.shelfLifeDateSortBoolean;
    this.sort(11, 12, this.shelfLifeDateSortBoolean);
    this.clickSort(6);
  }

  /**
   * 剩余天数   13正序  14倒序
   */
  remainingDayNumSort() {
    this.remainingDayNumSortBoolean = !this.remainingDayNumSortBoolean;
    this.sort(13, 14, this.remainingDayNumSortBoolean);
    this.clickSort(7);
  }

  /**
   * 点击排序事件,控制样式
   */
  clickSort(currentClick) {
    this.currentClick = currentClick;
  }

  /**
   * 排序
   * @param asc   正序
   * @param desc  倒序
   * @param flag
   */
  sort(asc: number, desc: number, flag: boolean) {
    if (this.requestData.orderBy != asc && this.requestData.orderBy != desc) {
      if (flag) {
        this.requestData.orderBy = desc;
      } else {
        this.requestData.orderBy = asc;
      }
    } else if (this.requestData.orderBy == asc) {
      this.requestData.orderBy = desc;
      flag = true;
    } else {
      this.requestData.orderBy = asc;
      flag = false;
    }
    this.getCurrentGoodsListLoading();
  }

  /**
   * TODO 分页改变
   * @param evt
   */
  onPageChange(evt: any) {
    this.requestData.PageIndex = evt.page;
    this.requestData.PageSize = evt.rows;
    this.getCurrentGoodsListLoading();
  }


}
