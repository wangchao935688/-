import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientCenterRequest, PatientCenterResponse} from '../../../../core/messages/patient-request-response';
import {PatientService} from '../../../../core/service/patient.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {
  /*
   * TODO 设置参数类型
   * */
  PatientCenterResponse: PatientCenterResponse;
  PatientCenterRequest: PatientCenterRequest;
  patientId: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t.patientId;
    });
  }
/*
  * TODO 患者详情
* */
  getPatientCenter() {
    this.PatientCenterRequest = { Id : this.patientId};
    this.patientService.getPatientCenter(this.PatientCenterRequest).subscribe(val => {
      console.log(val);
      if (val) {
        setTimeout(() => {
          this.PatientCenterResponse = val;
        }, 0);
      }
    });
  }
}
