import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as dic from '../../../../core/global_dic';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import * as Process from '../../../../core/messages/process-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {PatientCenterRequest, PatientCenterResponse} from '../../../../core/messages/patient-request-response';


@Component({
  selector: 'app-return-goods',
  templateUrl: './return-goods.component.html',
  styleUrls: ['./return-goods.component.scss']
})
export class ReturnGoodsComponent implements OnInit, AfterViewInit {

  /*
   * TODO 设置参数类型
   * */
  PatientCenterResponse: PatientCenterResponse;
  PatientCenterRequest: PatientCenterRequest;
  patientName = '退货单详情';
  mainShowLoading: string;
  ctrlList: string[] = ['修改', '删除'];

  responseData: Process.OutsideProcessGetResponse;

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  tagList= [{title: '根管治疗', value: '1'}, {title:  '洗牙', value: '2'}];
  id: string;

  urlList= ['home', 'detail', 'check', 'case', 'booking', 'payment', 'return-visit', 'process', 'image'];
  patientId: string;


  showData: boolean;

  @ViewChild('rightDataLoading')
  rightDataLoading: QiezziLoadingComponent;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private mScrollbarService: MalihuScrollbarService,
              private patientService: PatientService,
              private el: ElementRef,
              private application: ApplicationService) {
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  ngOnInit(): void {
    // this.tabData.defaultIndex = 0;
    this.application.workBoard = this.el.nativeElement;
    /*this.route.params.subscribe(t => {
     console.log(t);
     this.patientId = t['patientId'];
     this.getPatientCenter(); // 获取个人信息
     if (t) {
     this.router.navigate(['home', this.patientId], {relativeTo: this.route});
     }
     });*/
  }

  ngAfterViewInit(): void {
    this.mainShowLoading = 'show';
    setTimeout(() => {
      this.mainShowLoading = 'hide';
    }, 1000);
  }



  onControlListClick(evt) {}



}

