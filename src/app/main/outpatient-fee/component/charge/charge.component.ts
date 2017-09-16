import { Component, OnInit ,Input} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {ChargeService} from '../../../../core/service/charge.service';
import {ChargeFormItem} from '../../../../core/forms/charge/charge-form-item';
import {ChargeForm} from '../../../../core/forms/charge/charge-form';
import * as Global_Dic from '../../../../core/global_dic';
import {HospitalService} from '../../../../core/service/hospital.service';
import * as HosptialAcountRequestResponse from '../../../../core/messages/hospital-account-request-response';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent  extends PopupWindowBaseComponent implements OnInit {
  //从父窗口接收的数据
  @Input()
  data: any = null;
//收费单详情
  chargeDetail: BillRequestResponse.DetailsResponse;
//表单
  chargeForm: ChargeForm = new ChargeForm();
//收费状态
  billstatus = Global_Dic.billStatus;
  //账户列表
  accountList: HosptialAcountRequestResponse.HospitalAccountFull[];

  //input是否选中
  isSelect = false;

  /*
  * TODO 支付
  * */
  cashPayment= [
    {
      value: 'yan',
      label: '现金支付'
    }
  ];
  //预存款Id
  preAccount: HosptialAcountRequestResponse.HospitalAccountFull;
  //现金id
  cashAccount: HosptialAcountRequestResponse.HospitalAccountFull;
  /**
   * 是否可用预存款
   * @type {boolean}
   */
  canUsePre: boolean = false;

  //预付款999 现金0

  constructor(private chargeService: ChargeService, private hospitalService: HospitalService) {
    super();
  }

  ngOnInit() {
    this.chargeForm.chargeAccountItemList = [];

    let accountListRequest: HosptialAcountRequestResponse.AccountRequest = new HosptialAcountRequestResponse.AccountRequest();
    accountListRequest.IncludeAdvanceAccount = true;

    let accountListPromise = this.hospitalService.getHospitalAccountList(accountListRequest).toPromise();
    let chargePromise = this.chargeService.getBill(this.data.feeId).toPromise();

    Promise.all([chargePromise, accountListPromise]).then(values => {
      this.chargeDetail = values[0] as any; //莫名提示错误
      this.chargeForm.shouldPay = this.chargeDetail.Bill.ReducedPrice - this.chargeDetail.Bill.PaidAmount;
      this.accountList = values[1];

      this.chargeForm.shouldPay = this.chargeDetail.Bill.ArrearagePrice;
      let preAccount = this.accountList.find(t => t.AccountType == 999);
      if (preAccount && preAccount.Balance > 0) {
        this.chargeForm.isUsePre = true;
        this.preAccount = preAccount;
        this.canUsePre = true;
        this.chargeForm.preAccount = this.chargeDetail.Bill.ArrearagePrice;
      }

      //现金
      this.cashAccount = this.accountList.find(t => t.AccountType === 0);
      if (this.cashAccount) {
        let cashItem = new ChargeFormItem();
        cashItem.accountId = this.cashAccount.ID;
        cashItem.account = this.chargeForm.thisOwe;
        cashItem.displayAccount = this.displayPrice(cashItem.account);
        this.chargeForm.chargeAccountItemList.push(cashItem);
      }
    });

    accountListPromise.then(res => {
      this.accountList = res as HosptialAcountRequestResponse.HospitalAccountFull[];
      for (let ss of this.accountList) {
        console.log(ss.AccountName);
      }
    });


  }

  /**
   * 添加支付账户
   * @param e
   */
  addAccount(e) {
    let item = new ChargeFormItem();
    item.accountId = this.generateNextAccountId();
    item.account = 0;
    if (this.chargeForm.thisOwe > 0) {
      item.account = this.chargeForm.thisOwe;
    }
    item.displayAccount = this.displayPrice(item.account);
    this.chargeForm.chargeAccountItemList.push(item);
  }

  /**
   * 修改支付账户
   * @param item
   */
  changeAccount(item: ChargeFormItem, e) {
    let srcElement=e.srcElement||e.target;
    let tempValue = srcElement.value;
    if (this.chargeForm.chargeAccountItemList.findIndex(v => v.accountId == tempValue) > -1) {
      srcElement.value = item.accountId;
      console.log('收款账户已存在，同时更换账户不成功');
      return;
    }
    item.accountId = tempValue;
  }

  /**
   * 移除收费账户
   * @param item
   */
  removeAccount(item: ChargeFormItem) {
    let index = this.chargeForm.chargeAccountItemList.findIndex(t => t.accountId == item.accountId);

    if (index == -1) {
      return;
    }

    this.chargeForm.chargeAccountItemList.splice(index, 1);
  }

  /**
   * 是否使用预存款
   * @param e
   */
  usePreChange(e: boolean) {
    if (e) {
      this.chargeForm.preAccount = 0;
      let owe = this.chargeForm.shouldPay - this.getThisPayExclude(this.preAccount.ID);
      if (owe > 0) {
        this.chargeForm.preAccount = this.preAccount.Balance > owe ? owe : this.preAccount.Balance;
      }
      this.chargeForm.displayPreAccount = this.displayPrice(this.chargeForm.preAccount);
    }
    else {
      this.chargeForm.preAccount = 0;
    }
    this.chargeForm.isUsePre = e;
  }

  /**
   * 修改预存款金额
   */
  changePrePrice(e) {
    let srcElement=e.srcElement||e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    let owe = this.chargeForm.shouldPay - this.getThisPayExclude(this.preAccount.ID);
    let tempValue = Number(value);
    if (owe == 0) {
      tempValue = 0;
      srcElement.value = tempValue;
      return;
    }

    if (this.preAccount.Balance < tempValue) {
      tempValue = this.preAccount.Balance;
    }
    if (tempValue > owe) {
      tempValue = owe;
    }

    srcElement.value = tempValue;
    this.chargeForm.preAccount = tempValue;
  }

  /**
   * 明细价格修改
   */
  changePrice(formItem: ChargeFormItem, e) {
    let srcElement=e.srcElement||e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    let tempValue = Number(value);
    if (isNaN(tempValue)) {
      srcElement.value = formItem.account;
      return;
    }

    if (tempValue < 0) {
      tempValue = 0;
    }
    else if (tempValue > 9999999.99) {
      tempValue = 9999999.99;
    }


    if (formItem.accountId == this.cashAccount.ID) {
      if (this.getThisPayExclude(this.cashAccount.ID) >= this.chargeForm.shouldPay) {
        tempValue = 0;
        srcElement.value = tempValue;
        return;
      }
    } else {
      let owe = this.chargeForm.shouldPay - this.getThisPayExclude(formItem.accountId);
      if (owe <= 0) {
        tempValue = 0;
        srcElement.value = tempValue;
        return;
      }

      if (tempValue > owe) {
        tempValue = owe;
      }
    }

    formItem.account = Number(tempValue.toFixed(2));
    srcElement.value = formItem.account;
  }


  /**
   * 文本框获取焦点
   * @param e
   */
  focusInput(e) {
    let srcElement=e.srcElement||e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    srcElement.value = value;
    srcElement.select();
    this.isSelect = true;
  }

  /**
   * 取消选中
   * @param e
   */
  cancelSelect(e) {
    let srcElement=e.srcElement||e.target;
    if (this.isSelect) {
      this.isSelect = false;
      return;
    }
    srcElement.value = srcElement.value;
  }

  /**
   * 明细价格失去焦点
   * @param e
   */
  blurPrice(e) {
    let srcElement=e.srcElement||e.target;
    srcElement.value = this.displayPrice(srcElement.value);
  }

  /**
   * 返回可用的第一个账户的accountId
   */
  private generateNextAccountId(): string {
    for (let account of this.accountList) {
      if (account.AccountType == 999) {
        continue;
      }
      if (this.chargeForm.chargeAccountItemList.findIndex(t => t.accountId == account.ID) == -1) {
        return account.ID;
      }
    }
    return "";
  }

  /**
   * 确认
   */
  ok(type:number) {
    let request = new BillRequestResponse.ChargeRequest();
    request.BillID = this.chargeDetail.Bill.ID;
    request.Note = this.chargeForm.note;
    request.Time = this.chargeDetail.Bill.LastOperationTime;
    if (!this.chargeDetail.Bill.LastPayTime && this.chargeDetail.Bill.LastPayTime > this.chargeDetail.Bill.LastOperationTime) {
      request.Time = this.chargeDetail.Bill.LastPayTime;
    }

    request.AccountList = [];
    if (this.chargeForm.isUsePre) {
      let item = new BillRequestResponse.HospitalAccount_Change();
      item.ID = this.preAccount.ID;
      item.Money = this.chargeForm.preAccount;
      request.AccountList.push(item);
    }

    this.chargeForm.chargeAccountItemList.forEach(v => {
      if (v.account > 0) {
        let item = new BillRequestResponse.HospitalAccount_Change();
        item.ID = v.accountId
        item.Money = v.account;
        request.AccountList.push(item);
        return;
      }
    });

    this.chargeService.charge(request).subscribe(t => {
      super.close();
      console.log('保存成功了');
    }, e => {
      console.log(e.errorMessage);
    });

  }

  /**
   * 取消
   */
  cancel() {
    super.close();
  }

  /**
   * 价格展示
   * @param value
   * @returns {string}
   */
  private  displayPrice(value) {
    return '￥ ' + value;
  }

  /**
   * 清除￥,百分比
   * @param value
   * @returns {any}
   */
  private removeTextFormat(value) {
    value = value.replace('￥', '').replace(' ', '');
    value = value.replace('%', '').replace(' ', '');
    return value;
  }

  /**
   * 本次已收,排除现金
   */
  private getThisPayExclude(excludeId: string): number {
    let pay = 0;
    this.chargeForm.chargeAccountItemList.forEach(t => {
      if (t.accountId == excludeId) {
        return;
      }
      pay += t.account;
    })

    if (excludeId == this.preAccount.ID) {
      return pay;
    }
    return pay + this.chargeForm.preAccount;
  }

}
