/**
 * Created by 67087 on 2017-06-30.
 */
import {GetAdvanceMoneyListResponse, DetailResponse,GetAdvanceMoneyStatisticsResponse} from '../pre-deposit-request-response';
/* 流水详情 (response) */
export const Detail: DetailResponse = {
  'SerialNumber': 4734712224902477912,
  'OutID': 'b9bf0e27-6209-43a7-9f4e-76aa6b6335a7',
  'TypeDescription': 'sample string 2',
  'Creator': 'sample string 3',
  'CreatorName': 'sample string 4',
  'ID': 'd702f858-13ae-41b5-90b8-d2b672db1b85',
  'TradeType': 1,
  'Money': 6.0,
  'PayType': 7,
  'PayTime': '2017-06-27T15:18:17.5242351+08:00',
  'AccountID': '3b14b950-2726-453b-82ab-cdc6c0ad4635',
  'AccountName': 'sample string 10'
};
/* 预存款列表 (response) */
export const PredepositList: GetAdvanceMoneyListResponse = {
  'CurrentPage': 1,
  'TotalPages': 2,
  'TotalItems': 3,
  'ItemsPerPage': 4,
  'Items': [
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
    {
      'SerialNumber': 4638680201059977071,
      'OutID': '4b246064-51f9-4cdc-a263-e049b781cb55',
      'TypeDescription': 'sample string 2',
      'Creator': 'sample string 3',
      'CreatorName': 'sample string 4',
      'ID': 'ead1476f-e710-405f-9d8d-0c8adf3466aa',
      'TradeType': 0,
      'Money': 6.0,
      'PayType': 7,
      'PayTime': '2017-06-30T14:54:03.6189204+08:00',
      'AccountID': 'b9d68009-88dd-47dc-a936-3b07d77e9dc6',
      'AccountName': 'sample string 10',
      'Type': 0
    },
  ]
};
/* 流水统计 (response) */
export const PreFlowCount:GetAdvanceMoneyStatisticsResponse = {
// 流入
  Inflow: 0,
// 流出
  Outflow: 0,
// 期初
  BeginningBalance: 1000,
// 期末
  EndingBalance: 1000,
}
