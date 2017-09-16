/**
 * Created by bingq on 2017/6/27.
 */
import {ChargeFormItem} from './charge-form-item';
export class ChargeForm{
  /**
   * 支付明细
   */
  chargeAccountItemList:ChargeFormItem[];
  /**
   * 备注
   */
  note:string;

  /**
   * 应付
   */
  shouldPay:number;

  /**
   * 本次已收
   */
 get thisPay():number {
    let pay = 0;
    this.chargeAccountItemList.forEach(t => {
      pay += t.account;
    });
    return pay + this.preAccount;
  }

  /**
   * 本次欠费
   * @returns {number}
   */
  get thisOwe():number{
   let own=0;
   if (this.thisPay>this.shouldPay){
    return 0;
   }
   return this.shouldPay-this.thisPay;
  }

  /**
   * 找零
   */
  get thisChange():number{
    let change=0;
    if (this.thisPay>this.shouldPay){
      return this.thisPay-this.shouldPay;
    }
    return change;
  }

  /**
   * 收否使用预存款
   */
  isUsePre:boolean;
  /**
   * 预存款金额
   */
  preAccount:number=0;


  displayPreAccount:string;
}
