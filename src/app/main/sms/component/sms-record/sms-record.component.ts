import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {IQiezziRightHeaderComponent} from '../../../../shared/component/qiezzi-right-header/qiezzi-right-header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {SmsService} from '../../../../core/service/sms.service';
import {
  SendDetailsRequest, SendDetailsResponse,
  SendGroupSMSRequest
} from '../../../../core/messages/sms-request-response';

@Component({
  selector: 'app-sms-record',
  templateUrl: './sms-record.component.html',
  styleUrls: ['./sms-record.component.scss']
})
export class SmsRecordComponent implements OnInit, AfterViewInit, IQiezziRightHeaderComponent {
  /*
  * 参数设置
  * */
  sendGroupSMSRequest: SendGroupSMSRequest = new SendGroupSMSRequest();
  wordCount = 0; // 短信字数
  messCount = 0; // 发送短信数量
  sendDetailsRequest: SendDetailsRequest = new SendDetailsRequest(); // 短信详情请求参数
  sendDetailsResponse: SendDetailsResponse;
  rightComponentName = '短信详情';
  controlList: string[]= ['再次发送'];
  date = new Date();
  dataLoading = 'hide';
  names = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private el: ElementRef,
              private application: ApplicationService,
              private smsService: SmsService) { }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t);
      this.sendDetailsRequest.id = t['recordId'];
      this.sendDetails();
    });
  }
  ngAfterViewInit() {
    this.dataLoading = 'show';
  }
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  /*
  * TODO 获取短信详情 dataLoading
  * */
  sendDetails() {
    this.smsService.sendDetails(this.sendDetailsRequest).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val) {
        this.sendDetailsResponse = val;
        this.names = this.sendDetailsResponse.Receiver.join(',');
        this.wordCount = this.sendDetailsResponse.Content.length;
        this.messCount = Math.ceil(this.wordCount / 70.1) * this.sendDetailsResponse.Receiver.length;
      }
    }, error => {
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 再次发送
  * */
  onControl(val: number): void {
    console.log(val);
    this.sendMessage();
  }
  /*
   * TODO 发送消息
   * */
  sendMessage () {
   this.sendGroupSMSRequest = {
     PatientId: this.sendDetailsResponse.Receiver,
     Content: this.sendDetailsResponse.Content
   };
   console.log(this.sendGroupSMSRequest);
    this.smsService.sendGroupSMS(this.sendGroupSMSRequest).subscribe(val => {
     console.log(val);
     if (val) {
      this.application.main.openPromptMessage('发送成功！', 3000);
     }
     }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
     });
  }
}
