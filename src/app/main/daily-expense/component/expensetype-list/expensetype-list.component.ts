import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {SystemGlobalHelper} from '../../../../core/uitls/system-global-helper';
import {ExpenseTypeListAddComponent} from '../expensetypelist-add/expensetypelist-add.component'
import {ActivatedRoute, Router} from '@angular/router';
import {
  GetTypeListRequest,
  GetTypeListResponse,
} from '../../../../core/messages/income-and-expenses-request-response';
import {ApplicationService} from "../../../../core/service/application.service";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
@Component({
  selector: 'expensetype-list',
  styleUrls: ['./expensettype-list.scss'],
  templateUrl: './expensetype-list.component.html'
})
export class ExpenseTypeListComponent implements OnInit, AfterViewInit {

  templateList: GetTypeListResponse[];

  requestData: GetTypeListRequest;
  moduleName = '日常收支';
  dataLoading = 'hide';
  tabData = {
    data: ['收入类别', '支出类别'],
    defaultIndex: 0
  };
  btnName= '新增收入'; // 新增类别按钮名
  showEmptyState = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private dailyExpenseService: DailyExpenseService,
              private application: ApplicationService) {
  }
  ngOnInit() {
    this.requestData = new GetTypeListRequest();
    this.getTypeList(0); // 初始化获取日常收支类型
    this.dataLoading = 'hide';
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
  }
  /*
  * TODO 获取收支类别
  * */
  getTypeList(index) {
    this.dataLoading = 'show';
    this.requestData.type = index;
    this.dailyExpenseService.getExpenseTypeList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      if (val) {
        this.templateList = val;
      }
    });
  }
  /*
  * TODO 新增收支类别
  * */
  addExpenseType() {

    this.application.frontLayer.openPopupWindow(ExpenseTypeListAddComponent, '新增收支类别', PopupWindowSize.SMALL, 480, { type: this.requestData.type}, false).subscribe(t => {
      if (t && t['data']) {
        console.dir(t['data']['data']);
        this.application.main.openPromptMessage('保存成功!', 3000); // 提示保存成功
        this.getTypeList(this.requestData.type);
      }
    });
  }
  /*
  * TODO 页签切换
  * */
  changeTab(index) {
    this.btnName = index.index === 0 ? '新增收入' : '新增支出';
    this.getTypeList(index.index);
  }
  back() {
    this.router.navigate(['../expense-list'], {relativeTo: this.route});
  }

  /*
  * TODO 删除deleteExpenseType
  * */
  delete(id: string) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.dailyExpenseService.deleteExpenseType({ID: id}).subscribe(val => {
          console.log(val);
          this.application.main.openPromptMessage('删除成功！', 3000); // 提示删除成功
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }

  // 修改
  update(id: string) {

  }

  // 上移
  up(id: string) {
    alert('木有API');
  }

  // 下移
  down(id: string) {
    alert('木有API');
  }

  // 置顶
    top(id: string) {
      alert('木有API');
   }
  // 置底
    bottom(id: string) {
      alert('木有API');
   }
}

