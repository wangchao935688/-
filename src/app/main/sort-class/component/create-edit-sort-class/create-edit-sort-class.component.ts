import {Component, AfterViewInit, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {CustomizeSliderService, ICustomizeSlider} from '../../../../core/service/customize-slider.service';
import {SortClassService} from '../../../../core/service/sort-class.service';
import {
  GetAllShiftListRequest, GetAllShiftListResponse,
  GetShiftTypeListResponse, MakeShiftRequest
} from '../../../../core/messages/sort-class-request-response';
import {ApplicationService} from '../../../../core/service/application.service';

@Component({
  selector: 'app-create-edit-sort-class',
  templateUrl: './create-edit-sort-class.component.html',
  styleUrls: ['./create-edit-sort-class.component.scss']
})
export class CreateEditSortClassComponent implements OnInit, AfterViewInit, ICustomizeSlider {
  /*
   * 设置参数
   * */
  getAllShiftListRequest = new GetAllShiftListRequest(); // 员工排班列表请求
  getAllShiftListResponse: Array<GetAllShiftListResponse>; // 员工排班列表相应
  getShiftTypeListResponse: Array<GetShiftTypeListResponse>; // 排班类型列表
  makeShiftRequest: MakeShiftRequest; // 员工新建排班请求
  currShiftType: string;
  /*
   * 组件配置
   * */
  weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  dateList = [];
  displayStatus = '';
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  isBorder = false;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  moduleName = '排班';
  showEmptyState: boolean;
  tabData = { // tab设置
    data: ['本周', '本月'],
    defaultIndex: 0
  };
  selectIndex: number;
  /*
   * 声明时间参数类型
   * */
  lastDate: any;
  MonthNextFirstDay: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private slider: CustomizeSliderService,
              private SortClassService: SortClassService,
              private application: ApplicationService) {
  }

  ngOnInit() {
    this.dataLoading = 'hide';
    this.getCurrWeek();
    this.getShiftTypeList();
  }

  ngAfterViewInit(): void {
    this.dataLoading = 'show';
  }

  /*
  * TODO 获取本周
  * */
  getCurrWeek() {
    let Nowdate: any = new Date();
    let firstDay: any = new Date(Nowdate - (Nowdate.getDay() - 1 ) * 86400000);
    this.getAllShiftListRequest.beginTime = firstDay.toLocaleDateString();
    this.getAllShiftListRequest.endTime = new Date(( firstDay / 1000 + 6 * 86400) * 1000).toLocaleDateString();
    console.dir(this.getAllShiftListRequest);
    this.getAllShiftList();
  }

  /*
   * TODO 获取本月
   * */
  getCurrMonth() {
    let Nowdate: any = new Date();
    this.MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
    this.lastDate = this.MonthNextFirstDay - 86400000;
    this.getAllShiftListRequest.beginTime = Nowdate.getFullYear() + '-' + (Nowdate.getMonth() + 1) + '-1';
    this.getAllShiftListRequest.endTime = new Date( this.lastDate ).toLocaleDateString();
    console.dir(this.getAllShiftListRequest);
    this.getAllShiftList();
  }

  /*
   * TODO 加载员工排班列表
   * */
  getAllShiftList() {
    this.dataLoading = 'show';
    this.dateList = [];
    this.getAllShiftListResponse = [];
    this.SortClassService.getAllShiftList(this.getAllShiftListRequest).subscribe( (val) => {
      this.dataLoading = 'hide';
      if (val) {
        if (val && val.length > 0) {
          val[0].ShiftList.forEach( value => {
            this.dateList.push(value.Date ? value.Date : '');
          });
          console.dir(this.dateList);
          val.forEach(value => {
            value.ShiftList.forEach(item => {
              if (item['TypeModel']) {
                item['TypeModel']['Name'] = item['TypeModel']['Name'].slice(0, 1);
              }
            });
          });
          this.getAllShiftListResponse = val;
        } else {

        }
        console.dir(this.getAllShiftListResponse);
      } else {

      }
    });
  }

  /**
   * TODO tab切换
   * @param index
   */
  changeTab(index) {
   if (index.index === 0) { // 查询一周
     this.getCurrWeek();
   }else { // 查询一月
     this.getCurrMonth();
   }
  }
  /*
   * TODO 获取所有排班类型列表
   * */
  getShiftTypeList() {
    this.SortClassService.getShiftTypeList(null).subscribe( val => {
      if (val && val.length > 0) {
        this.getShiftTypeListResponse = val;
        console.log(this.getShiftTypeListResponse);
      }
    } );
  }
  /*
  * TODO 设置当前排班类型
  * */
  setShiftType(id) {
    this.currShiftType = id;
  }
  /*
  * TODO 设置员工排班
  * */
  makeShift(date, id) {
    this.makeShiftRequest = {
      WorkerID: id,
      Date: date,
      ShiftTypeCode: this.currShiftType
    };
    this.SortClassService.makeShift(this.makeShiftRequest).subscribe( val => {
      this.application.main.openPromptMessage('排班成功！', 3000); // 提示排班成功
      this.getAllShiftList();
    } );
  }

  /**
   * TODO 分页
   * @param evt
   * @constructor
   */
  onPageChange(evt) {
    console.log(evt);
    /*this.requestData.pageIndex = evt.page + 1;
     this.requestData.pageSize = evt.rows;*/
  }

  /*
   * TODO 类型设置
   * */
  typelist() {
    this.router.navigate(['../class-options'], {relativeTo: this.route});
  }

  selectDate(evt) {
  }

  onScroll(evt) { // 滚动条上边框显示
    this.isBorder = evt.top < -55;
  }

  /*
   * TODO 删除排班
   * */
  delShiftItem(evt, id) {
    if (evt.currentTarget.className.indexOf('delIcon') > -1) {
      evt.stopPropagation();
      this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
        if (t != null && t) {
          this.SortClassService.deleteShift({ID: id}).subscribe(val => {
            console.log(val);
            this.application.main.openPromptMessage('删除成功！', 3000); // 提示删除成功
            this.getAllShiftList(); // 删除成功后，访问刷新
          });
        } else if (t != null && !t) {
          console.log('取消');
        } else {
          console.log('关闭');
        }
      });
    }
  }
}

