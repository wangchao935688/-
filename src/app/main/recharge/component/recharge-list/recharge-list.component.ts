import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {RechargeService} from '../../../../core/service/recharge.service';
import * as Recharge from '../../../../core/messages/recharge-request-response';
import {PostMessage} from '../../../../core/enums/postMessage';
import * as Worker from '../../../../core/messages/worker-request-response';
import {WorkerService} from '../../../../core/service/worker.service';
import {CreateRechargeComponent} from '../create-recharge/create-recharge.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ApplicationService} from 'app/core/service/application.service';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
/**
 * 充值记录
 */
@Component({
  selector: 'recharge-record',
  styleUrls: ['./recharge-list.scss'],
  templateUrl: 'recharge-list.component.html'
})
export class RechargeListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  /*
  * 设置参数
  * */
  displayStatus = '';  // 侧滑
  moduleName = '充值记录';  // 标题
  isBorder: boolean; // 滚动条上边框
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  selectIndex: number; // 列表项选中加边框
  mainShowLoading= 'hide'; // 全局加载框初始化隐藏
  showEmptyState: boolean; // 显示空数据状态
  dataLoading = 'hide';
  supperList = []; // 推荐人列表
  rechargeGetListRequest: Recharge.RechargeGetListRequest;

  rechargeCordList: Recharge.RechargeGetListResponse;

  // 推荐人
  referee: Worker.WorkerListResponse;

  constructor(private rechargeService: RechargeService,
              private workerService: WorkerService,
              private el: ElementRef,
              private application: ApplicationService,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService) {
    this.rechargeCordList = new Recharge.RechargeGetListResponse();
    this.rechargeGetListRequest = new Recharge.RechargeGetListRequest();
    this.referee = new Worker.WorkerListResponse();
  }
  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.rechargeGetListRequest.referrerId = '';
    this.rechargeGetListRequest.accountIDArray = null;
    this.rechargeGetListRequest.beginTime = '';
    this.rechargeGetListRequest.endTime = '';
    this.rechargeGetListRequest.keyword = '';
    this.searchRechargeCordList();
    this.getWorkerList();
    this.dataLoading = 'hide';
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
  }
  /*
   * TODO 获取推荐人列表
   * */
  getWorkerList() {
    this.workerService.getWorkerList({WorkerType: null, IsPermission: false, KeyWords: ''}).subscribe(val => {
      this.referee = val;
      val.Items.forEach( value => {
        this.supperList.push( {value: value.WorkerId, label: value.WorkerName} );
      } );
    });
  }
/*
* TODO 新建充值记录
* */
  onControlClick(evt) {
    console.log(evt);
    if (evt == 0) {
      this.application.frontLayer.openPopupWindow(CreateRechargeComponent, '新增患者', PopupWindowSize.MIDDLE, 680, null, false).subscribe(t => {
        console.log(t);
        if (t) {
          // this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
        }
      });
    }
  }
  /*
  * TODO 开始时间和结束时间
  * */
  selectLeft(evt) {
    this.rechargeGetListRequest.beginTime = evt;
  }
  selectRight(evt) {
    this.rechargeGetListRequest.endTime = evt;
  }
/*
* TODO 查询充值列表
* */
  searchRechargeCordList() {
    this.dataLoading = 'show';
    this.rechargeGetListRequest.referrerId = '';
    this.rechargeService.getRechargeGetList(this.rechargeGetListRequest).subscribe( val => {
      this.dataLoading = 'hide';
      if (val) {
        this.rechargeCordList = val;
      }else {
        this.showEmptyState = true;
      }
    }, error => {
      this.dataLoading = 'hide';
    });
  }
/*
* TODO 侧滑查看详情
* */
  openDetail(evt, id: string, index: number) {
    console.log(index);
    this.selectIndex = index;
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.router.navigate(['recharge', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
/*
* TODO 选择推荐人
* */
  getSupperList(evt) {
    console.log(evt);
    this.rechargeGetListRequest.accountIDArray = this.supperList[evt].value;
  }
  /*
  * TODO 分页
  * */
  onPageChange(evt: any) {
    console.log(evt);
    this.rechargeGetListRequest.pageIndex = evt.page;
    this.searchRechargeCordList();
  }
  /*
  * 滚动条
  * */
  onScroll(evt) {this.isBorder = evt.top < -55; }
  onSearch(key) {}
  onShowFilter(stat) {}
  onControl(evt) {}
  onOptions(event) {}
}
