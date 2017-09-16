import {Component, Input, OnInit} from "@angular/core";
import {ProcessItemAddModel} from "../../../../core/messages/model/process-item-add.model";
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {ProcessService} from "../../../../core/service/process.service";
import {CreateProcessForm} from "../../../../core/forms/process/create-process-form";
import {
  OutsideProcessAddRequest,
  OutsideProcessUpdateRequest
} from "../../../../core/messages/process-request-response";
import {GlobalState} from "../../../../global.state";
import {WorkerService} from "../../../../core/service/worker.service";
import {QiezziToothPicComponent} from "../../../../shared/component/qiezzi-tooth-pic/qiezzi-tooth-pic.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
/**
 * 新建外加工
 */
@Component({
  selector: 'create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss']
})
export class CreateProcessComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {

  formName: string;
  formGroup: FormGroup;
  // formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  @Input()
  data: string;

  // 牙位模型
  teeth: ProcessItemAddModel[] = [];

  // 外加工form
  formModel: CreateProcessForm;

  // 加工单位数据集合
  processCompanyList: SelectItem[];

  // 医生数据集合
  doctorList: SelectItem[];

  doctorListTemp : SelectItem[];

  patientName: string;

  patientTel: string;

  patientCode: string;

  popupLoading: string = 'hide';

  isDisplay: boolean;

  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};

  //是否正在处理中
  isProcessing=false;

  constructor(private formService: CustomizeFormValidateService, private processService: ProcessService, private globalState: GlobalState, private workerService: WorkerService, private application: ApplicationService) {
    super();
    this.formModel = new CreateProcessForm();
    this.formModel.ItemList = [];
    globalState.subscribe('teethChange', (val) => {
      this.formModel.ItemList[val.index].ToothPlace = val.teeth;
      this.changeProcessNum();
    })
  }

  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  ngOnInit() {
    this.formName = 'CreateProcess';
    this.formService.buildForm(this);

    if (this.data && this.data != '') {
      this.isDisplay = false;
      this.popupLoading = 'show';
      this.processService.getOutsideProcessGet(this.data).subscribe(val => {
        this.formModel.ItemList = val.ItemList;
        this.formModel.DoctorID = val.DoctorID;
        this.formModel.Price = val.Price;
        this.formModel.Note = val.Note;
        this.formModel.ProcessCompanyId = val.ProcessCompanyId;
        this.formModel.VisitingTime = val.VisitingTime;
        this.formModel.ProcessNum = parseInt(val.ProcessNum);
        this.formModel.PatientID = val.PatientModel.Id;
        this.patientCode = val.PatientModel.PatientCode;
        this.patientName = val.PatientModel.PatientName;
        this.patientTel = val.PatientModel.Tel;
        this.popupLoading = 'hide';
        this.isDisplay = true;
      });
    } else {
      this.isDisplay = true;
    }
    this.processCompanyList = [];
    this.processService.getOutsideProcessGetCompanyList().subscribe(val => {
      val.forEach(item => {
        this.processCompanyList.push({label: item.Name, value: String(item.Id)});
      })
    });

    this.doctorList = [];
    this.doctorListTemp=[];
    this.workerService.getWorkerList({WorkerType: 0}).subscribe(val => {
      val.Items.forEach(item => {
        this.doctorListTemp.push({label: item.WorkerName, value: String(item.WorkerId)});
      });
      this.doctorList=this.doctorListTemp;
    });

    let nss=[1,2,3];
    Observable.from(nss).subscribe(t=>console.log(t));
    nss.push(6);
  }

  /**
   * 添加牙位
   */
  addTooth() {
    this.application.frontLayer.openPopupWindow(QiezziToothPicComponent, '牙位', PopupWindowSize.LARGE, 'auto', {}, false).subscribe(t => {
      if (t && t != null && t.data != null) {
        let teeth = new ProcessItemAddModel();
        teeth.ToothPlace = [];
        if (t.data.teeth) {
          teeth.ToothPlace = t.data.teeth;
          this.formModel.ItemList.push(teeth);
          this.changeProcessNum();
          console.log(t);
        }
      }
    })
  }

  /**
   * 重新计算加工数量
   */
  changeProcessNum() {
    this.formModel.ProcessNum = 0;
    this.formModel.ItemList.forEach(item => {
      this.formModel.ProcessNum += item.ToothPlace.length;
    });
  }

  /**
   * 删除牙位
   * @param evt
   */
  deleteTooth(evt: any) {
    try {
      let num = this.formModel.ItemList[evt].ToothPlace.length;
      this.formModel.ItemList.splice(evt, 1);
      this.formModel.ProcessNum -= num;
    } catch (exception) {
    }

  }

  /**
   * 新建外加工
   */
  ok() {
    this.isProcessing=true;
    if (this.data && this.data != '') {
      let model = new OutsideProcessUpdateRequest();
      model.Id = this.data;
      model.DoctorID = this.formModel.DoctorID;
      model.ProcessCompanyId = this.formModel.ProcessCompanyId;
      model.ItemList = this.formModel.ItemList;
      model.Note = this.formModel.Note;
      model.ProcessNum = this.formModel.ProcessNum;
      model.Price = this.formModel.Price;
      model.VisitingTime = this.formModel.VisitingTime;
      this.processService.postOutsideProcessUpdate(model).subscribe(val => {
        this.isProcessing=false;
        this.application.main.openPromptMessage('修改成功！');
          this.close(val);
        },
        error=>{
          this.application.main.openErrorMessage(error.errorMessage);
          this.isProcessing=false;
        }
      );
    } else {
      let model = new OutsideProcessAddRequest();
      model.PatientID=this.formModel.PatientID;
      model.DoctorID=this.formModel.DoctorID;
      model.Price=this.formModel.Price;
      model.ProcessNum=this.formModel.ProcessNum;
      model.ProcessCompanyId=this.formModel.ProcessCompanyId;
      model.ItemList=this.formModel.ItemList;
      model.Note=this.formModel.Note;
      model.VisitingTime=this.formModel.VisitingTime;
      this.processService.postOutsideProcessAdd(model).subscribe(val => {
        this.isProcessing=false;
        this.application.main.openPromptMessage('添加成功！');
        this.close(val);
        },
        error=>{
          this.application.main.openErrorMessage(error.errorMessage);
          this.isProcessing=false;
        }
      );
    }
  }
}
