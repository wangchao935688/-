import {Component, ElementRef, OnInit} from '@angular/core';
import {PatientService} from '../../../../core/service/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GetPatientRequest, GetPatientResponse} from '../../../../core/messages/patient-request-response';
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {ApplicationService} from "../../../../core/service/application.service";
import {EditPatientComponent} from "../edit-patient/edit-patient.component";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  /*
  * TODO 设置参数
  * */
  patientId: string;
  GetPatientRequest: GetPatientRequest;
  GetPatientResponse: GetPatientResponse;
  /*
  * TODO 设置tab选项
  * */
  tabData = {
    data: ['基本信息', '体格检查'],
    defaultIndex: 0,
    changeTab: (index) => {
      this.changeTab(index.index);
    }
  };
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  selectIndex = 0;
  /*
  * TODO 详细信息的显示隐藏
  * */
  IsShowDetail = true;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private  PatientService: PatientService,
              private application: ApplicationService) { }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.getPatient(); // 获取个人信息
      /*if (t) {
        this.router.navigate(['home', t.patientId], {relativeTo: this.route});
      }*/
    });
  }
  /*
  * TODO 获取患者详情信息
  * */
  getPatient() {
    this.GetPatientRequest = { Id : this.patientId};
    this.PatientService.getPatient(this.GetPatientRequest).subscribe(val => {
      console.log(val);
      if (val) {
        this.GetPatientResponse = val;
      }
    });
  }
  /*
  * TODO TAB切换条
  * */
  changeTab(index) {
    this.selectIndex = index.index;
}
  show() {
      // 显示下拉框内容
  }
  hide() {
      // 隐藏下拉框内容
  }
  /*
  * TODO 编辑患者信息
  * */
  editPatientDetail() {
    this.application.frontLayer.openPopupWindow(EditPatientComponent, '新增患者', PopupWindowSize.MIDDLE, 'auto', { patientId: this.patientId }, false).subscribe(t => {
      if (t) {
        console.dir(t['data']['data']);
        this.application.main.openPromptMessage('保存成功！', 3000); // 提示保存成功
      }
    });
  }
  /*
  * TODO 添加患者
  * */
  addPatient() {

  }
}
