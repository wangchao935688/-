import { Component, OnInit } from '@angular/core';
import {CreateGroupChargeItemComponent} from '../create-group-charge-item/create-group-charge-item.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {Router} from '@angular/router';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'charge-group-list',
  templateUrl: './charge-group-list.component.html',
  styleUrls: ['./charge-group-list.component.scss']
})
export class ChargeGroupListComponent extends PopupWindowBaseComponent implements OnInit {
  toggles= false;
  isShowHs= false;
  toggle= false;
  isShowH= false;
  constructor(
    public application: ApplicationService,
    private router: Router,
    private mScrollbarService: MalihuScrollbarService,
  ) { super(); }

  ngOnInit() {
  }
  /*
  * TODO 新增收费组合
  * */
  newChargeCombination () {
    this.application.frontLayer.openPopupWindow(CreateGroupChargeItemComponent, '新增收费组合', PopupWindowSize.LARGE, 710, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
  /*
  * 级联菜单点击事件
  * */
  cascade () {
    this.toggle = !this.toggle;
  }
  /*
  * 面包屑路由跳转
  * */
  jump() {
    this.mScrollbarService.destroy('#appCenterContent');
    this.router.navigate(['profit']);
  }
  unfoldingClosures() {
    this.toggles = ! this.toggles;
    this.isShowHs = !this.isShowHs;
  }
  unfoldingClosure() {
    this.toggle = ! this.toggle;
    this.isShowH = !this.isShowH;
  }
}
