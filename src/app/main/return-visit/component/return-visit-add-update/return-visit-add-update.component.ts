import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {
  FollowUpAddRequest,
  FollowUpUpdateRequest,
  FollowUpGetTypeListResponse
} from '../../../../core/messages/return-visit-request-response';
import {FormGroup} from '@angular/forms';
import {WorkerPeople} from '../../../../core/messages/worker-request-response';
import {GlobalState} from '../../../../global.state';
import {WorkerService} from '../../../../core/service/worker.service';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {PostMessage} from '../../../../core/enums/postMessage';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {FRONT_LAYER_POPUP_COMPONENT} from '../../../../core/constants/global-subscriber-events';
import {ReturnVisitPeopleComponent} from '../return-visit-people/return-visit-people.component';
import {InputIcon} from '../../../../shared/component/qiezzi-icon-input/icon-input.component';
import * as WorkerRequestResponse from '../../../../core/messages/worker-request-response';
import {WorkerType} from '../../../../core/enums/worker_type';
import {WorkerInfoModel} from '../../../../core/messages/user-request-response';
import {ApplicationService} from '../../../../core/service/application.service';
import {CreateBillForm} from '../../../../core/forms/charge/create-bill-form';
import * as PatientRequestResponse from '../../../../core/messages/patient-request-response';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {DoubleDate} from '../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {ProcessSentForm} from '../../../../core/forms/process/process-send-form';
import {QiezziSelectPatientComponent} from '../../../../shared/component/qiezzi-select-patient/qiezzi-select-patient.component';
import {PatientModel} from '../../../../core/messages/model/patient.model';
import {CreateReturnVisit} from '../../../../core/forms/return-visit/create-return-visit-form';

@Component({
  selector: 'return-visit-add',
  templateUrl: 'return-visit-add-update.component.html',
  styleUrls: ['return-visit-add-update.component.scss'],
})
export class ReturnVisitAddUpdateComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  inputIconList: InputIcon[];
  /*
  * TODO icon
  * */
  iconListData: any[];
  // 当前登录人
  currentWorker: WorkerInfoModel;

  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};
  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'}
  };
  @Input()
  data: any;
  onParentClose: Function;
  @Output()
  onSelectLeft = new EventEmitter();
  @Output()
  onSelectRight = new EventEmitter();
  returnVisitAdd: any;
  /*
  * todo 选择患者
  * */
  isImportant = false;
  // 表单
  billForm: CreateBillForm = new CreateBillForm();
  // 医生列表
  doctorList= []; // 医生下拉框列表
  dataLoading: string;
  // 回访类型
  returnType= []; // 类型列表
  returnTypeList: FollowUpGetTypeListResponse[];
  tagValues = [];
  constructor(
    private globalState: GlobalState,
    private workerService: WorkerService,
    private el: ElementRef,
    private returnVisitService: ReturnVisitService,
    private application: ApplicationService,
    private form: CustomizeFormValidateService,
  ) {
  super();
  }

  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.iconListData = [{icon: 'contacts', color: '#cccccc'}]; // 姓名输入框Icon
    // 表单验证相关
    this.formName = 'Interview';
    this.formModel = new CreateReturnVisitForm();
    this.form.buildForm(this);
    this.returnVisitAdd = new FollowUpAddRequest();
    this.getWorkerList();
    this.getReturnType();
    if (this.data) { // 如果有id，则为修改
      this.returnVisitAdd = new FollowUpUpdateRequest();
      this.returnVisitAdd.Id = this.data;
      this.getReturnVisitDetail(this.returnVisitAdd.Id);
    }
  }
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  /*
  * TODO 加载医生下拉框
  * */
  getWorkerList() {
    this.workerService.getWorkerList({WorkerType: 1, IsPermission: false, KeyWords: ''}).subscribe(val => {
      if (val && val.Items.length > 0) {
        val.Items.forEach(value => {
          this.doctorList.push({value: value.WorkerId, label: value.WorkerName});
        });
      }else {
        this.application.main.openErrorMessage('暂无医生');
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 加载回访类型
  * */
  getReturnType() {
    this.returnVisitService.getReturnType().subscribe(val => {
      if (val && val.length > 0) {
        this.returnTypeList = val;
        this.returnTypeList.forEach(value => {
          this.returnType.push({value: value.TypeID, label: value.TypeName});
        });
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 加载详情
  * */
  getReturnVisitDetail(id) {
    this.returnVisitService.getReturnVisitDetail(id).subscribe(val => {
      //  Note PatientID Content
      this.formModel.DoctorID = val.DoctorCode;
      this.formModel.InterviewWorkerIDList = val.InterviewWorkerList;
      this.formModel.InterviewDate = val.InterviewDate;
      this.formModel.InterviewType = val.InterviewType;
      this.formModel.Content = val.Content;
      this.formModel.Note = val.Note;
      this.formGroup.patchValue(this.formModel);
      console.log(this.formModel);
    });
  }
  /*
  * TODO 姓名验证
  * */
  onSelectPatient(item: PatientModel) {
    this.formModel['PatientCode'] = item.PatientCode;
    this.formGroup.patchValue(this.formModel);
  }
  /*
  * TODO 选择患者
  * */
  onIconClick(index) {
    if (index === 0) {
      this.application.frontLayer.openPopupWindow(QiezziSelectPatientComponent, '选择患者', PopupWindowSize.SMALL, 810).subscribe(t => {
      });
    }
  }
  /*
  * TODO 弹框  选择回访人
  * */
  onInputIconClicks(evt) {
      this.application.frontLayer.openPopupWindow(ReturnVisitPeopleComponent, '选择回访人', PopupWindowSize.SMALL, 555, this.tagValues, false).subscribe(t => {
        console.log(t);
        if (t && t.data != null) {
          this.tagValues = t.data.data;
          // this.formModel.InterviewWorkerIDList = t.data.data;
          this.formGroup.patchValue(this.formModel);
        }
      });
  }
  /*
  * TODO 保存 新增回访
  * */
  accountTransfer() { // saveReturnVisitUpdate
    if (this.tagValues.length === 0) {
      return false;
    }
    let workerIDList = [];
    this.tagValues.forEach(val => {
      workerIDList.push(val.value);
    });
    this.returnVisitAdd = Object.assign(this.returnVisitAdd, this.formModel);
    this.returnVisitAdd.InterviewWorkerIDList = workerIDList;
    if (this.data) {
      this.returnVisitService.saveReturnVisitUpdate(this.returnVisitAdd).subscribe(value => {
        this.close(value);
      }, error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    }else {
      this.returnVisitService.saveReturnVisitAdd(this.returnVisitAdd).subscribe(value => {
        this.close(value);
      }, error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    }
    this.close();
  }
  /*
  * TODO 取消，关闭弹框
  * */
  cancel() {
    this.close();
  }
}
export class CreateReturnVisitForm {
  /*
   * 备注
   * */
  Note: string = null;
  /*TODO 患者ID
   * */
  PatientID: string = null ;
  /*
   * TODO 医生ID
   * */
  DoctorID: string =  null;
  /*
   * TODO 内容
   * */
  Content: string = null ;
  /*
   * TODO 回访人员
   * */
  InterviewWorkerIDList:  string = null ;
  /*
   * TODO 回访时间
   * */
  InterviewDate:  string = null ;
  InterviewType: number = null;
}
