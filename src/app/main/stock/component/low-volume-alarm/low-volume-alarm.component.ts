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
import {QiezziLoadingComponent} from "../../../../shared/component/qiezzi-loading/qiezzi-loading.component";

import {GoodsService} from '../../../../core/service/goods.service';
import {
  GetCurrentGoodsListRequest,
  GetCurrentGoodsListResponse
} from '../../../../core/messages/goods-request-response';
import {DictDetailListRequest, DictDetailListResponse} from "../../../../core/messages/dict-request-response";


@Component({
  selector: 'app-low-volume-alarm',
  templateUrl: './low-volume-alarm.component.html',
  styleUrls: ['./low-volume-alarm.component.scss']
})
export class LowVolumeAlarmComponent implements OnInit {
  // 参数声明
  requestData: GetCurrentGoodsListRequest = new GetCurrentGoodsListRequest(); //获取当前库存的请求数据
  currentGoodsListResponse: GetCurrentGoodsListResponse = new GetCurrentGoodsListResponse(); //当前库存的响应数据
  dictDetailListRequest: DictDetailListRequest = new DictDetailListRequest();    //获取物品类别请求数据  字典
  dictDetailListResponse: DictDetailListResponse = new DictDetailListResponse(); //物品类别响应数据
  // 排序
  currentClick: number = 0;    //默认全部几列都是灰色,当前点击
  goodsNameSortBoolean: boolean;    //物品名称排序 1正序 2倒序
  currentStockSortBoolean: boolean; //当前库存排序 9正序 10倒序
  LowSortBoolean: boolean;     //最低库存排序

  showOrHide: any = {}; //分页

  pageIndex: number =0;
  centerRightLoadReady = true;
  displayStatus: string;

  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示

  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  showEmptyState= false;
  mainShowLoading: string; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  dataLoadingLeft = 'hide';
  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};



  isBorder: boolean;
  scrollbarOptions: any = null;

  centerLeftLoadReady = true;
  isBorderLeft: boolean;// 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }

  selectedButtons: any;
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };


  constructor(
    public el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private slider: CustomizeSliderService,
    private application: ApplicationService,
    private form: CustomizeFormValidateService,
    private patientService: PatientService,
    private HospitalService: HospitalService,
    private mScrollbarService: MalihuScrollbarService,
    private globalState: GlobalState,
    private goodsService: GoodsService,) {
  }
  ngOnInit() {
    this.requestData.keyword = null;  //搜索关键字string
    this.requestData.goodsType = null;  //物品类别code  string
    this.requestData.goodsStock = 0;    //0或空全部 1有库存 2没有库存
    this.requestData.orderBy = 1;       //排序number
    this.getCurrentGoodsList();
    this.dictDetailListRequest.SheetCode = 'Goods';
    this.getGoodsKindsList();//获取物品类型
  }
  ngAfterViewInit(): void {
    this.dataLoading =  'show';
    this.dataLoadingLeft =  'show';
  }
  /**
   * 获取物品类别
   */
  getGoodsKindsList() {
    this.HospitalService.getDictDetailList(this.dictDetailListRequest).subscribe(val => {
      console.log(val);
      //将全部添加到物品类别数组的头位置
      val.Items.unshift({Name:'全部',Code:null,Id:null});
      this.dictDetailListResponse = val;
      this.dataLoadingLeft =  'hide';
    }, error => {
      this.dataLoadingLeft =  'hide';
    });
  }

  /**
   * 点击左侧物品类别,渲染数据
   */
  clickGoodsKinds(code){
    this.requestData.goodsType = code;  //物品类别code  string
    this.getCurrentGoodsList();
  }
  /**
   * 获取物品当前库存列表Loading
   */
  getCurrentGoodsListLoading(){
    this.dataLoading = 'show';
    this.getCurrentGoodsList();
  }
  /**
   * 获取物品当前库存列表
   */
  getCurrentGoodsList() {
    this.goodsService.getCurrentGoodsList(this.requestData).subscribe(val => {
      // console.log(111,val);
      //数据存在
      if (val) {
        this.dataLoading = 'hide';
        this.currentGoodsListResponse = val;
      }
      else{
        this.showEmptyState = true;
      }
      this.dataLoading = 'hide';
    },error=>{
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      this.dataLoading = 'hide';
    });
  }
  /**
   * 搜索按钮事件
   */
  searchCurrentGoodsList(){
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
   * 当前库存排序 9正序   10倒序
   */
  currentStockSort() {
    this.currentStockSortBoolean = !this.currentStockSortBoolean;
    this.sort(9, 10, this.currentStockSortBoolean);
    this.clickSort(2);
  }
  /**
   * 最低库存排序 3正序   4倒序
   */
  lowStockSort() {
    this.LowSortBoolean = !this.LowSortBoolean;
    this.sort(3, 4, this.LowSortBoolean);
    this.clickSort(3);
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
