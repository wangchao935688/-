import {Component, ElementRef, OnInit} from '@angular/core';
import {PatientImageListRequest, PatientImageListResponse} from '../../../../core/messages/patient-request-response';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from "../../../../core/service/application.service";

@Component({
  selector: 'app-patient-image',
  templateUrl: './patient-image.component.html',
  styleUrls: ['./patient-image.component.scss']
})
export class PatientImageComponent implements OnInit {
  /*
   * TODO 设置参数
   * */
  patientId: string;
  patientImageListRequest: PatientImageListRequest;
  patientImageListResponse: PatientImageListResponse;
  dataLoading = 'hide';
  showEmpty = false;
  today = new Date();
  newDate: string;
  IsShowToday = false;
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private PatientService: PatientService,
              private application: ApplicationService) { }
  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.getPatientImageList(); // 获取个人信息
    });
  }
  /*
  * TODO 获取图片列表
  * */
  getPatientImageList() {
    this.dataLoading = 'show';
    /*
     * TODO 添加页码
     * TODO 修改字段，做分页，取消时间EndTime
     * */
    this.patientImageListRequest = { Id: this.patientId, EndTime: '2017-2-13'};
    this.PatientService.getPatientImageList(this.patientImageListRequest).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val && val.Items.length > 0) {
        this.patientImageListResponse = val;
        this.newDate = new Date( this.patientImageListResponse.Items[0].AddDateTime ).toLocaleDateString();
        if ( this.today.toLocaleDateString() !== this.newDate) {
          this.IsShowToday = true;
        }else {
          this.IsShowToday = false;
        }
        console.log(this.newDate);
      }else {
        // 空数据
        this.showEmpty = true;
        this.IsShowToday = true;
      }
    });
  }
  /*
  * TODO 点击添加图片
  * */
  addPic() {
    // 添加图片
  }
  /*
  * TODO 删除患者图片
  * */
  delPatientImage(id) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.PatientService.delPatientImage({Id: this.patientId, ImgId: [id]}).subscribe(val => {
          console.log(val);
          this.application.main.openPromptMessage('删除成功！', 3000); // 提示删除成功
          this.getPatientImageList(); // 删除成功后，访问刷新
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
}
