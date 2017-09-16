import {Component, ElementRef, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {RechargeService} from '../../../../core/service/recharge.service';
import * as Recharge from '../../../../core/messages/recharge-request-response';
import {gender} from '../../../../core/global_dic';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {QiezziInvalidComponent} from 'app/shared/component/qiezzi-invalid/qiezzi-invalid.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
/**
 * 充值单详情
 */
@Component({
  selector: 'recharge-record-detail',
  templateUrl: 'recharge.component.html',
  styleUrls: ['recharge.component.scss']
})
export class RechargeComponent implements OnInit, AfterViewInit {
  /*
  * 参数设置
  * */
  compName = '充值详情'; // 侧滑标题
  ctrlList = []; // 右上角操作气泡
  loading: string;
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  rechargeId: string; // 充值单ID

  gender = gender;
  rechargeRecordDetail: Recharge.RechargeGetResponse;

  constructor(private rechargeService: RechargeService,
              private el: ElementRef,
              private route: ActivatedRoute,
              private router: Router,
              private application: ApplicationService) {
  }
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  ngOnInit() {
    this.rechargeRecordDetail = new Recharge.RechargeGetResponse();
    this.route.params.subscribe(t => {
      console.log(t);
      this.rechargeId = t['id'];
      this.getRechargeGet(this.rechargeId ); // 获取充值详情
    });
    this.loading = 'hide';
  }
  ngAfterViewInit(): void {
    this.loading = 'show';
  }
/*
* TODO 侧滑右上角命令
* */
  onControlListClick(index) {
    console.log(index);
    if ( index === 0 ) {
      // 作废
      this.application.frontLayer.openPopupWindow( QiezziInvalidComponent, '确认作废', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {
        if (t && t['data']) {
          console.log(t);
          console.dir(t['data']['data']['reason']);
          this.rechargeService.deleteRecharge( {ID: this.rechargeId, Time: this.rechargeRecordDetail.LastOperationTime, CancelReason: t['data']['data']['reason'] } ).subscribe(val => {
            if (val) {
              this.application.main.openPromptMessage('作废成功！', 3000); // 提示保存成功
              this.getRechargeGet(this.rechargeId ); // 重新获取充值详情
            }
          }, error => {
            this.application.main.openPromptMessage('该充值单已作废！' + error, 3000);
          });
        }
      });
    }else if (index === 1 ) {
      // 打印
    }else {
      // 打印设置
    }
  }
/*
* TODO 请求充值详情
* */
  getRechargeGet(id) {
    this.loading = 'show';
    this.rechargeService.getRechargeGet( {id: id} ).subscribe(val => {
      this.loading = 'hide';
      if (val) {
        this.rechargeRecordDetail = val;
      }
      /*
      * TODO 如果不是作废单，显示作废等操作，否则不显示
      * TODO 如果不是作废单，且终端是移动端，则只显示作废
      * */
      if (!this.rechargeRecordDetail.Disabled) {
        if (navigator.userAgent.match(/(iPhone|iPad|Android|ios)/i)) {
          this.ctrlList = [ '&#xe738' ];
        }else {
          this.ctrlList = [ '作废', '打印', '打印设置' ];
        }
      }else {
        this.ctrlList = [];
      }
    });
  }
}
