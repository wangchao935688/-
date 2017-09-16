import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {QiezziDataFilterComponent} from '../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../core/service/patient.service';
import * as dic from '../../../../core/global_dic';
import {
  GetPatientListRequest, GetPatientListResponse, SearchPatientRequest
} from '../../../../core/messages/patient-request-response';
import {CreatePatientComponent} from '../create-patient/create-patient.component';
import {ApplicationService} from 'app/core/service/application.service';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CustomizeSliderService} from 'app/core/service/customize-slider.service';
import {DictDetailListRequest} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {WorkerListRequest} from "../../../../core/messages/worker-request-response";
import {WorkerService} from "../../../../core/service/worker.service";

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  /*
  * TODO 设置参数
  * */
  workerListRequest: WorkerListRequest = new WorkerListRequest(); // 医生列表请求
  patientList: GetPatientListResponse = new GetPatientListResponse(); // 患者列表
  requestData: GetPatientListRequest = new GetPatientListRequest(); // 患者列表请求数据
  SearchPatientRequest: SearchPatientRequest = new SearchPatientRequest(); // 搜索患者请求数据
  DictDetailListRequest: DictDetailListRequest; // 字典列标
  displayStatus = '';
  gender = dic.gender;
  showEmptyState= false;
  mainShowLoading: string; // 全局加载框初始化隐藏
  dataLoading = 'hide';
  @ViewChild('centerRouterLoading')
  centerRouterLoading: QiezziLoadingComponent;
  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;
  filterConfig: any = {
    /*'doctorList': {
      title: '医生',
      type: 'list',
      data: ['庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪']
    },*/
    'Address': {title: '患者地址', type: 'text', placeholder: '地址'},
    'visitTime': {title: '就诊日期', type: 'time'},
    'nurseList': {title: '护士', type: 'list', data: ['杨羽']},
    'patientClassification': {title: '患者分类', type: 'list', data: ['重要患者', '欠费患者']},
    'patientBirthday': {title: '患者生日', type: 'time'},
    'PatientsWith': {title: '患者来源', type: 'list', data: []},
    'Aim': {title: '就诊事项', type: 'list', data: []},
    'RelationCode': {title: '患者标签', type: 'list', data: ['亲友介绍', '户外广告']}
  };
  controlList = [ '发短信给所选患者', '发短信给所有患者', '导出所选患者', '导出所有患者'];
  IsCtrl = false;
  /*
  * 参数声明
  * */
  moduleName = '患者管理'; // 标题名
  PageIndex: number; // 页码
  PageSize: number; // 每页条数
  listData: any = null;
  currentIdx = 0;
  showOrHide: any = {};
  isBorder: boolean;
  showEmpty: boolean;
  // 暂时的属性
  radioSelectValue = [];
  selectIndex: number;
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  IsChooseAll: boolean; // 全选复选框
  patientCheckedList= [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private patientService: PatientService,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private hospitalService: HospitalService,
              private workerService: WorkerService) {
  }
  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement; // 设置跳转
    this.requestData.OrderBy = 8; // 排列方式
    this.getPatientList(); // 请求患者列表
    this.searchContentList(); // 请求患者来源
    this.getWorkerList(); // 请求医生和护士
    this.getWorkersList(); // 请求医生
    /*
    * TODO 搜索参数初始化
    * */
    this.SearchPatientRequest = {
      KeyWords: '',
      IsOnlyName: false,
      PageIndex: 1,
      PageSize: 10
    };
  }
  ngAfterViewInit(): void {
    this.mainShowLoading =  'show';
  }
  /*
  * TODO 跳转到详情页
  * */
  clickFeeItem(evt, patientId, i) {
    let target = evt.srcElement || evt.target;
    if (target.className.indexOf('checkBox') > -1) {
      evt.stopPropagation();
      return true;
    }else if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
      this.selectIndex = i;
      this.router.navigate(['index', patientId], {relativeTo: this.route});
      this.slider.show(this, evt);
    }
  }
  /*
  * TODO 点击获取患者列表
  * */
  clickGetPatientList() {
    this.dataLoading = 'show';
    this.getPatientList();
  }
  /**
   * TODO 获取患者列表
   */
  getPatientList() {
    this.patientList.TotalItems = 0;
    this.dataLoading = 'show';
    if (this.patientList) {
      this.patientList.Items = [];
      this.patientList.TotalItems = 0;
    }
    this.patientService.GetPatientList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val && val.Items.length > 0) {
        this.patientList = val;
        this.patientList.Items.forEach( (value) => {
          if (value.AimString) {
            value.AimString = value.AimString.split(',').join('/');
          }
        } );
      }else {
        this.showEmptyState = true;
      }
      this.mainShowLoading = 'hide';
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      this.mainShowLoading = 'hide';
    });

  }
  /*
  * TODO 患者管理设置
  * */
  onOptions(event) {
    this.router.navigate(['patient/options']);
  }
  /*
   * TODO 筛选过滤
   * */
  onConditionChanged(filter) {
    Object.assign( this.requestData, filter);
    this.clickGetPatientList();
  }
  // TODO  新增患者
  onControlClick(evt: any) {
    if (evt === 0) {
      this.application.frontLayer.openPopupWindow( CreatePatientComponent, '新增患者', PopupWindowSize.MIDDLE, 680, null, false).subscribe(t => {
        if (t) {
          console.dir(t['data']['data']);
          this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
          this.clickGetPatientList();
        }
      });
    }
  }
  /*
* TODO 患者搜索
* */
  onSearch(key) {
    console.log(key);
    this.SearchPatientRequest.KeyWords = key;
    this.patientService.searchPatient(this.SearchPatientRequest).subscribe(val => {
      this.patientList = val;
    });
  }
