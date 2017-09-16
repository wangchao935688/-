import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {SmsService} from "../../../../core/service/sms.service";
import {ApplicationService} from "../../../../core/service/application.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {ContactService} from "../../../../core/service/contact.service";
import {GetListRequest, GetListResponse} from "../../../../core/messages/contact-request-response";
import {PatientService} from "../../../../core/service/patient.service";
import {GetPatientListRequest, GetPatientListResponse} from "../../../../core/messages/patient-request-response";
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";
import {DictDetailListRequest} from "../../../../core/messages/dict-request-response";
import {HospitalService} from "../../../../core/service/hospital.service";

@Component({
  selector: 'app-select-receiver',
  templateUrl: './select-receiver.component.html',
  styleUrls: ['./select-receiver.component.scss']
})
export class SelectReceiverComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {
  /*
  * 参数设置
  * */
  dictDetailListRequest: DictDetailListRequest; // 请求患者来源
  IsChooseAll = false; // 全选复选框,默认未选中
  patientCheckedList= []; // 选中联系人列表
  checkBoxList = []; // 所有多选框选中状态
  getPatientListRequest: GetPatientListRequest = new GetPatientListRequest();
  getPatientListResponse: GetPatientListResponse;
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'}; // 滚动条配置
  mainShowLoading = 'hide';
  @ViewChild(QiezziDataFilterComponent)
  dataFilterComponent: QiezziDataFilterComponent;
  filterConfig: any = {
    'doctorList': {
     title: '医生',
     type: 'list',
     data: ['庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪', '庄恕', '陆晨曦', '扬帆', '陈绍聪']
     },
    'Address': {title: '患者地址', type: 'text', placeholder: '地址'},
    'visitTime': {title: '就诊日期', type: 'time'},
    'nurseList': {title: '护士', type: 'list', data: ['杨羽']},
    'patientClassification': {title: '患者分类', type: 'list', data: ['重要患者', '欠费患者']},
    'patientBirthday': {title: '患者生日', type: 'time'},
    'PatientsWith': {title: '患者来源', type: 'list', data: []},
    'Aim': {title: '就诊事项', type: 'list', data: ['亲友介绍', '户外广告']},
    'RelationCode': {title: '患者标签', type: 'list', data: ['亲友介绍', '户外广告']}
  };
  isShowFilter = true; // 控制显示过滤器隐藏显示
  constructor(private router: Router,
              private slider: CustomizeSliderService,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private smsService: SmsService,
              private contactService: ContactService,
              private hospitalService: HospitalService,
              private patientService: PatientService) {
    super();
  }

  ngOnInit() {
    this.getList(); // 加载收信人列表(患者列表)
    this.searchContentList(); // 加载患者来源，显示到高级筛选
  }
  ngAfterViewInit() {
    this.mainShowLoading = 'show';
  }
  /*
  * 筛选加载loading
  * */
  getListLoading() {
    this.mainShowLoading = 'show';
    this.getList();
  }
  /*
  * TODO 加载收信人列表
  * */
  getList() {
    this.patientService.GetPatientList(this.getPatientListRequest).subscribe(val => {
      this.mainShowLoading = 'hide';
      console.log(val);
      if (val) {
        this.getPatientListResponse = val;
        this.getPatientListResponse.Items.forEach( value => {
          this.checkBoxList.push(false);
        } );
      }
    }, error => {
      this.mainShowLoading = 'hide';
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
   * TODO 选择全部联系人
   * */
  selecctAllCheckBox(bool) {
    this.patientCheckedList = [];
    this.checkBoxList = [];
    if (bool) {
      this.getPatientListResponse.Items.forEach(value => {
        this.patientCheckedList.push({title: value.PatientName, value: value.Id});
        this.checkBoxList.push(true);
      });
    }else {
      this.getPatientListResponse.Items.forEach(value => {
        this.checkBoxList.push(false);
      });
    }
  }
    /*
    * TODO 取消和选中一个联系人
    * */
  selectBox(name, id, tel, index) {
    if (tel) {
      let canAdd = true;
      this.patientCheckedList.forEach((val, key) => {
        if (val.value === id) {
          this.patientCheckedList.splice(key, 1);
          this.checkBoxList[index] = false;
          canAdd = false;
        }
      });
      if (canAdd) {
        this.patientCheckedList.push({title: name, value: id});
        this.checkBoxList[index] = true;
      }
    }else {
      this.application.main.openErrorMessage('您选的联系人没有手机号');
    }
  }
  /**
   * TODO 确定选择联系人
   */
  ok() {
    this.close(this.patientCheckedList);
  }

  /**
   * TODO 取消选择
   */
  cancel() {
    this.close();
  }
  /*
  * TODO 高级筛选
  * */
  onConditionChanged(evt) {
    console.log(evt);
    this.getListLoading();
  }
  /*
   * TODO 加载  患者来源  列表,用于筛查
   * */
  searchContentList() {
    this.dictDetailListRequest = {SheetCode: 'PatientsWith'};
    this.hospitalService.getDictDetailList(this.dictDetailListRequest).subscribe(val => {
      val.Items.forEach((value) => {
        this.filterConfig.PatientsWith.data.push(value.Name);
      });
    });
  }
  /*
   *  显示筛选框
   * */
  onShowFilter() {
    this.dataFilterComponent.changeStatus(this.isShowFilter);
    this.isShowFilter = !this.isShowFilter;
  }
}

