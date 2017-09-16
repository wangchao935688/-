import {Component, OnInit} from "@angular/core";
import {ProcessService} from "../../../../core/service/process.service";
import * as Process from "../../../../core/messages/process-request-response";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateProcessColorContentComponent} from "../create-process-color-content/create-process-color-content.component";
import {CreateProcessComponent} from "../create-process/create-process.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
/**
 *  外加工设置
 */
@Component({
  selector: 'process-options',
  templateUrl: './process-options.component.html',
  styleUrls: ['./process-options.component.scss']
})
export class ProcessOptionsComponent implements OnInit {

  moduleName: string = '外加工';
  scrollbarOptions: any = null;
  tabData = {
    data: ['加工内容', '加工色号'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
      this.index = index.index;
      this.switchIndex();
    }
  };

  isBorder: boolean = true;

  index: number = 0;

  contentList: Process.GetProcessContentListResponse[];

  colorNameList: Process.GetColorNumberListResponse[];

  buttonName: string = '新增加工内容';

  mainShowLoading: string = 'hide';

  constructor(private processService: ProcessService, private router: Router, private route: ActivatedRoute, private application: ApplicationService) {
  }

  ngOnInit() {
    this.switchIndex();
    this.scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  }

  switchIndex() {
    this.colorNameList = [];
    this.contentList = [];
    this.mainShowLoading = 'show';
    if (this.index == 0) {
      this.buttonName = '新增加工内容';
      this.searchProcessContentList();
    } else {
      this.buttonName = '新增加工色号';
      this.searchColorNameList();
    }
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


  /**
   * 跳转到外加工
   */
  jump() {
    this.router.navigate(['process-list']);
  }

  /**
   * 新增内容(0) 新增色号(1)
   */
  add() {
    this.application.frontLayer.openPopupWindow(CreateProcessColorContentComponent, this.index == 0 ? '新增加工内容' : '新增加工色号', PopupWindowSize.SMALL, 'auto', {index: this.index}, false).subscribe(t => {
      console.log(t);
      if (t && t != null && t.data != null) {
        this.application.main.openPromptMessage((this.index == 0 ? '新增加工内容' : '新增加工色号') + '成功');
        this.switchIndex();
      }
    });
  }

  /**
   * 上移
   */
  up(key: number) {
    if (this.index == 0) {
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

  /**
   * 下移
   */
  down(key: number) {
    if (this.index == 0) {
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

  /**
   * 修改
   */
  update(id: number, value: string) {

    this.application.frontLayer.openPopupWindow(CreateProcessColorContentComponent, this.index == 0 ? '修改加工内容' : '修改加工色号', PopupWindowSize.SMALL, 'auto', {
      index: this.index,
      DictDetailCode: id,
      DictDetailName: value
    }, false).subscribe(t => {
      if (t != null) {
        if (t.data) {
          this.switchIndex();
        }
      }
    });

  }

  /**
   * 删除
   */
  delete(id: string) {

    this.application.frontLayer.openConfirmDialog('确认删除?').subscribe(t => {
      if (t != null && t) {
        if (this.index == 0) {
          this.processService.postOutsideProcessDeleteProcessContent({ID: id}).subscribe(() => {
            this.application.main.openPromptMessage('删除成功');
            this.switchIndex();
          },
          error=>{
            this.application.main.openErrorMessage(error.errorMessage);
          });
        } else {
          this.processService.postOutsideProcessDeleteColorNumber({ID: id}).subscribe(() => {
            this.application.main.openPromptMessage('删除成功');
            this.switchIndex();
          },
            error=>{
              this.application.main.openErrorMessage(error.errorMessage);
            });
        }
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
    });
  }

  onControlClick(evt: any) {
    this.application.frontLayer.openPopupWindow(CreateProcessComponent, '新增外加工', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {
      if (t && t.type === 'close')
        console.log(t);
    })
  }
  openPopupWindow(evt) {}

}
