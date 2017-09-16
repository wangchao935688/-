import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProcessService} from '../../../../core/service/process.service';
import * as Process from '../../../../core/messages/process-request-response';
import {ApplicationService} from '../../../../core/service/application.service';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CreateDrugChargeItemComponent} from '../create-drug-charge-item/create-drug-charge-item.component';
import {CreateTreateChargeItemComponent} from '../create-treate-charge-item/create-treate-charge-item.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
@Component({
  selector: 'charge-item-list',
  templateUrl: './charge-item-list.component.html',
  styleUrls: ['./charge-item-list.component.scss']
})
export class ChargeItemListComponent extends PopupWindowBaseComponent implements OnInit {
  /*icon图标切换*/
  toggles= false;
  toggle= false;
  /*左侧判断闭合展开*/
  isShowHs= false;
  isShowH= false;
  /*当前选中项*/
  selectIndex: number;
  showEmpty: boolean;
  // 数据加载中状态
  dataLoading: string;
  /*获取接口*/
  requestData: Process.OutsideProcessGetListRequest;
  responseData: Process.OutsideProcessGetListResponse;
  blockedOut: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processService: ProcessService,
    public application: ApplicationService,
    private mScrollbarService: MalihuScrollbarService,
  ) {super(); }

  ngOnInit() {
  }
  /*TODO面包屑路由跳转*/
  jump() {
    this.mScrollbarService.destroy('#appCenterContent');
    this.router.navigate(['profit']);
  }
  /*
  * TODO 新增类别
  * */
  newCategories () {
    this.application.frontLayer.openPopupWindow(CreateDrugChargeItemComponent, '新增类别', PopupWindowSize.LARGE, 710, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
  /*TODO 新增药品弹窗*/
  pharmaceuticals() {
    this.application.frontLayer.openPopupWindow(CreateDrugChargeItemComponent, '新增药品类项目', PopupWindowSize.LARGE, 710, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
  /*
  * TODO 新增诊疗类项目
  * */
  diagnosis () {
    this.application.frontLayer.openPopupWindow(CreateTreateChargeItemComponent, '新增诊疗类项目', PopupWindowSize.SMALL, 425, null, false)
      .subscribe(t => {
        console.log('刷新列表了');
      });
  }
  /*TODO 新增类别*/
  newadd() {
    this.application.frontLayer.openPopupWindow(CreateTreateChargeItemComponent, '新增类别', PopupWindowSize.SMALL, 425, null, false)
      .subscribe(t => {
        console.log('刷新列表了');
      });
  }
  /*TODO 级联菜单背景*/
  cascade () {
    this. blockedOut = !this.blockedOut;
  }
  /*左侧展开闭合*/
  unfoldingClosures() {
    this.toggles = ! this.toggles;
    this.isShowHs = !this.isShowHs;
  }
  unfoldingClosure() {
    this.toggle = ! this.toggle;
    this.isShowH = !this.isShowH;
  }
  searchProcessList() {
    this.selectIndex = -1;
    this.router.navigate(['.'], {relativeTo: this.route});
    this.dataLoading = 'show';
    if (this.responseData) {
      this.responseData.Items = [];
      this.responseData.TotalItems = 0;
    }
    this.processService.getOutsideProcessGetList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      this.responseData = val;
      this.showEmpty = this.responseData.TotalItems === 0;
    });
  }
}
