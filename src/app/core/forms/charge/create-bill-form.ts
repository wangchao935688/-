/**
 * Created by bingq on 2017/6/17.
 */
import {BillFormItem} from './bill-form-item';

export class CreateBillForm {
  nurserCode: string;
  doctorCode: string;
  note: string;
  patientId: string;
  billTime: string;
  /**
   *
   类型 0.简略 1.明细
   */
  billType: number;
  /**
   * 1000 云诊所，2000爱牙分期，3000 B2B商城
   */
  platformId: number;
  /**
   * 优惠价（整单折扣或抹零后价格）
   */
  reducedPrice: number = 0;

  displayReducePrice: string = '￥ 0';

  /**
   * 整单折扣率
   */
  allDiscountRate: number = 100;

  /**
   * 整单折扣率显示
   * @returns {string}
   */
  displayAllDiscountRate: string = '100 %'

  /**
   * 原价
   * @returns {number}
   */
  originPrice: number = 1000.20;

  /**
   * 各项折后总价
   * @returns {Number}
   */
  firstReducePrice: number;

  /**
   * 所有折扣率
   * @returns {string}
   */
  get discoutRate(): number {
    let temp=(this.reducedPrice *100/ this.originPrice);
    if (isNaN(temp)){
      return 100;
    }
    return temp;
  }

  /**
   * 简略收费项
   */
  summaryBillItemList: BillFormItem[];
  /**
   * 明细收费项目
   */
  detailBillItemList: BillFormItem[];
}


