import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../../core/service/patient.service";
import {GetPatientListRequest} from "../../../core/messages/patient-request-response";
import {PopupWindowBaseComponent} from "../qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: '',
  templateUrl: './qiezzi-select-patient.component.html',
  styleUrls: ['./qiezzi-select-patient.component.scss']
})
export class QiezziSelectPatientComponent extends PopupWindowBaseComponent implements OnInit {
  tabData: any;
  selectIndex: number;
  request: GetPatientListRequest;
  searchKey: string;
  listData: any;
  data: any;
  constructor(private patientService: PatientService) {
    super()
  }

  ngOnInit() {
    this.request = new GetPatientListRequest();
    this.request.Address = null;
    this.request.Aim = null;
    this.request.DoctorCode = null;
    this.request.EndTime = null;
    this.request.IsArrearage = null;
    this.request.PatientsWith = null;
    this.request.RelationCode = null;

    this.request.IsImportant = null;
    this.request.OrderBy = null;
    this.request.SatrtTime = null;
    this.request.PageIndex = null;
    this.request.PageSize = null;
    this.tabData = {data: ['最近就诊', '最新患者', '重要患者'], defaultIndex: 0};

    this.request.KeyWords = this.searchKey;
    this.request.OrderBy = 8;

    this.request.PageSize = 10;

  }

  getPatientList(pageIndex: number, isImportant: boolean,) {
    this.request.PageIndex = 1;
    this.request.IsImportant = null;
    this.patientService.GetPatientList(this.request).subscribe(t => {
      this.data = t;
      this.listData = this.data.Items;
    })
  }

  changeTab(index) {

  }

  itemClick() {

  }

  pageChange(evt) {
  }
}
