import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import * as Process from '../../../../core/messages/process-request-response';
import {CreateEditCommonThemeComponent} from '../create-edit-common-theme/create-edit-common-theme.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {QiezziPaginator} from '../../../../shared/component/qiezzi-paginator/qiezzi-paginator';
import {GlobalState} from '../../../../global.state';
import {ProcessService} from '../../../../core/service/process.service';
import {CommonThemeComponent} from '../common-theme/common-theme.component';


@Component({
  selector: 'disinfection-option',
  templateUrl: './disinfection-option.component.html',
  styleUrls: ['./disinfection-option.component.scss']
})
export class DisinfectionOptionComponent implements OnInit {
  /*滚动条*/
  scrollbarOptions = {
    axis: 'y', theme: 'minimal-dark'};
  /*loading加载*/
  mainShowLoading = 'hide';
  selectIndex: number;
  processState = 0;
  showEmpty: boolean;
  /*加载*/
  dataLoading: string;
  /*外加工接口*/
  contentList: Process.GetProcessContentListResponse[];
  colorNameList: Process.GetColorNumberListResponse[];
  @ViewChild(QiezziPaginator)
  pager: QiezziPaginator;
  /*外加工列表接口*/
  requestData: Process.OutsideProcessGetListRequest;
  responseData: Process.OutsideProcessGetListResponse;
  displayStatus: string;
  index = 0;
  /*0常用主题 1消毒类型 2消毒方式*/
  list = ['常用主题', '消毒类型', '消毒方式'];
  tabData = {
    data: ['常用主题', '消毒类型', '消毒方式'],
    defaultIndex: 0
  };
  constructor(
    public application: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private globalState: GlobalState,
    private processService: ProcessService,
  ) {
    this.globalState.subscribe('searchProcessList', val => this.searchProcessList());
  }

  ngOnInit() {
    this.searchProcessList();
  };

  changeTab(index) {
    // this.selectTabIndex(this.list.findIndex(val =>{ val === index.title}));
    console.log(index.index);
  }
  switchIndex() {
    this.colorNameList = [];
    this.contentList = [];
    this.mainShowLoading = 'show';
    if (this.index === 0) {
      this.searchProcessContentList();
    } else {
      this.searchColorNameList();
    }
  }
  /**
   * 查询色号列表
   */
  searchColorNameList() {
    this.mainShowLoading = 'show';
    this.processService.getOutsideProcessGetColorNumberList().subscribe(val => {
      this.mainShowLoading = 'hide';
      this.colorNameList = val;
    });
  }
  /*查询*/
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
  selectTabIndex(index: number) {
    this.router.navigate(['.'], {relativeTo: this.route});
    this.selectIndex = -1;
    this.processState = index;
    this.requestData.status = index;
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    if (this.responseData) {
      this.responseData.Items = [];
      this.responseData.TotalItems = 0;
    }
    this.showEmpty = false;
    this.dataLoading = 'show';
    this.pager.first = 0;
    this.searchProcessList();
  }
  /*新增模板*/
  onControlClick(evt: any) {
    console.log(11111);
    this.application.frontLayer.openPopupWindow(CreateEditCommonThemeComponent, '新增模板', PopupWindowSize.SMALL, 280, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  }
  /**
   * 查询加工内容列表
   */
  searchProcessContentList() {
    this.mainShowLoading = 'show';
    this.processService.getOutsideProcessGetProcessContentList().subscribe(val => {
      this.mainShowLoading = 'hide';
      this.contentList = val;
    });
  }
  jump() {
    this.router.navigate(['disinfection-list']);
  }
/*  /!**
   * 上移
   *!/
  up(key: number) {
    if (this.index === 0) {
      this.processService.postOutsideProcessReorderProcessContent({
        Offset: 1,
        Key: key
      }).subscribe(val => this.searchProcessContentList());
    } else {
      this.processService.postOutsideProcessReorderColorNumber({
        Offset: 1,
        Key: key
      }).subscribe(val => this.searchColorNameList());

    }
  }

  /!**
   * 下移
   *!/
  down(key: number) {
    if (this.index === 0) {
      this.processService.postOutsideProcessReorderProcessContent({
        Offset: -1,
        Key: key
      }).subscribe(val => this.searchProcessContentList());
    } else {
      this.processService.postOutsideProcessReorderColorNumber({
        Offset: -1,
        Key: key
      }).subscribe(val => this.searchColorNameList());

    }
  }

  /!**
   * 修改
   *!/
  update(id: number, value: string) {

    this.application.frontLayer.openPopupWindow(CommonThemeComponent, this.index === 0 ? '修改加工内容' : '修改加工色号', PopupWindowSize.SMALL, 280, {
      index: this.index,
      DictDetailCode: id,
      DictDetailName: value
    }, false).subscribe(t => {
      console.log(t);
      if (t != null) {
        if (t.data) {
          this.switchIndex();
        }
      }
    });

  }

  /!**
   * 删除
   *!/
  delete(id: string) {

    this.application.frontLayer.openConfirmDialog('确认删除?').subscribe(t => {
      if (t != null && t) {
        console.log('删除');
        if (this.index === 0) {
          this.processService.postOutsideProcessDeleteProcessContent({ID: id}).subscribe(() => {
            this.switchIndex();
          });
        } else {
          this.processService.postOutsideProcessDeleteColorNumber({ID: id}).subscribe(() => {
            this.switchIndex();
          });
        }
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
    });
  }*/
}
