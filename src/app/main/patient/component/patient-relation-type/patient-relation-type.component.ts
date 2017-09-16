import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from '../../../../core/service/application.service';

@Component({
  selector: 'app-patient-relation-type',
  templateUrl: './patient-relation-type.component.html',
  styleUrls: ['./patient-relation-type.component.scss']
})
export class PatientRelationTypeComponent implements OnInit {
/*
* TODO 设置参数
* */
  @Input()
  patientId: string;
  list= [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private mScrollbarService: MalihuScrollbarService,
              private PatientService: PatientService,
              private el: ElementRef,
              private application: ApplicationService) { }

  ngOnInit() {
    this.getPatientRelationTypeList();
  }
  /*
   *  TODO 获取患者标签
   * */
  getPatientRelationTypeList() {
    this.list = [];
    this.PatientService.getPatientRelationTypeList(null).subscribe(val => {
      console.log(val);
      if (val) {
        // this.tagList = val;
        val.forEach( value => {
          this.list.push(value);
        } );
      }
    });
  }
  /*
  * TODO 保存标签
  * */
  onItemClick(evt) {
    console.log(evt);
  }
  save() {
    this.application.main.openPromptMessage('选取成功！');
    this.close();
  }
  close() {
    this.close();
  }
}
