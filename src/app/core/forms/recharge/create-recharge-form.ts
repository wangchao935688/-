export class CreateRechargeForm {
  PatientID: string = null;
  AccountRechargeModel: {
    // 账户id
    ID: string;
    // 钱
    Money: number;
  } = null;
  Note: string = null;
  ReferrerId: string = null;
}
