import {Component, OnInit, OnDestroy, ElementRef, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {SmsService} from "../../../../core/service/sms.service";
import {GetTemplateListResponse} from "../../../../core/messages/sms-request-response";
import {CreateEditSmsTemplateComponent} from "../create-edit-sms-template/create-edit-sms-template.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {SmsKindListComponent} from "../sms-kind-list/sms-kind-list.component";

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.scss']
})
export class SmsTemplateComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent, OnDestroy {
/*
* 设置参数
* */
  templateTypeList = []; // 短信类型列表
  templateList = []; // 短信模板
  getTemplateListResponse: GetTemplateListResponse; // 模板列表响应
  Indexs = 0; // 默认加载我的模板
  dataLoading = 'hide';
  isShow = true; // 是否显示我的模板
  moduleName = '短信模版';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  isBorder: boolean;
  // 全屏的加载状态
  mainShowLoading = 'hide';

  constructor(private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private smsService: SmsService) {
  }

  ngOnInit() {
    let self = this;
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.getTemplateList(); // 加载一级模板类型列表
  }
  ngAfterViewInit() {
    this.mainShowLoading = 'show';
  }

  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  /*
  * TODO tab切换
  * */
  changeTab(index) {
    console.log(index);
    this.isShow = index.index;
    if (index.index === 0) {
      this.templateTypeList = this.getTemplateListResponse.MyTemplateList;
    }else {
      this.templateTypeList = this.getTemplateListResponse.SysTemplateList;
    }
  }
  /**
   * TODO 我的/系统模版切换
   */
/*  templateSwitch(index) {
    this.isShow = index === 0 ;
    if (index === 0) {
      this.templateTypeList = this.getTemplateListResponse.MyTemplateList;
    }else {
      this.templateTypeList = this.getTemplateListResponse.SysTemplateList;
    }
  }*/
  /*
  * TODO 新增后加载一级模板列表 loading
  * */
  getTemplateListLoading() {
    this.mainShowLoading = 'show';
    this.getTemplateList();
  }
  /*
   * TODO 面包屑路由
   * */
  jump() {
    this.router.navigate(['sms']);
  }
  /*
   * TODO 加载一级模板类型列表
   * */
  getTemplateList() {
    this.smsService.getTemplateList(null).subscribe(value => {
      this.mainShowLoading = 'hide';
      if (value) {
        this.getTemplateListResponse = value;
        this.templateTypeList = this.getTemplateListResponse.MyTemplateList; // 默认加载我的列表
        this.clickItem(-1); // 加载全部短信模板
      }
    }, error => {
      this.mainShowLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
   * TODO 弹框  类型管理
   * */
  selectReceiver() {
    this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '短信类别管理', PopupWindowSize.MIDDLE, 600, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  /*
   * TODO 点击模板类型列表，加载二级模板列表
   * */
  clickItem(index) {
    this.Indexs = index;
    this.templateList = [];
    if (index === -1) {
      this.getTemplateListResponse.MyTemplateList.forEach( value => {
        if (value.TemplateList.length > 0) {
          let addTypeList = [];
          value.TemplateList.forEach(val => {
            addTypeList.push( {TypeCode: value.TypeCode, Id: val.Id, SMSName: val.SMSName, SMSContent: val.SMSContext} );
          });
          this.templateList = this.templateList.concat(addTypeList);
        }
      } );
    }else {
      let addOneTypeList = [];
      this.getTemplateListResponse.MyTemplateList[index].TemplateList.forEach(val => {
        addOneTypeList.push( {TypeCode: this.getTemplateListResponse.MyTemplateList[index].TypeCode, Id: val.Id, SMSName: val.SMSName, SMSContent: val.SMSContext} );
      });
      this.templateList = this.templateList.concat(addOneTypeList);
    }
  }
  /*
   * TODO 添加模板
   * */
  addTemp() {
    this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '新增短信模板', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {
        this.getTemplateListLoading();
      }
    });
  }
  /*
  * TODO 弹框 管理模板
  * */
  changeKindList() {
    this.application.frontLayer.openPopupWindow(SmsKindListComponent, '短信类别管理', PopupWindowSize.SMALL, 680, null, false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {
        this.getTemplateListLoading();
      }
    });
  }
  /*
  * TODO 修改模板
  * */
  update(data) {
    this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '修改短信模板', PopupWindowSize.SMALL, 'auto', data, false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {
        this.getTemplateListLoading();
      }
    });
  }
  /*
  * TODO 删除模板
  * */
  delete(id) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.smsService.delTemplate({ID: id}).subscribe(value => {
          console.log(value);
          this.application.main.openPromptMessage('删除成功！', 3000);
          this.getTemplateListLoading();
        }, error => {
          this.application.main.openErrorMessage(error.errorMessage);
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
  }

  onOptions(val: any): void {
  }
}
