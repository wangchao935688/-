import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../core/service/patient.service';
import {CaseService} from '../../../../core/service/case.service';
import {
  CaseDetailsRequest, CaseDetailsResponse,
  CaseListResponse
} from '../../../../core/messages/case-request-response';

@Component({
  selector: 'app-patient-case',
  templateUrl: './patient-case.component.html',
  styleUrls: ['./patient-case.component.scss']
})
export class PatientCaseComponent implements OnInit {
  /*
  * TODO 设置参数
  * */
  caseDetailsRequest: CaseDetailsRequest;
  caseDetailsResponse: CaseDetailsResponse;
  patientId: string;
  tagList= [];
  selectIndex= 0;
  item: any;
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsRight= { // 右侧滚动条设置
  axis: 'y', theme: 'minimal-dark'
};
  CaseList: CaseListResponse;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private PatientService: PatientService,
              private CaseService: CaseService) { }

  ngOnInit() {
    /*
    * 获取Id，请求患者病例
    * */
    this.item = [1, 15, 22, 33, 42];
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.getCaseList(); // 获取患者病例
    });
  }
  /*
  *  TODO 获取患者病例列表
  * */
  getCaseList() {
    this.CaseService.getCaseList({patientID: this.patientId}).subscribe(val => {
      console.log(val);
      if (val) {
        this.CaseList = val;
        this.getCaseDetails(val.Items[0].Id, 0);
      }
    });
  }
  /*
  * TODO 根据病例ID 获取病例详情
  * */
  getCaseDetails(id, i) {
    this.selectIndex = i;
    this.caseDetailsRequest = { Id : id};
    this.tagList = [];
    this.CaseService.getCaseDetails(this.caseDetailsRequest).subscribe(val => {
      console.log(val);
      if (val) {
        this.caseDetailsResponse = val;
        if (this.caseDetailsResponse.RelationNameList && this.caseDetailsResponse.RelationNameList.length > 0) {
          this.caseDetailsResponse.RelationNameList.forEach(value => {
            this.tagList.push({title: value.Name});
          });
        }
      }
    });
  }
}
