import {AfterViewInit, Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {Router, ActivatedRoute} from '@angular/router';
import {
  FollowUpGetTemplateListRequest, FollowUpGetTemplateListResponse,
  FollowUpGetTemplatePageRequest,
  FollowUpGetTemplatePageResponse
} from '../../../../core/messages/return-visit-request-response';
import {ReturnVisitTemplateAddUpdateComponent} from '../return-visit-template-add-update/return-visit-templdate-add-update.component';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {FRONT_LAYER_POPUP_COMPONENT} from '../../../../core/constants/global-subscriber-events';
import {DictDetailListRequest, DictDetailListResponse} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
@Component({
  selector: 'return-visit-options',
  templateUrl: 'return-visit-options.component.html',
  styleUrls: ['return-visit-options.component.scss']
})
export class ReturnVisitOptionsComponent implements OnInit, AfterViewInit {
  /*
  * 参数设置
  * */
  sheetName = '回访类型';
  sheetCode = 'InterviewType';
  displayStatus: string;
  returnVisitState = 0;
  dataLoading: string;
  name: string;
  mainShowLoading = 'hide';
  @Input()
  defaultSelectedIndex = 0;
  @Output()
  onTabIndexChange = new EventEmitter<{ [key: string]: string }>();

  /*
  * TODO tab切换隐藏显示内容
  * */
  toggle = false;
  currentIdnx = 0;
  // 当前tab切换项
  currentIdx = 0;
  scrollbarOptions = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  /*
  * TODO 回访类型
  * */
  /*
   * TODO 设置参数
   * */
  DictDetailListRequest: DictDetailListRequest;
  DictDetailListResponse: DictDetailListResponse;
  list = ['回访类型', '回访内容', '回访结果'];
  tabData = {
    data: ['回访类型', '回访内容', '回访结果'],
    defaultIndex: 0
  };
  templateListResponse: Array<FollowUpGetTemplateListResponse>;

  templateName: string;

  templateListRequest: FollowUpGetTemplateListRequest;

  constructor(
    private returnVisitService: ReturnVisitService,
    public application: ApplicationService,
    private router: Router,
    private HospitalService: HospitalService
  ) {
    this.templateListRequest = new FollowUpGetTemplateListRequest();
  }

  ngOnInit() {
    this.returnVisitType();
    this.name = '新增类型';
  }
  ngAfterViewInit(): void {
    this.dataLoading =  'show';
  }
  /*
   * TODO 获取回访类型 loading
   * */
  returnVisitTypeLoading() {
    // this.dataLoading = 'show';
    this.returnVisitType();
    this.name = '新增类型';
  }
  /*
  * TODO 回访类型
  * */
  returnVisitType() {
    /*
     * TODO 访问服务器，获取列表
     * */
    this.DictDetailListRequest = { // 请求患者来源
      SheetCode: 'InterviewType'
    };
    this.HospitalService.getDictDetailList(this.DictDetailListRequest).subscribe(val => {
      this.dataLoading = 'hide';
      // console.log(val.Items);
      if (val && val.Items && val.Items.length > 0 ) {
        console.log(val);
        this.DictDetailListResponse = val;
      }
    }, error => {
      this.dataLoading = 'hide';
      console.log(error);
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 回访内容
  * */
  InterviewContent () {
    this.dataLoading = 'show';
    this.returnVisitService.getReturnVisitTemplateList(this.templateListRequest).subscribe(val => {
      this.dataLoading = 'hide';
      if ( val && val.length > 0 ) {
        console.log(val);
        this.templateListResponse = val;
      }
    }, error => {
      this.dataLoading = 'hide';
      console.log(error);
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 返回首页
  * */
  jump() {
    this.router.navigate(['feedback']);
  }
  /*
  * TODO 新增回访类型、回访内容、回访结果
  * */
  onControlClick(evt: any) {
    switch (this.currentIdx) {
      case 1: // 新增回访内容模板
        this.application.frontLayer.openPopupWindow(ReturnVisitTemplateAddUpdateComponent, '新增回访内容模板', PopupWindowSize.SMALL, 260, {type: 0}, false).subscribe(t => {
          if (t && t.type === 'close') {
            console.log(t);
          }
        });
        break;
      case 2: // 新增回访结果模板
        this.application.frontLayer.openPopupWindow(ReturnVisitTemplateAddUpdateComponent, '新增回访结果模板', PopupWindowSize.SMALL, 260, {type: 1}, false).subscribe(t => {
          if (t && t.type === 'close') {
            console.log(t);
          }
        });
        break;
    }
  }
  /*
  * TODO tab切换
  * */
  changeTab(index) {
    this.currentIdx = index.index;
    // console.log(index.index);
    // console.log(this.templateListRequest.type);
    if (index.index === 0 ) {
      this.name = '新增类型';
      this.returnVisitTypeLoading(); // 回访类型
      this.toggle = false;
    }else if (index.index === 1) {
      this.templateListRequest.type = 0;
      this.InterviewContent(); // 回访内容
      this.name = '新增回访内容模板';
      this.toggle = true;
    }else if (index.index === 2) {
      this.templateListRequest.type = 1;
      this.InterviewContent(); // 回访结果
      this.toggle = true;
      this.name = '新增回访结果模板';
    }
  }

  /**
   * 删除
   */
  delete(id: string) {
    this.application.frontLayer.openConfirmDialog('确认删除?').subscribe(t => {
      if (t === true) {
        this.HospitalService.delDictDetail(id).subscribe(val => {
            this.application.main.openPromptMessage('删除成功');
            this.InterviewContent(); // 请求回访内容
          },
          error => {
            this.application.main.openErrorMessage(error.errorMessage);
          });
      }
      else if (t === false) {
        console.log('取消删除');
      }
      else {
        console.log('主动关闭');
      }
    });
  }


// 上移
  up(id: string) {

  }

// 下移
  down(id: string) {

  }
}
