import { Component, OnInit } from '@angular/core';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {CreateEditHostpialAccountComponent} from '../create-edit-hostpial-account/create-edit-hostpial-account.component';

@Component({
  selector: 'hostpial-account-list',
  templateUrl: './hostpial-account-list.component.html',
  styleUrls: ['./hostpial-account-list.component.scss']
})
export class HostpialAccountListComponent implements OnInit {
  dataLoading: string;
  constructor(
    public application: ApplicationService,
  ) { }

  ngOnInit() {
  }
  /*修改账户*/
  ngClick () {
    this.application.frontLayer.openPopupWindow(CreateEditHostpialAccountComponent, '修改账户', PopupWindowSize.SMALL, 370, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
}
