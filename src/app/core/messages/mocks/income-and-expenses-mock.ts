import {
  GetTypeListResponse,
  GetListResponse,
  GetResponse
} from '../income-and-expenses-request-response';

/**
 * 日常收支列表
 * @type {{TotalAmount: number; CurrentPage: number; TotalPages: number; TotalItems: number; ItemsPerPage: number; Items: [{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string},{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string},{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string},{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string},{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string},{ID: string; Code: string; Amount: number; Type: number; TypeID: string; TypeName: string; TypeIcon: string; AccountID: string; AccountName: string; CreateTime: string; Creater: string; HandlerID: string; HandlerModel: {WorkerId: string; WorkerCode: string; WorkerName: string; HeadImageUrl: string; WorkerType: number}; Image: string; Note: string; Disabled: boolean; CancelReason: string; LastOperator: string; LastOperationTime: string}]}}
 */
export const getListResponse: GetListResponse = {
  'TotalAmount': 0,
  'CurrentPage': 1,
  'TotalPages': 2,
  'TotalItems': 6,
  'ItemsPerPage': 4,
  'Items': [
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '123456789',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '祝大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    },
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '321654987',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '张大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    },
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '123456789',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '赵大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    },
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '123456789',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '钱大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    },
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '321654987',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '孙大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    },
    {
      'ID': 'ff470677-42d7-40cd-a56b-e926a41654d0',
      'Code': '123456789',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': '6428e925-202e-45ef-b213-fb737a8a1f1a',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '0af8e57d-79b1-4755-b89b-315a54a3ebb6',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-09T14:44:12.6108519+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '4da0a39a-b8e3-4bff-b985-c71b97175b2e',
      'HandlerModel': {
        'WorkerId': 'ee809bf1-2e82-42ad-bdb3-51bb5910ef0f',
        'WorkerCode': 'sample string 1',
        'WorkerName': '李大夫',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': true,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-09T14:44:12.626452+08:00'
    }
  ]
};
/**
 * 获取所有收支类型列表
 * @type {[{ID: string; TypeName: string; IconUrl: string},{ID: string; TypeName: string; IconUrl: string}]}
 */
export const getTypeListResponse: GetTypeListResponse[] = [
  {
    'ID': '87b4435d-0e12-4388-b515-f7caa8eb28c4',
    'TypeName': 'vn',
    'IconUrl': 'sample string 3'
  },
  {
    'ID': '87b4435d-0e12-4388-b515-f7caa8eb28c4',
    'TypeName': 'tm',
    'IconUrl': 'sample string 3'
  },
  {
  'ID': '87b4435d-0e12-4388-b515-f7caa8eb28c4',
  'TypeName': 'ey',
  'IconUrl': 'sample string 3'
  }
]
/**
 * 获取收支详情
 */
export const getResponse: GetResponse = {
      'ID': 'ff470677-42d7-40cd-a56b-e926a4161111',
      'Code': '1234567890',
      'Amount': 3.0,
      'Type': 4,
      'TypeID': 'b79446e6-3a68-4df4-92ec-5a573f913033',
      'TypeName': 'sample string 6',
      'TypeIcon': 'sample string 7',
      'AccountID': '03d0cd32-51fe-4742-8c8a-46ecc6c7f2da',
      'AccountName': 'sample string 9',
      'CreateTime': '2017-06-14T19:06:14.8072551+08:00',
      'Creater': 'sample string 11',
      'HandlerID': '9d6f5047-f222-4272-94e9-a4bcfdf67e49',
      'HandlerModel': {
        'WorkerId': '3182eed2-b48f-43c7-9ac1-26818b5b6012',
        'WorkerCode': 'sample string 1',
        'WorkerName': 'sample string 2',
        'HeadImageUrl': 'sample string 3',
        'WorkerType': 1
      },
      'Image': 'sample string 13',
      'Note': 'sample string 14',
      'Disabled': false,
      'CancelReason': 'sample string 16',
      'LastOperator': 'sample string 17',
      'LastOperationTime': '2017-06-14T19:06:14.8072551+08:00'
    }





