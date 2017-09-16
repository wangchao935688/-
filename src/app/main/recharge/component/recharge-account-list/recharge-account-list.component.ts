import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {RechargeService} from '../../../../core/service/recharge.service';
import * as Recharge from '../../../../core/messages/recharge-request-response';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
/**
 * 充值账户
 */
@Component({
  selector: 'recharge-account',
  templateUrl: 'recharge-account-list.component.html',
  styleUrls: ['recharge-account-list.component.scss']
})
export class RechargeAccountListComponent implements OnInit ,  AfterViewInit, IQiezziCenterHeaderComponent {
/*
* 设置参数
* */
  moduleName = '充值账户';
  /**
   * 充值总额排序  2 倒序  5 正序
   */
  rechargeSortBoolean: boolean;
  /**
   * 消费总额排序 3 倒序 6 正序
   */
  consumeSortBoolean: boolean;
  /**
   * 账户余额排序  1 倒序  4 正序
   */
  isBorder: boolean;
  displayStatus = '';
  accountSortBoolean: boolean;
  mainShowLoading = 'hide';
  dataLoading = 'hide';
  rechargeAccountState = false; // 空数据
  selectIndex: number; // 列表选中项下标
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'}; // 滚动条

  requestData: Recharge.RechargeAccountGetListRequest;

  rechargeAccountList: Recharge.RechargeAccountGetListResponse;

  constructor(private rechargeService: RechargeService,
              private el: ElementRef,
              private application: ApplicationService,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService) {

  }
  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.rechargeAccountList = new Recharge.RechargeAccountGetListResponse();
    this.requestData = new Recharge.RechargeAccountGetListRequest();
    this.requestData.orderEnum = 4;
    this.requestData.keyword = '';
    this.requestData.pageIndex = 1;
    this.requestData.pageSize = 10;
    this.searchRechargeAccountList();
    this.dataLoading = 'hide';
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
  }
  /*
  * TODO 充值账户列表
  * */
  searchRechargeAccountList() {
    this.dataLoading = 'show';
    this.rechargeService.getRechargeAccountGetList(this.requestData).subscribe(val => {
      this.dataLoading = 'hide';
      if (val) {
        this.rechargeAccountList = val;
      }else {
        this.rechargeAccountState = true;
      }
    }, error => {
      this.dataLoading = 'hide';
      console.log('请求失败');
    });
  }
  /*
  * TODO 分页
  * */
  pageChange(evt: any) {
    this.requestData.pageIndex = evt.page;
    this.searchRechargeAccountList();
  }

  /*
  * TODO 侧滑 查看详情
  * */
  openDetail(evt, id: string, index: number) {
    console.log(index);
    this.selectIndex = index;
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.router.navigate(['recharge-account', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  /**
   * 账户余额排序  1 倒序  4 正序
   */
  accountSort() {
    this.sort(4, 1, this.accountSortBoolean);
  }

  /**
   * 充值总额排序  2 倒序  5 正序
   */
  rechargeSort() {
    this.sort(5, 2, this.rechargeSortBoolean);
  }

  /**
   * 消费总额排序 3 倒序 6 正序
   */
  consumeSort() {
    this.sort(6, 3, this.consumeSortBoolean);
  }

  sort(asc: number, desc: number, flag: boolean) {
    if (this.requestData.orderEnum != asc && this.requestData.orderEnum != desc) {
      if (flag) {
        this.requestData.orderEnum = desc;
      } else {
        this.requestData.orderEnum = asc;
      }
    } else if (this.requestData.orderEnum == asc) {
      this.requestData.orderEnum = desc;
      flag = true;
    } else {
      this.requestData.orderEnum = asc;
      flag = false;
    }
    this.searchRechargeAccountList();
  }

  onScroll(evt) {
    this.isBorder = evt.top < -55;
  }
  onSearch(key) {}
  onShowFilter(stat) {}
  onControl(evt) {}
  onOptions(event) {}
}
