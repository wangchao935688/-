import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../core/service/patient.service';
import {CaseService} from '../../../../core/service/case.service';
import {CaseDetailsRequest, CaseDetailsResponse} from '../../../../core/messages/case-request-response';
import {ApplicationService} from '../../../../core/service/application.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {
  /*
  * TODO 设置参数
  * */
  ctrlList = []; // 无操作
  caseImageList = [];
  id: string;
  caseDetailsRequest: CaseDetailsRequest;
  caseDetailsResponse: CaseDetailsResponse;
  tagList = [];
  dataLoading = 'hide'; // 加载框
  scrollbarOptionsRight= { // 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  showEmpty: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private PatientService: PatientService,
              private CaseService: CaseService,
              private application: ApplicationService) { }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.route.params.subscribe(t => {
      console.log(t);
      this.id = t['id'];
      this.getCaseDetails(this.id); // 获取患者病例
    });
  }
  /*
   * TODO 根据病例ID 获取病例详情
   * */
  getCaseDetails(id) {
    this.dataLoading = 'show';
    this.caseDetailsRequest = { Id : id};
    this.tagList = [];
    this.caseImageList = [];
    this.CaseService.getCaseDetails(this.caseDetailsRequest).subscribe(val => {
      this.dataLoading = 'hide';
      if (val) {
        this.caseDetailsResponse = val;
        // 标签列表
        if (this.caseDetailsResponse.RelationNameList && this.caseDetailsResponse.RelationNameList.length > 0) {
          this.caseDetailsResponse.RelationNameList.forEach(value => {
            this.tagList.push({title: value.Name});
          });
        }
        // 判断是否是图片列表
        if (this.caseDetailsResponse.IsImageCase) {
          this.caseImageList = this.caseDetailsResponse.CaseImage.split(',');
          if (!this.caseImageList[0]) {
            this.showEmpty = true;
          }else {
            this.showEmpty = false;
          }
        }else { // 如果不是图片列表，将检查的图片字符串转化成数组
          this.caseDetailsResponse.CaseItemList.forEach( value => {
            if (value.Images) {
              value['imgList'] = value.Images.split(',');
            }else {
              value['imgList'] = [];
            }
          });
        }
      }
    });
  }
  /*
  * 点击侧滑头部
  * */
  onControlListClick(evt) {

  }

}
