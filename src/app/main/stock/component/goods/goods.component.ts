import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as dic from '../../../../core/global_dic';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import * as Process from '../../../../core/messages/process-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {TOP_ROLL_COMPONENT_COMPLETE} from '../../../../core/constants/global-subscriber-events';
import {GlobalState} from '../../../../global.state';
import {ApplicationService} from '../../../../core/service/application.service';
import {PatientCenterRequest, PatientCenterResponse} from '../../../../core/messages/patient-request-response';

import {
  GetGoodsRequest,
  GetGoodsResponse
} from "../../../../core/messages/goods-request-response";
import {GoodsService} from "../../../../core/service/goods.service";

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit,AfterViewInit {
  //参数设置
  requestData: GetGoodsRequest = new GetGoodsRequest(); //获取物品详情的请求数据
  goodsInfoResponse: GetGoodsResponse = new GetGoodsResponse(); //物品详情的响应数据
  dataLoading: boolean;     //侧滑loading
  goodsId: string;       //物品ID
  isShowGoodsInfo = true; //默认显示物品信息
  isShowPrice = true;     //默认显示库存及价格
  // whichShow: string;     //显示隐藏控制哪个

  // 侧滑滚动条设置
  centerLoadReady: boolean;
  selectIndex: number;
  isBorder: boolean;// 侧滑顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptions = {// 侧滑滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        // GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  }


  /*
   * TODO 设置参数类型
   * */

  patientName = '物品详情';
  mainShowLoading: string;
  ctrlList: string[] = ['修改', '删除'];

  // scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  tagList = [{title: '根管治疗', value: '1'}, {title: '洗牙', value: '2'}];
  id: string;

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private mScrollbarService: MalihuScrollbarService,
              private globalState: GlobalState,
              private patientService: PatientService,
              private el: ElementRef,
              private application: ApplicationService,
              private goodsService: GoodsService) {
  }

  ngOnInit() {
    this.centerLoadReady = true;
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;

    this.route.params.subscribe(t => {
      this.requestData.id = t['goodsId'];
      this.getGoodsInfo(); // 获取物品详情
      /*if (t) {
       this.router.navigate(['home', this.patientId], {relativeTo: this.route});
       }*/
    });
  }

  ngAfterViewInit(): void {
    // this.application.workModule = this;
    // this.application.workBoard = this.el.nativeElement;
  }

  onControlListClick(evt) {
  }

  /**
   * 点击图标,控制显示隐藏
   * @param i 控制是哪个图标
   */
  changeGoodsShowOrHide() {
    this.isShowGoodsInfo = !this.isShowGoodsInfo;
    console.log(11,this.isShowGoodsInfo)
  }
  changePriceShowOrHide() {
    this.isShowPrice = !this.isShowPrice;
    console.log(22,this.isShowPrice)
  }

  /**
   * 获取物品详情
   */
  getGoodsInfo() {
    this.goodsService.getGoods(this.requestData).subscribe(value => {
      console.log(999, value);
      if (value) {
        this.goodsInfoResponse = value;
      } else {

      }

    }, error => {

    });
  }

}
