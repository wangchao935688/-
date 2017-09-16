import {Component, OnInit, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {SelectReceiverComponent} from '../select-receiver/select-receiver.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CreateEditSmsTemplateComponent} from '../create-edit-sms-template/create-edit-sms-template.component';
import {SmsKindListComponent} from '../sms-kind-list/sms-kind-list.component';

@Component({
  selector: 'app-my-template-list',
  templateUrl: './my-template-list.component.html',
  styleUrls: ['./my-template-list.component.scss']
})
export class MyTemplateListComponent implements OnInit {
  Indexs: number;
  constructor(private router: Router, private el: ElementRef,
              private route: ActivatedRoute, private application: ApplicationService) { }

  ngOnInit() {
  }

  selectReceiver() {
    this.application.frontLayer.openPopupWindow(SmsKindListComponent, '短信类别管理', PopupWindowSize.SMALL, 500, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  createmo() {
    this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '新增短信模板', PopupWindowSize.SMALL, 380, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  clickItem(evt) {
    this.Indexs = evt;
  }
}