/*
* TODO 按照消费最多、最近就诊、最新患者、充值最多请求患者列表
* */
  onChange(event) {
    switch (event) {
      case -1: this.requestData.OrderBy = 8; break;
      case 1: this.requestData.OrderBy = 2; break;
      case 2: this.requestData.OrderBy = 12; break;
      case 3: this.requestData.OrderBy = 13; break;
    }
    this.clickGetPatientList();
  }
  /*
  * TODO 加载  患者来源  列表,用于筛查
  * */
  searchContentList() {
    this.DictDetailListRequest = {SheetCode: 'PatientsWith'};
    this.hospitalService.getDictDetailList(this.DictDetailListRequest).subscribe(val => {
      // console.log(val.Items);
      val.Items.forEach((value) => {
        this.filterConfig.PatientsWith.data.push(value.Name);
      });
    });
  }
  /*
  * TODO 加载 就诊事项 ，用于筛查
  * */
  getWorkContentList() {
    this.DictDetailListRequest = {SheetCode: 'WorkContent'};
    this.hospitalService.getDictDetailList(this.DictDetailListRequest).subscribe(val => {
      console.log(val);
      val.Items.forEach((value) => {
        this.filterConfig.Aim.data.push(value.Name);
      });
    });
  }
  /*
  * TODO 加载护士列表
  * */
  getWorkerList() {
    this.workerService.getGetList({workerTypeArray: [0, 1]}).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 加载医生列表
  * */
  getWorkersList() {
    this.workerListRequest.WorkerType = 0;
    this.workerService.getWorkerList(this.workerListRequest).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /**
   * TODO 分页改变
   * @param evt
   */
  onPageChange(evt: any) {
    this.requestData.PageIndex = evt.page;
    this.requestData.PageSize = evt.rows;
    this.clickGetPatientList();
  }
  /*
   * TODO 全选复选框
   * */
  selecctAllCheckBox(bool) {
    this.IsChooseAll = bool;
    this.patientCheckedList = [];
    if (bool) {
      this.patientList.Items.forEach(value => {
        this.patientCheckedList.push(value.Id);
      });
    }
  }
  selectBox(id) {
    if ( this.patientCheckedList.indexOf(id) > -1) {
      this.patientCheckedList.splice(this.patientCheckedList.indexOf(id), 1);
    }else {
      this.patientCheckedList.push(id);
    }
    console.log(this.patientCheckedList);
  }
  /*
   *  显示筛选框
   * */
  onShowFilter(stat) {
    this.dataFilterComponent.changeStatus(stat);
  }
  /*
  * 列表右侧控制框
  * */
  rightCtrl() {
    this.IsCtrl = !this.IsCtrl;
  }
  /*
  * 点击控制框选项，触发事件
  * */
  moreItemClick(evt, i) {
    console.log(i);
    switch (i) {
      case 0 : console.log(i); break;
      case 1 : console.log(i); break;
      case 2 : console.log(i); break;
      case 3 : console.log(i); break;
    }
    this.IsCtrl = !this.IsCtrl;
  }

  /*
  * 滚动条，显示边框
  * */
  onScroll(evt) {
    this.isBorder = evt.top < -55;
  }
  onControl(evt) {}
}
