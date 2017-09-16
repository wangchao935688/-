import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../../../core/service/application.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CreateEditMedicalComponent} from '../create-edit-medical/create-edit-medical.component';
@Component({
  selector: 'medical-list',
  templateUrl: './medical-list.component.html',
  styleUrls: ['./medical-list.component.scss']
})
export class MedicalListComponent implements OnInit {
  dataLoading: string;
  constructor(
    public application: ApplicationService,
  ) { }

  ngOnInit() {
  }
  ngClick () {
    this.application.frontLayer.openPopupWindow(CreateEditMedicalComponent, '修改就诊事项', PopupWindowSize.SMALL, 320, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
}
