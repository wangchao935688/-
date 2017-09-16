import {Component, OnInit, AfterViewInit, ElementRef, HostListener} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as dic from "../../../../core/global_dic";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
import * as Process from "../../../../core/messages/process-request-response";
import {ProcessService} from "../../../../core/service/process.service";
import {PatientSimpleTelModel} from "../../../../core/messages/model/patient-simple-tel.model";
import {ProcessSentComponent} from "../process-sent/process-sent";
import {ProcessReceivedComponent} from "../process-received/process-received.component";
import {ProcessReworkedComponent} from "../process-reworked/process-reworked.component";
import {ProcessCompletedComponent} from "../process-completed/process-completed.component";
import {CreateProcessComponent} from "../create-process/create-process.component";
import {GlobalState} from "../../../../global.state";
import {ApplicationService} from "../../../../core/service/application.service";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
/**
 * 外加工详情
 */
@Component({
  selector: 'process',
  templateUrl: 'process.component.html',
  styleUrls: ['process.component.scss']
})
export class ProcessComponent implements OnInit, AfterViewInit {

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  compName: string = '外加工';

  ctrlList: string[] = ['修改', '删除'];//['&#xe6ad;'];//, '删除'

  responseData: Process.OutsideProcessGetResponse;

  gender = dic.gender;

  processStatus = dic.processStatus;

  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};

  processState: number = 0;

  id: string;

  tabData = {
    data: ['进度', '加工单详情'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
      this.selectTabIndex(index.index);
    }
  };

  showData: boolean;

  processLoading: string = 'hide';

  constructor(private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private processService: ProcessService,
              private globalState: GlobalState,
              private application: ApplicationService) {
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

  }

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


  /**
   * 选择 进度(0) 加工单详情(1)
   * @param index
   */
  selectTabIndex(index: number) {
    this.processState = index;
  }

  /**
   * 取件
   */
  sent(flag: boolean) {
    if (!flag) {
      this.application.frontLayer.openPopupWindow(ProcessSentComponent, '登记取件', PopupWindowSize.SMALL, 'auto', this.id, false).subscribe(t => {
        console.log(t);
        if (t && t.data != null) {
          this.searchOutsideProcessGet(this.id);
        }
      })
    }
  }

  /**
   * 回件
   */
  received(flag: boolean) {
    if (!flag) {
      this.application.frontLayer.openPopupWindow(ProcessReceivedComponent, '登记回件', PopupWindowSize.SMALL, 'auto', this.id, false).subscribe(t => {
        console.log(t);
        if (t && t.data != null) {
          this.application.main.openPromptMessage('保存成功！', 3000);
          //this.searchOutsideProcessGet(this.id);
        }
      })
    }
  }

  /**
   * 返工
   */
  reworked(flag: boolean) {
    if (!flag) {
      this.application.frontLayer.openPopupWindow(ProcessReworkedComponent, '登记返工', PopupWindowSize.SMALL, 'auto', this.id, false).subscribe(t => {
        console.log(t);
        if (t && t.data != null) {
          this.application.main.openPromptMessage('保存成功！', 3000);
          //  this.searchOutsideProcessGet(this.id);
        }
      })
    }
  }

  /**
   * 戴走
   */
  completed(flag: boolean) {
    if (!flag) {

      this.application.frontLayer.openPopupWindow(ProcessCompletedComponent, '登记戴走', PopupWindowSize.SMALL, 'auto', this.id, false).subscribe(t => {
        console.log(t);
        if (t && t.data != null) {
          this.searchOutsideProcessGet(this.id);
        }
      })
    }
  }

  onControlListClick(evt: number) {
    if (evt == 0) {
      this.application.frontLayer.openPopupWindow(CreateProcessComponent, '修改外加工', PopupWindowSize.SMALL, 1000, this.id, false).subscribe(t => {
        console.log(t);
        if (t && t != null && t.data != null) {
          this.searchOutsideProcessGet(this.id);
          this.globalState.notifyDataChanged('searchProcessList', Math.random());
        }
      })

    } else {
      this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
        if (t != null && t) {
          console.log('删除');
          this.processService.postOutsideProcessDelete({ID: this.id}).subscribe(val => {
            this.globalState.notifyDataChanged('searchProcessList', Math.random());
            this.router.navigate(['process-list/index']);
            // alert('删除成功');
          });
        } else if (t != null && !t) {
          console.log('不删除');
        } else {
          console.log('关闭');
        }
      })
    }
  }
}
