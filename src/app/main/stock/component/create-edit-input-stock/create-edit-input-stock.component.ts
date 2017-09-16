import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {PatientService} from '../../../../core/service/patient.service';
import {SavePatientRequest} from '../../../../core/messages/patient-request-response';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';
import {ApplicationService} from '../../../../core/service/application.service';

import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {WorkerService} from '../../../../core/service/worker.service';
import {WorkerListRequest, WorkerListResponse} from '../../../../core/messages/worker-request-response';
import {DictDetailListRequest, DictDetailListResponse} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {SystemService} from '../../../../core/service/system.service';

import {ActivatedRoute, Router} from "@angular/router";
import {ChargeService} from '../../../../core/service/charge.service';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {UserService} from '../../../../core/service/user.service';
import * as UserRequestResponse from '../../../../core/messages/user-request-response';
import {QiezziDataFilterComponent} from "../../../../shared/component/qiezzi-data-filter/qiezzi-data-filter.component";
import {CustomizeSliderService, ICustomizeSlider} from "../../../../core/service/customize-slider.service";
import {WorkerType} from "../../../../core/enums/worker_type";
import * as WorkerRequestResponse from '../../../../core/messages/worker-request-response';
import {WorkerSimple} from '../../../../core/messages/model/worker_simple';
import * as GlobalDic from '../../../../core/global_dic';
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
// import { CreateEditInputStockComponent } from '../create-edit-input-stock/create-edit-input-stock.component';
import { SelectGoodsComponent } from '../select-goods/select-goods.component';

@Component({
  selector: 'app-create-edit-input-stock',
  templateUrl: './create-edit-input-stock.component.html',
  styleUrls: ['./create-edit-input-stock.component.scss']
})
export class CreateEditInputStockComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate {


  isBorder: boolean;
  //当前选中项
  selectIndex: number;
  //是否显示没有数据
  showEmptyState = false;
  //分页显示
  showOrHide: any = {};
//数据加载中状态
  dataLoading: string;
//全屏的加载状态
  mainShowLoading = 'hide';
  //侧滑显示隐藏
  displayStatus: string;

  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};

  /*
   * 设置请求参数
   * */
  savePatientRequest: SavePatientRequest;
  workerListRequest: WorkerListRequest; // 医生列表请求
  workerListResponse: WorkerListResponse; // 医生列表
  doctorFirstList = []; // 医生下拉列表
  patientsWithListRequest: DictDetailListRequest; // 患者来源请求
  patientsWithList = []; // 患者来源下拉列表
  provList = [];
  cityList = [];
  countryList = [];
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  isDisplay = true;
  popupLoading = 'hide';
  isImponent = false; // 标记患者是否重要
  tagList = []; // 设置空标签


// 供应商集合
//   doctorList: SelectItem[];
  supplierList = [
    {value: '0', label: '供应商1'},
    {value: '1', label: '供应商2'},
    {value: '2', label: '供应商3'}];
// 入入库日期1期
  inputStockDateList = [
    {value: '0', label: '入库日期1'},
    {value: '1', label: '入库日期2'},
    {value: '2', label: '入库日期3'}];
// 库管员
  stockmanList = [
    {value: '0', label: '库管员1'},
    {value: '1', label: '库管员2'},
    {value: '2', label: '库管员3'}
  ];

  constructor(private el: ElementRef,
              private chargeService: ChargeService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private workerService: WorkerService,
              private PatientService: PatientService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private HospitalService: HospitalService,
              private SystemService: SystemService) {
    super();
    /*this.request.PageIndex = 1;
     this.request.PageSize = 2;
     this.request.StartTime = '';
     this.request.EndTime = '';
     this.request.KeyWords = '';
     this.request.DoctorCode = '';*/
  }

  ngOnInit() {

  }

  onInputElementBlur(name) {
    console.log(111)
    // const input = this.formGroup.get(name);
    // if (input) {
    //   input.markAsTouched(true);
    //   input.markAsDirty(true);
    //   input.patchValue(this.formModel[name] || '');
    // }
  }

  onFeeEdit() {
    console.log(111)
  }

  /*
   onFeeEdit(fee: BillRequestResponse.BillModel, e) {
   if (e.target.tagName.toLowerCase() == 'i') {
   this.application.frontLayer.openPopupWindow(CreateFeeComponent, '编辑收费单', PopupWindowSize.LARGE, 660, {'feeId': fee.ID}, false)
   .subscribe(t => {
   console.log("刷新列表了");
   this.getBillList();
   });
   e.stopPropagation();
   }
   }
   */


  clickFeeItem() {
    console.log(111)
  }

  /*
   clickFeeItem(evt, fee: BillRequestResponse.BillModel, i) {
   if (evt.currentTarget.className.indexOf('list-table-item') > -1)
   evt.stopPropagation();

   this.selectIndex = i;
   this.router.navigate(['fee',fee.ID],{ relativeTo: this.route});
   this.slider.show(this, evt);
   }
   */
  /**
   * 去收费
   * @param feeId
   * @param e
   */
  goCharge() {
    console.log(111)
  }

  /*
   goCharge(feeId, e) {
   console.log(111);
   if (e.target.tagName.toLowerCase() == 'i') {
   this.application.frontLayer.openPopupWindow(ChargeComponent, '收费', PopupWindowSize.LARGE, 580, {'feeId': feeId}, false)
   .subscribe(t => {
   console.log("刷新列表了");
   this.getBillList();
   });
   e.stopPropagation();
   }
   }
   */
  ngAfterViewInit(): void {
    // this.mainShowLoading =  'show';
    console.log(111)
  }


  /*
   * TODO 提交患者信息
   * */
  save() {
    // console.log(this.formModel);
    this.PatientService.createPatient(this.formModel).subscribe(val => {
      /*
       * TODO 关闭页面
       * TODO 提示成功或失败
       * TODO 关闭弹框，并发送消息
       * */
      // console.log(val['PatientID']);
      this.close();
    });
  }

  /*
   * TODO 取消患者
   * */
  cancel() {

    /*
     * TODO 关闭弹框
     * */
    this.close();
  }

  /**
   * 点击添加入库物品
   */
  addInput(){
    this.openChild();
    this.application.frontLayer.openPopupWindow(SelectGoodsComponent, '选择物品',PopupWindowSize.LARGE, 730, null, false).subscribe(t => {
      if (t && t.type === 'close')
        this.closeChild();
      console.log(t);
    })
  }

  /**
   * 编辑修改
   * @param e
   */
  edit(e){

  }

  /**
   * 删除
   * @param e
   */
  delete(e){

  }
}
