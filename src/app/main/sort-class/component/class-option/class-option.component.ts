import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {SystemGlobalHelper} from '../../../../core/uitls/system-global-helper';
import {ApplicationService} from 'app/core/service/application.service';
import {CreateEditClassComponent} from '../create-edit-class/create-edit-class.component'
import {ActivatedRoute, Router} from '@angular/router';
import {
  GetTypeListRequest,
  GetTypeListResponse,
} from '../../../../core/messages/income-and-expenses-request-response';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {SortClassService} from '../../../../core/service/sort-class.service';
import {GetShiftTypeListResponse} from '../../../../core/messages/sort-class-request-response';

@Component({
  selector: 'app-class-option',
  templateUrl: './class-option.component.html',
  styleUrls: ['./class-option.component.scss']
})
export class ClassOptionComponent  implements OnInit, AfterViewInit{
  /*
  * 设置参数
  * */
  GetShiftTypeListResponse: Array<GetShiftTypeListResponse>;
  moduleName = '排班';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private dailyExpenseService: DailyExpenseService,
              private application: ApplicationService,
              private SortClassService: SortClassService) {

  }

  ngOnInit() {
    this.getShiftTypeList();
  }
  ngAfterViewInit(): void {

  }
  // 新增班次
  addExpenseType() {
    this.application.frontLayer.openPopupWindow(CreateEditClassComponent, '新增班次', PopupWindowSize.MIDDLE, 480, null, false).subscribe(t => {
      console.log(t);
    });
  }
/*
* TODO 返回首页
* */
  back() {
    this.router.navigate(['../index'], {relativeTo: this.route});
  }
  /*
   * TODO 获取所有排班类型列表
   * */
  getShiftTypeList() {
    this.SortClassService.getShiftTypeList(null).subscribe( val => {
      if (val && val.length > 0) {
        console.log(val);
        this.GetShiftTypeListResponse = val;
      }
    } );
  }
  /*
  * 修改
  * */
  update(id?: string ) {
    this.application.frontLayer.openPopupWindow(CreateEditClassComponent, '新增班次', PopupWindowSize.MIDDLE, 480, {id: id}, false).subscribe(t => {
      console.log(t);
      if (t && t != null && t.data != null ) {
        this.application.main.openPromptMessage('修改成功！', 3000);
        this.getShiftTypeList();
      }
    });
  }
  /*
  * 删除
  * */
  delete(id) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.SortClassService.deleteShiftType({ID: id}).subscribe(val => {
          console.log(val);
          this.application.main.openPromptMessage('删除成功！', 3000); // 提示删除成功
          this.getShiftTypeList(); // 删除成功后，访问刷新
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
}

