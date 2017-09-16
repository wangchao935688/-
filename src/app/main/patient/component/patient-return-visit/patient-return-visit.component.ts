import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReturnVisitService} from "../../../../core/service/return-visit.service";
import {FollowUpGetResponse} from "../../../../core/messages/return-visit-request-response";

@Component({
  selector: 'app-patient-return-visit',
  templateUrl: './patient-return-visit.component.html',
  styleUrls: ['./patient-return-visit.component.scss']
})
export class PatientReturnVisitComponent implements OnInit {
  /*
   * TODO 设置参数
   * */
  responseData: FollowUpGetResponse;
  requestData: any;
  patientCode: string;
  dataLoading= false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private ReturnVisitService: ReturnVisitService) { }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientCode = t.patientId;
      this.getReturnVisitNote(); // 获取患者收费记录
    });
  }
  getReturnVisitNote() {
    /*
     * TODO 添加页码
     * */
    this.requestData = {PatientCode: this.patientCode};
    this.ReturnVisitService.getReturnVisitNote(this.requestData).subscribe(val => {
      console.log(val);
    });
  }
  pageChange(evt) {}
}
