import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {FollowUpGetRequest, FollowUpGetResponse} from '../../../../core/messages/return-visit-request-response';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {ApplicationService} from '../../../../core/service/application.service';
import {ChargeService} from '../../../../core/service/charge.service';
import {ReturnVisitHandlerComponent} from '../return-visit-handler/return-visit-handler.component';
import {ReturnVisitAddUpdateComponent} from '../return-visit-add-update/return-visit-add-update.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {ProcessService} from '../../../../core/service/process.service';
import {GlobalState} from '../../../../global.state';
import {CaseDetailsRequest} from "../../../../core/messages/case-request-response";
import {IQiezziRightHeaderComponent} from "../../../../shared/component/qiezzi-right-header/qiezzi-right-header.component";

@Component({
  selector: 'return-visit-detail',
  templateUrl: 'return-visit-detail.component.html',
  styleUrls: ['return-visit-detail.component.scss']
})
export class ReturnVisitDetailComponent implements OnInit , AfterViewInit, OnDestroy , IQiezziRightHeaderComponent {
  rightComponentName = '回访详情';
  controlList = ['回访', '修改', '删除'];
  @Input()
  data: string;
  id: string; //  回访的id
  Worker: any;
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  // 0.进行中 1.已完成
  ctrlListAll = {
    '0': ['回访', '修改', '删除'],
    '1': ['删除']
  };
  // 当前收费状态索引映射
  ctrlListIndexAll = {
    '0': [0, 1, 2],
    '1': [2]
  };
// loading
  mainShowLoading = 'hide';
  patientId: string; // 患者的id
  responseData: FollowUpGetResponse;
  requestData: FollowUpGetRequest;
  /*病历*/
  caseDetailRequest: CaseDetailsRequest;
  caseDetailResponse: CaseDetailsRequest;
  constructor(
    private returnVisitService: ReturnVisitService ,
    private mScrollbarService: MalihuScrollbarService,
    private router: Router,
    private route: ActivatedRoute,
    public application: ApplicationService,
    private el: ElementRef,
    private chargeService: ChargeService,
    private globalState: GlobalState,
    private processService: ProcessService,
  ) {
    this.responseData = new FollowUpGetResponse();
    this.requestData = new FollowUpGetRequest();
  }
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.route.params.subscribe(t => {
      this.mainShowLoading = 'show';
      console.log(t);
      this.id = t['id']; // 获取回访单id
      this.getReturnVisitDetail(); // 回访信息
    });
  }
  ngAfterViewInit() {

  }
  /*
  * TODO 请求侧滑详情
  * */
  getReturnVisitDetail() {
    this.returnVisitService.getReturnVisitDetail(this.id).subscribe((val) => {
      this.mainShowLoading = 'hide';
      this.responseData = val;
      this.patientId = this.responseData.PatientModel.Id;
      console.log(val);
      let name = '';
      this.responseData.InterviewWorkerList.forEach( value => {
        name += value.WorkerName + '/';
      });
      this.Worker = name.slice(0, name.length - 2);
    }, error => {
      this.mainShowLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  /**
   * 点击右上角控制按钮
   * @param index
   */
  onControl(index: number) {
    // index = this.ctrlListIndexAll[this.responseData.State][index];
    switch (index) {
      case 0: // 新增
        this.application.frontLayer.openPopupWindow(ReturnVisitHandlerComponent, '回访', PopupWindowSize. BIGGER, 770, {patientId: this.patientId , id: this.id}, false).subscribe(t => {
            console.log('刷新列表了');
          });
        console.log(index);
        break;
      case 1: // 修改
        this.application.frontLayer.openPopupWindow(ReturnVisitAddUpdateComponent, '修改回访', PopupWindowSize.SMALL, 525, this.id, false)
          .subscribe(t => {
            console.log('刷新列表了');
          });
        break;
      case 2: // 删除
        this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
          if (t != null && t) {
            // console.log('删除');
            this.returnVisitService.saveReturnVisitDelete({ID: this.id}).subscribe(val => {
              this.router.navigate(['feedback/index']);
              this.application.main.openPromptMessage('删除成功！', 3000);
            }, error => {
              this.application.main.openErrorMessage(error.errorMessage);
            });
          } else if (t != null && !t) {
            // console.log('不删除');
          } else {
            // console.log('关闭');
          }
        });
        break;
      default:
    }
  }
}
