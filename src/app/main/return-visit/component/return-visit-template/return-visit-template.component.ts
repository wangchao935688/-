import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {
  FollowUpGetTemplateListResponse,
  FollowUpGetTypeListResponse
} from '../../../../core/messages/return-visit-request-response';


@Component({
  selector: 'return-visit-template',
  templateUrl: 'return-visit-template.component.html'
})
export class ReturnVisitTemplateComponent implements OnInit {

  @Input()
  returnVisitTemplateType: number;
  /*
   * TODO 回访类别列表*/
  followUpGetTypeListResponse: Array<FollowUpGetTypeListResponse>;
  returnVisitTemplateList: FollowUpGetTemplateListResponse[];

  @Output()
  onSelectTemplate = new EventEmitter<FollowUpGetTemplateListResponse>();

  name: string;

  constructor(private returnVisitService: ReturnVisitService) {

  }

  ngOnInit() {
    /*this.returnVisitService.getReturnVisitTemplateList({type: this.returnVisitTemplateType}).subscribe(val => {
      this.returnVisitTemplateList = val
    });
    if (this.returnVisitTemplateType == 0) {
      this.name = '回访内容模板';
    } else {
      this.name = '结果模板';
    }*/
  }
  /*
   * TODO 获取回访类别列表
   * */
  getReturnType() {
    this.returnVisitService.getReturnType().subscribe( (val) => {
      if ( val && val.length > 0 ) {
        console.log(val);
        this.followUpGetTypeListResponse = val;
      }
    });
  }
  selectReturnVisitTemplate(template: FollowUpGetTemplateListResponse) {
    this.onSelectTemplate.emit(template);
  }
}
