import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {CaseService} from '../../../../core/service/case.service';
import {GetCaseListByRequest, GetCaseListByResponse} from '../../../../core/messages/case-request-response';
import {ApplicationService} from '../../../../core/service/application.service';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkerService} from "../../../../core/service/worker.service";
import {PatientService} from "../../../../core/service/patient.service";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
/*
* 参数设置
* */
  getCaseListByRequest: GetCaseListByRequest;
  getCaseListByResponse: GetCaseListByResponse;
/*
* 基本设置
* */
  doctorList = []; // 全部医生员工
  tagList = []; // 标签列表
  doctorSelectValue: any; // 选中医生的值
  displayStatus = ''; // 路由出口
  isBorder = false; // 滚动条上边框
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  mainShowLoading = 'hide'; // 全局加载框
  dataLoading = 'hide'; // 列表加载框
  selectIndex: number;  // 列表选中项的index
  showEmptyState = false; // 空数据状态，默认隐藏
  showOrHide: any = {}; // 分页设置

  constructor(private caseService: CaseService,
              public application: ApplicationService,
              private slider: CustomizeSliderService,
              private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private workerService: WorkerService,
              private patientService: PatientService) { }

  ngOnInit() {
    this.getCaseListByRequest = new GetCaseListByRequest();
    this.getWorkerList(); // 加载医生列表
    this.getPatientRelationTypeList(); // 加载患者标签
    this.getCaseList(); // 加载病历列表
  }
  ngAfterViewInit() {
    this.mainShowLoading = 'show';
  }
  /*
  * TODO 下拉选择医生
  * */
  onDoctorChange(evt) {
    console.log(evt);
    if (evt !== -1) {
      this.getCaseListByRequest.doctorID = this.doctorList[evt].value;
    }
  }
  /*
  * TODO 下拉选择标签
  * */
  onTagChange(evt) {
    console.log(evt);
    if (evt !== -1) {
      this.getCaseListByRequest.relationID = this.doctorList[evt].value;
    }
  }
  /*
   * TODO 选择左侧时间控件
   * */
  selectLeft(evt) {
    console.log(evt);
    if (evt) {
      this.getCaseListByRequest.beginTime = evt;
    }
  }
  /*
   * TODO 选择右侧时间控件
   * */
  selectRight(evt) {
    console.log(evt);
    if (evt) {
      this.getCaseListByRequest.endTime = evt;
    }
  }
  /*
  * TODO 按条件查询病例列表
  * */
  searchProcessList() {
    // this.getCaseList();
    this.getInfo();
  }
  /*
  * TODO 点击  加载病历列表
  * */
  getInfo () {
    this.dataLoading = 'show';
    this.getCaseList();
  }
  /*
  * TODO 请求病历列表
  * */
  getCaseList() {
    if (this.getCaseListByResponse) {
      this.getCaseListByResponse.Items = [];
    }
    this.caseService.getAllCaseList( this.getCaseListByRequest ).subscribe(val => {
      this.dataLoading = 'hide';
      this.mainShowLoading = 'hide';
      if (val && val['Items'] && val['Items'].length > 0) { // or  val && val.length
        // 赋值
        this.getCaseListByResponse = val;
        this.showEmptyState = false;
      }else {
        // 状态为空数据
        this.showEmptyState = true;
      }
    }, error => {
      this.dataLoading = 'hide';
      this.mainShowLoading = 'hide';
      this.showEmptyState = true;
      this.getCaseListByResponse.TotalItems = 0;
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 点击列表项，弹出侧滑详情
  * */
  openDetail(evt, id, index) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {evt.stopPropagation(); }
    this.selectIndex = index; // 添加选中框
    this.router.navigate(['case', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
  /*
   * TODO 分页切换页面
   * */
  onPageChange(evt) {
    this.getCaseListByRequest.PageIndex = evt.page;
    this.getCaseList();
  }
  /*
  * 加载所有医生
  * */
  getWorkerList() {
    this.doctorList = [];
    this.workerService.getWorkerList({WorkerType: 0, IsPermission: true}).subscribe(val => {
      if (val && val.Items && val.Items.length > 0) {
        val.Items.forEach((value) => {
          this.doctorList.push({label: value.WorkerName, value: value.WorkerId});
        });
        this.doctorList = Array.from( this.doctorList);
      }else {
        this.application.main.openErrorMessage('还没添加医生');
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * 加载所有标签
  * */
  getPatientRelationTypeList() {
    this.tagList = [];
    this.patientService.getPatientRelationTypeList(null).subscribe(val => {
      if (val && val.length > 0) {
        val.forEach((value) => {
          this.tagList.push({label: value.Code, value: value.Name});
        });
        this.tagList = Array.from( this.tagList);
      }else {
        this.application.main.openErrorMessage('暂无患者标签');
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * header方法
  * */
  onControl(evt) {
    this.router.navigate(['../create'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
  onOptions(evt) {
    this.router.navigate(['../case-option'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
  onSearch(evt) {}
  onShowFilter(evt) {}
}
