import {Component, ElementRef, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ContactGroupListComponent} from '../contact-group-list/contact-group-list.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ContactImportComponent} from '../contact-import/contact-import.component';
import {CreateEditContactComponent} from '../create-edit-contact/create-edit-contact.component';
import {ContactComponent} from '../contact/contact.component';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {ContactService} from '../../../../core/service/contact.service';
import * as ContactRequestResponse from '../../../../core/messages/contact-request-response';
import {AddGroupRequest} from '../../../../core/messages/contact-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {GetPatientListRequest, GetPatientListResponse} from '../../../../core/messages/patient-request-response';
import {GetListRequest, GetListWorkerFullResponse} from '../../../../core/messages/worker-request-response';
import {WorkerService} from '../../../../core/service/worker.service';
@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent extends PopupWindowBaseComponent implements OnInit {
/*患者列表*/
  getPatientListRequest: GetPatientListRequest = new GetPatientListRequest();
  getPatientListResponse: GetPatientListResponse;
/*员工列表*/
  centerLoadReady = true;
  isBorder: boolean;
  mainShowLoading = 'hide';
  displayStatus = ''; // 隐藏侧滑框
  centerRightLoadReady = false; // 滚动条内部内容，默认隐藏，设置2秒后显示
  isBorderRight: boolean; // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  dataLoading = 'hide';

  // 分页显示
  showOrHide: any = {};
  isShows = 0;
  tabData = {
    data: ['患者', '同事', '其他'],
    defaultIndex: 0,
  };
  scrollbarOptions = { axis: 'y', theme: 'minimal-dark'}; // 滚动条设置
  scrollbarOptionsRight = {axis: 'y', theme: 'minimal-dark'};
  private PageIndex: number;
  private IsImportant: boolean;
  private PageSize: number;
  private OrderBy: number;
  // 右侧滚动条设置
  constructor(private router: Router, private el: ElementRef, private route: ActivatedRoute, private application: ApplicationService, private slider: CustomizeSliderService, private contactService: ContactService, private patientService: PatientService,  private workerService: WorkerService) {
  super();
  }
  ngOnInit() {
    this.centerLoadReady = true; // 滚动条
    this.GetPatientList(); // 获取患者列表
  }
  /*
   TODO 获取患者列表
   */
  GetPatientList() {
    this.patientService.GetPatientList(this.getPatientListRequest).subscribe(t => {
      console.log(t);
      if (t) {
        this.getPatientListResponse = t;
      }
      // this.application.main.openPromptMessage('获取成功！', 3000);
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 员工列表
  * */
  // getGetList() {
  //   this.workerService.getGetList(this.getGetListRequest).subscribe(t => {
  //     console.log(t);
  //      if (t) {
  //        this.getGetListResponse = t;
  //      }, error => {
  //       this.application.main.openErrorMessage(error.errorMessage);
  //     });
  // }


  /*
  * TODO 联系人列表
  * */
//   GetList() {
//     this.patientService.GetPatientList(this.getPatientListRequest).subscribe(t => {
//       console.log(t);
//       if (t) {
//         this.getPatientListResponse = t;
//       }
//       // this.application.main.openPromptMessage('获取成功！', 3000);
//     }, error => {
//       this.application.main.openErrorMessage(error.errorMessage);
//     });
// }
  /*
  * TODO tab切换
  * */
  changeTab(ev) {
    console.log(ev);
    this.isShows = ev.index;
  }
// 群组管理弹窗
  adminteam() {
    this.application.frontLayer.openPopupWindow(ContactGroupListComponent, '群组管理', PopupWindowSize.SMALL, 340, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
 /*TODO 分页改变*/
  onPageChange(evt) {
    this.getPatientListRequest.PageIndex = evt.page;
    this.getPatientListRequest.PageSize = evt.rows;
    this.GetPatientList();
  }
  // 导入弹窗
  cImport() {
    this.application.frontLayer.openPopupWindow(ContactImportComponent, '导入患者', PopupWindowSize.SMALL, 300, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  // 新增弹窗
  cCreate() {
    this.application.frontLayer.openPopupWindow(CreateEditContactComponent, '新增联系人', PopupWindowSize.SMALL, 600, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  onControl(evt) {}
  onOptions(evt) {}

  listDatail(evt: any) {
    console.log(evt);
    // if (evt.currentTarget.className.indexOf('list-table-item') > -1) {evt.stopPropagation();}
    this.router.navigate(['contacts'], {relativeTo: this.route});
    // this.slider.show(this, evt);
  }


}
