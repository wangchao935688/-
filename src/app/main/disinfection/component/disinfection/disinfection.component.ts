import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {GlobalState} from '../../../../global.state';
import {CreateEditDisinfectionComponent} from '../create-edit-disinfection/create-edit-disinfection.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ProcessService} from '../../../../core/service/process.service';
import * as Process from '../../../../core/messages/process-request-response';
import {PatientSimpleTelModel} from '../../../../core/messages/model/patient-simple-tel.model';
@Component({
  selector: 'disinfection',
  templateUrl: './disinfection.component.html',
  styleUrls: ['./disinfection.component.scss']
})
export class DisinfectionComponent implements OnInit, AfterViewInit {
  patientName = '消毒详情';
  // 1删除 0修改
  ctrlList: string[] = ['修改', '删除'];
  id: string;
  processLoading = 'hide';
  showData: boolean;
  processState: 0;
  responseData: Process.OutsideProcessGetResponse;
  constructor(
    private application: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private globalState: GlobalState,
    private processService: ProcessService,
  ) {
    this.responseData = new Process.OutsideProcessGetResponse();
    this.responseData.PatientModel = new PatientSimpleTelModel();
    this.responseData.RecordList = [];
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.processLoading = 'show';
    this.route.params.subscribe((val: any) => {
      this.processState = 0;
      this.id = val.processId;
      this.searchOutsideProcessGet(this.id);
    });

  };
  searchOutsideProcessGet(id: string) {
    this.processLoading = 'show';
    this.showData = false;
    this.processService.getOutsideProcessGet(id).subscribe(val => {
      this.processLoading = 'hide';
      this.showData = true;
      console.log(val);
      this.responseData = val;
    });
  }
  /*修改消毒记录*/
  onControlListClick(evt: number) {
    // console.log(evt)
    if (evt === 0) {
      this.application.frontLayer.openPopupWindow(CreateEditDisinfectionComponent, '修改消毒记录', PopupWindowSize.SMALL, 550, this.id, false).subscribe(t => {
        console.log(t);
        if (t && t != null && t.data != null) {
          this.searchOutsideProcessGet(this.id);
          this.globalState.notifyDataChanged('searchProcessList', Math.random());
        }
      });
    } else {
      this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
        if (t != null && t) {
          // console.log('删除');
          this.processService.postOutsideProcessDelete({ID: this.id}).subscribe(val => {
            this.globalState.notifyDataChanged('searchProcessList', Math.random());
            this.router.navigate(['process-list/index']);
            // alert('删除成功');
          });
        } else if (t != null && !t) {
          // console.log('不删除');
        } else {
          // console.log('关闭');
        }
      });
    }
  }
}
