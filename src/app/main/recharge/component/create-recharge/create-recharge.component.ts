import {Component, OnInit} from '@angular/core';
import {CreateRechargeForm} from '../../../../core/forms/recharge/create-recharge-form';
import * as Recharge from '../../../../core/messages/recharge-request-response';
import {RechargeService} from '../../../../core/service/recharge.service';
import {PatientService} from '../../../../core/service/patient.service';
import {WorkerService} from '../../../../core/service/worker.service';
import * as Worker from '../../../../core/messages/worker-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import * as HospitalAccount from '../../../../core/messages/hospital-account-request-response';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
/**
 * 充值
 */
@Component({
  selector: 'recharge-core',
  templateUrl: 'create-recharge.component.html',
  styleUrls: ['./create-recharge.scss']
})
export class CreateRechargeComponent implements OnInit {
  moduleName = '充值';
  rechargeForm: CreateRechargeForm;

  accountBalance: number;
  today = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate(); // 今日日期
  currMoney = 0;
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  // 推荐人
  referee = [];

  accountList = [];

  constructor(private rechargeService: RechargeService,
              private patientService: PatientService,
              private workerService: WorkerService,
              private hospitalService: HospitalService) {
    this.rechargeForm = new CreateRechargeForm();
    this.rechargeForm.AccountRechargeModel = {ID: '', Money: null};
    this.rechargeForm.PatientID = '';
    this.rechargeForm.Note = '';
    this.rechargeForm.ReferrerId = '';
  }
  ngOnInit(): void {
    this.getHospitalAccountTypeList();
    this.getWorkerList();
  }

  /*
  * TODO 获取账户列表
  * */
  getHospitalAccountTypeList( ) {
    this.hospitalService.getHospitalAccountTypeList().subscribe(val => {
      if (val) {
        val.forEach( value => {
          this.accountList.push( { value: value.TypeCode, label: value.TypeName } );
        } );
      }
    });
  }
  /*
  * TODO 获取推荐人列表
  * */
  getWorkerList() {
    this.workerService.getWorkerList({WorkerType: null, IsPermission: false, KeyWords: ''}).subscribe(val => {
      if (val) {
        val.Items.forEach( value => {
          this.referee.push( { value: value.WorkerId, label: value.WorkerName } )
        })
      }
    });
  }
  /*
  * TODO 保存充值记录
  * */
  saveRecharge(): void {
    let requestData = new Recharge.RechargeRechargeRequest();
    requestData.PatientID = this.rechargeForm.PatientID;
    requestData.AccountRechargeModel = this.rechargeForm.AccountRechargeModel;
    requestData.Note = this.rechargeForm.Note;
    requestData.ReferrerId = this.rechargeForm.ReferrerId;
    this.rechargeService.createRecharge(requestData).subscribe();
  }
/*
* TODO 姓名搜索框，模糊搜索
* */
  selectPatient(evt: any): void {
    this.rechargeForm.PatientID = evt;
    this.patientService.getPatientBalance({patientID: evt}).subscribe(val => {
        this.accountBalance = val;
      }
    )
    ;
  }
  /*
  * TODO 下拉框取值
  * */
  onChange(evt) {
    console.log(evt);
  }
  ok() {}
  cancel() {}
}
