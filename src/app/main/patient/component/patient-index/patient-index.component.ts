import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as dic from '../../../../core/global_dic';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import * as Process from '../../../../core/messages/process-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {PatientCenterRequest, PatientCenterResponse} from '../../../../core/messages/patient-request-response';
/**
 * 外加工详情
 */
@Component({
  selector: 'patient-index',
  templateUrl: 'patient-index.component.html',
  styleUrls: ['patient-index.component.scss']
})
export class PatientIndexComponent implements OnInit, AfterViewInit {
  /*
  * TODO 设置参数类型
  * */
  PatientCenterResponse: PatientCenterResponse;
  PatientCenterRequest: PatientCenterRequest;
  patientName = '患者信息';
  mainShowLoading: string;
  ctrlList: string[] = ['修改', '删除'];

  responseData: Process.OutsideProcessGetResponse;

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  tagList= [{title: '根管治疗', value: '1'}, {title:  '洗牙', value: '2'}];
  id: string;
/*
* TODO 设置tab选项及路由信息
* */
  tabData = {
    data: ['首页', '详细信息', '口腔检查', '电子病历', '预约', '付款结算', '回访', '外加工', '图像采集'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
      this.selectTabIndex(index.index);
    }
  };
  urlList= ['home', 'detail', 'check', 'case', 'booking', 'payment', 'return-visit', 'process', 'image'];
  patientId: string;


  showData: boolean;

  @ViewChild('rightDataLoading')
  rightDataLoading: QiezziLoadingComponent;

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private mScrollbarService: MalihuScrollbarService,
              private patientService: PatientService,
              private el: ElementRef,
              private application: ApplicationService) {
  }

  ngOnInit(): void {
    this.tabData.defaultIndex = 0;
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.getPatientCenter(); // 获取个人信息
      if (t) {
        this.router.navigate(['home', this.patientId], {relativeTo: this.route});
      }
    });
  }

  ngAfterViewInit(): void {
    this.mainShowLoading = 'show';
    setTimeout(() => {
      this.mainShowLoading = 'hide';
    }, 1000);
  }

  /**
   * TODO tab切换
   * @param index
   */
  selectTabIndex(index: number) {
    if (index !== 4 && index !== 6) {
      this.router.navigate([this.urlList[index], this.patientId], {relativeTo: this.route});
    }else {
      this.router.navigate([this.urlList[index], this.PatientCenterResponse.Patient.PatientCode], {relativeTo: this.route});
    }
  }
/*
* TODO 患者详情
* */
  getPatientCenter() {
    this.mainShowLoading = 'show';
    this.PatientCenterRequest = { Id : this.patientId};
    this.patientService.getPatientCenter(this.PatientCenterRequest).subscribe(val => {
      this.mainShowLoading = 'hide';
      this.tabData.defaultIndex = 0;
     console.log(val);
     if (val) {
       setTimeout(() => {
         this.PatientCenterResponse = val;
       }, 0);
     }
    });
  }
  onControlListClick(evt) {}

}
