import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from "@angular/forms";
import {ApplicationService} from "../../../../core/service/application.service";
import {CustomizeFormValidateService} from "../../../../core/service/customize-form.service";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {
  GetPatientListRequest, GetPatientListResponse, SearchPatientRequest
} from '../../../../core/messages/patient-request-response';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {ProcessService} from "../../../../core/service/process.service";
import * as Process from "../../../../core/messages/process-request-response";
import {WorkerService} from "../../../../core/service/worker.service";
import {GlobalState} from "../../../../global.state";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {QiezziPaginator} from "../../../../shared/component/qiezzi-paginator/qiezzi-paginator";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {PatientService} from '../../../../core/service/patient.service';
import * as dic from '../../../../core/global_dic';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {DictDetailListRequest, DictDetailListResponse} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {promise} from "selenium-webdriver";
import {CreateEditGoodsComponent} from '../create-edit-goods/create-edit-goods.component';
import {
  GetGoodsListRequest,
  GetGoodsListResponse
} from "../../../../core/messages/goods-request-response";
import {GoodsService} from "../../../../core/service/goods.service";


@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit,AfterViewInit {
  // 参数声明
  requestData: GetGoodsListRequest = new GetGoodsListRequest(); //获取物品列表的请求数据
  goodsListResponse: GetGoodsListResponse = new GetGoodsListResponse(); //物品列表的响应数据
  dictDetailListRequest: DictDetailListRequest = new DictDetailListRequest();    //获取物品类别请求数据  字典
  dictDetailListResponse: DictDetailListResponse = new DictDetailListResponse(); //物品类别响应数据
  mainShowLoading: string; // 全局加载框初始化隐藏
  leftDataLoading: string; //左侧loading
  rightDataLoading: string; //右侧loading
  showEmptyState = false;   //空
  showOrHide: any = {}; //分页


  displayStatus: string;

  // 排序
  currentClick: number = 0;    //默认全部几列都是灰色,当前点击
  goodsNameSortBoolean: boolean;    //物品名称排序 1正序 2倒序
  lowestStockSortBoolean: boolean;  //最低库存排序 3正序 4倒序
  inPriceSortBoolean: boolean;      //入库价排序   5正序 6倒序
  outPriceSortBoolean: boolean;     //出库价排序   7正序 8倒序

  // requestData: GetPatientListRequest; // 患者列表请求数据

  // 全选复选框
  item = {Id: 1};
  IsChooseAll: boolean = false; // 全选复选框
  goodsCheckedList = [];

  // 左侧滚动条设置
  centerLeftLoadReady: boolean;
  selectIndex: number;
  isBorderLeft: boolean;// 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        // GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  // 右侧滚动条设置
  centerRightLoadReady: boolean;
  isBorderRight: boolean;// 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };

  // constructor() { }
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private patientService: PatientService,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private HospitalService: HospitalService,
              private mScrollbarService: MalihuScrollbarService,
              private globalState: GlobalState,
              private goodsService: GoodsService,) {
  }

  ngOnInit() {
    this.centerLeftLoadReady = true;
    this.centerRightLoadReady = true;

    this.dictDetailListRequest.SheetCode = 'Goods';
    this.getGoodsKindsList(); //获取物品类别

    this.requestData.keyword = null;  //搜索关键字
    this.requestData.goodsType = null;  //物品类别code
    this.requestData.isIncludeDisable = false;  //是否包含禁用
    this.requestData.goodsStock = 0;    //0或空全部 1有库存 2没有库存
    this.requestData.orderBy = 1;       //排序number
    this.requestData.PageSize=20;     //分页,每页数据条数
    this.getGoodsList();  //获取物品列表
  }

  // this.getPatientList();

  ngAfterViewInit(): void {
    this.mainShowLoading = 'show'; //全局加载框
    this.leftDataLoading = 'show'; //左侧loading
    this.rightDataLoading = 'show'; //右侧loading

    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
  }

  /**
   * TODO 新增物品
   * @param event
   */
  onControlClick(evt: any) {
    if (evt === 0) {
      this.application.frontLayer.openPopupWindow(CreateEditGoodsComponent, '新增物品', PopupWindowSize.MIDDLE, 680, null, false).subscribe(t => {
        if (t) {
          // console.dir(t['data']['data']);
          // this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
          // this.getPatientList();
        }
      });
    }
  }
  /**
   * 跳转到详情页
   * @param evt
   */
  clickFeeItem(evt,goodsId, i) {
    evt.stopPropagation();
    let target = evt.srcElement || evt.target;
    if (target.className.indexOf('checkBox') > -1) {
      evt.stopPropagation();
      return true;
    } else if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.selectIndex = i;
    this.router.navigate(['goods', goodsId], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  /**
   * 顶部
   * @param event
   */
  onOptions(event) {
    console.log(1111);
    // this.router.navigate(['patient/options']);
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  /*
   * TODO 全选复选框
   * */
  selecctAllCheckBox(bool) {
    this.IsChooseAll = bool;
    this.goodsCheckedList = [];
    if (bool) {
      this.goodsListResponse.Items.forEach(value => {
        this.goodsCheckedList.push(value.Id);
      });
    }
  }
  selectBox(id) {
    if (this.goodsCheckedList.indexOf(id) > -1) {
      this.goodsCheckedList.splice(this.goodsCheckedList.indexOf(id), 1);
    } else {
      this.goodsCheckedList.push(id);
    }
    // console.log(this.goodsCheckedList);
  }

  /**
   * 获取物品类别
   */
  getGoodsKindsList() {
    this.HospitalService.getDictDetailList(this.dictDetailListRequest).subscribe(val => {
      console.log(val);
      this.dictDetailListResponse = val;
      this.leftDataLoading = 'hide';
    }, error => {
      this.leftDataLoading = 'hide';
    });
  }
  /*
   * TODO loading 获取物品库存列表
   * */
  getGoodsListLoading() {
    this.rightDataLoading = 'show';
    this.getGoodsList();
  }

  /**
   * 获取物品库存列表
   */
  getGoodsList() {
    this.goodsService.getGoodsList(this.requestData).subscribe(val => {
      console.log(123, val);
      //数据存在
      if (val) {
        this.goodsListResponse = val;
      }
      else {
        this.showEmptyState = true;
      }
      this.mainShowLoading = 'hide';
      this.rightDataLoading = 'hide';
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      this.mainShowLoading = 'hide';
      this.rightDataLoading = 'hide';
    });
  }

  /**
   * search搜索
   */
  search(){
    this.getGoodsListLoading();
  }

  /**
   * 显示禁用按钮
   */
  showDisable(){
    this.requestData.isIncludeDisable = !this.requestData.isIncludeDisable;  //是否包含禁用
    this.getGoodsListLoading();
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
   * 最低库存排序 3正序 4倒序
   */
  lowestStockSort() {
    this.lowestStockSortBoolean = !this.lowestStockSortBoolean;
    this.sort(1, 2, this.lowestStockSortBoolean);
    this.clickSort(2);
  }
  /**
   * 入库价排序   5正序 6倒序
   */
  inPriceSort() {
    this.inPriceSortBoolean = !this.inPriceSortBoolean;
    this.sort(1, 2, this.inPriceSortBoolean);
    this.clickSort(3);
  }
  /**
   * 出库价排序   7正序 8倒序
   */
  outPriceSort() {
    this.outPriceSortBoolean = !this.outPriceSortBoolean;
    this.sort(1, 2, this.outPriceSortBoolean);
    this.clickSort(4);
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
    this.getGoodsListLoading();
  }
  /**
   * TODO 分页改变
   * @param evt
   */
  onPageChange(evt: any) {
    this.requestData.PageIndex = evt.page;
    this.requestData.PageSize = evt.rows;
    this.getGoodsListLoading();
  }

}
