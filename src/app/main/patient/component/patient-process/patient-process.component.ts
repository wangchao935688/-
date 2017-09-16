import {Component, ElementRef, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ProcessService} from '../../../../core/service/process.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OutsideProcessGetListRequest, OutsideProcessGetListResponse} from '../../../../core/messages/process-request-response';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {ApplicationService} from '../../../../core/service/application.service';

@Component({
  selector: 'app-patient-process',
  templateUrl: './patient-process.component.html',
  styleUrls: ['./patient-process.component.scss']
})
export class PatientProcessComponent implements OnInit, OnDestroy, AfterViewInit {
/*
* TODO 参数设置
* */
  responseData: OutsideProcessGetListResponse;
  outsideProcessGetListRequest: OutsideProcessGetListRequest;
  patientId: string;
  dataLoading= 'hide';
  showEmpty= false;
  selectIndex: number;
  displayStatus = false; // 默认隐藏侧滑
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private ProcessService: ProcessService,
              private slider: CustomizeSliderService,
              public application: ApplicationService) { }

  ngOnInit() {
    /*
     * 获取Id，请求患者外加工列表
     * */
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.getOutsideProcessGetList(); // 获取患者外加工列表
    });
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
    setTimeout(() => {
      this.dataLoading = 'hide';
    }, 1000);
  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  /*
  * TODO 请求患者外加工列表
  * */
  getOutsideProcessGetList() {
    this.dataLoading = 'show';
    this.outsideProcessGetListRequest = { patientID : this.patientId};
    this.ProcessService.getOutsideProcessGetList(this.outsideProcessGetListRequest).subscribe(val => {
     // this.dataLoading = 'hide';
      console.log(val);
      setTimeout(() => {
        if (val) {
          this.responseData = val;
        }else {
          this.showEmpty = true;
        }
      }, 0);
    });
  }
  /*
  * TODO 分页
  * */
  pageChange(evt) {}
  /*
  * TODO 获取外加工详情
  * */
  getProcessDetail(evt: any, id: string, i: number) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.selectIndex = i;
    this.router.navigate(['process-detail', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
}
