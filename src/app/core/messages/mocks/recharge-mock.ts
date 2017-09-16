import {
  RechargeGetListResponse,
  RechargeGetResponse,
  RechargeAccountGetListResponse, RechargeAccountGetResponse, RechargeAccountChangeRecordResponse
} from "../recharge-request-response";
export const getRechargeGetList: RechargeGetListResponse = {
  "CurrentPage": 1,
  "TotalPages": 2,
  "TotalItems": 3,
  "ItemsPerPage": 4,
  "Items": [
    {
      "ID": "0790d9db-4cde-4fd2-8e54-49a0a528df64",
      "RechargeCode": "sample string 2",
      "PatientID": "8b98fab3-35f9-4206-a580-97ad21737c52",
      "PatientModel": {
        "Tel":"1111",
        "Id": "94980f41-d694-4b3e-950c-8c8e1303e5a7",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "Money": 4.0,
      "AccountName": "sample string 5",
      "Note": "sample string 6",
      "ReferrerId": "9789c879-4eac-4c00-aac1-ea37a71ce79a",
      "ReferrerModel": {
        "WorkerId": "9c6b4d97-798d-4a92-8781-2fa011d42a3f",
        "WorkerCode": "sample string 1",
        "WorkerName": "sample string 2",
        "HeadImageUrl": "sample string 3",
        "WorkerType": 1
      },
      "OperatorModel": {
        "WorkerId": "9c6b4d97-798d-4a92-8781-2fa011d42a3f",
        "WorkerCode": "sample string 1",
        "WorkerName": "sample string 2",
        "HeadImageUrl": "sample string 3",
        "WorkerType": 1
      },
      "RechargeTime": "2016-06-08T15:32:55.5903226+08:00",
      "Disabled": true,
      "CancelReason": "sample string 9",
      "LastOperationTime": "2016-06-08T15:32:55.5903226+08:00"
    },
    {
      "ID": "0790d9db-4cde-4fd2-8e54-49a0a528df64",
      "RechargeCode": "sample string 2",
      "PatientID": "8b98fab3-35f9-4206-a580-97ad21737c52",
      "PatientModel": {
        "Tel":"1111",
        "Id": "94980f41-d694-4b3e-950c-8c8e1303e5a7",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "Money": 4.0,
      "AccountName": "sample string 5",
      "Note": "sample string 6",
      "ReferrerId": "9789c879-4eac-4c00-aac1-ea37a71ce79a",
      "ReferrerModel": {
        "WorkerId": "9c6b4d97-798d-4a92-8781-2fa011d42a3f",
        "WorkerCode": "sample string 1",
        "WorkerName": "sample string 2",
        "HeadImageUrl": "sample string 3",
        "WorkerType": 1
      },
      "OperatorModel": {
        "WorkerId": "9c6b4d97-798d-4a92-8781-2fa011d42a3f",
        "WorkerCode": "sample string 1",
        "WorkerName": "sample string 2",
        "HeadImageUrl": "sample string 3",
        "WorkerType": 1
      },
      "RechargeTime": "2017-06-08T15:32:55.5903226+08:00",
      "Disabled": false,
      "CancelReason": "sample string 9",
      "LastOperationTime": "2017-06-08T15:32:55.5903226+08:00"
    }
  ]
};


export const getRechargeGetResponse: RechargeGetResponse = {
  "ID": "605455d2-c927-4fbd-923d-037685859c46",
  "RechargeCode": "sample string 2",
  "PatientID": "14328433-0a31-41e2-a573-b155e20eda08",
  "PatientModel": {
    "Tel":"1111",
    "Id": "d796d947-137c-4eea-befd-5302551b7954",
    "PatientCode": "sample string 2",
    "PatientName": "sample string 3",
    "Sex": 1,
    "Age": 1,
    "IsImportant": true,
    "IsArrearage": true,
    "Image": "sample string 6"
  },
  "Money": 4.0,
  "AccountName": "sample string 5",
  "Note": "sample string 6",
  "ReferrerId": "f4a49c02-e74e-4c36-9d3b-7d5533a1ec5b",
  "ReferrerModel": {
    "WorkerId": "fe38c1f8-6b41-4051-baa3-7c64d33b6a12",
    "WorkerCode": "sample string 1",
    "WorkerName": "sample string 2",
    "HeadImageUrl": "sample string 3",
    "WorkerType": 1
  },
  "OperatorModel": {
    "WorkerId": "fe38c1f8-6b41-4051-baa3-7c64d33b6a12",
    "WorkerCode": "sample string 1",
    "WorkerName": "sample string 2",
    "HeadImageUrl": "sample string 3",
    "WorkerType": 1
  },
  "RechargeTime": "2017-06-08T19:08:38.0438548+08:00",
  "Disabled": true,
  "CancelReason": "sample string 9",
  "LastOperationTime": "2017-06-08T19:08:38.0438548+08:00"
}


export const getRechargeAccountGetListResponse: RechargeAccountGetListResponse = {
  "CurrentPage": 1,
  "TotalPages": 2,
  "TotalItems": 3,
  "ItemsPerPage": 4,
  "Items": [
    {
      "PatientID": "02ad2bcd-2de3-4ee8-92aa-9e4b6b2e61ec",
      "PatientModel": {
        "Tel":"1111",
        "Id": "6659a62a-8101-4adc-8abe-0de7408c48fb",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "Balance": 2.0,
      "TotalConsumption": 3.0,
      "TotalRecharge": 4.0
    },
    {
      "PatientID": "02ad2bcd-2de3-4ee8-92aa-9e4b6b2e61ec",
      "PatientModel": {
        "Tel":"1111",
        "Id": "6659a62a-8101-4adc-8abe-0de7408c48fb",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "Balance": 2.0,
      "TotalConsumption": 3.0,
      "TotalRecharge": 4.0
    }
  ]
}
export const getRechargeAccountGetResponse: RechargeAccountGetResponse = {
  "PatientID": "7fa11665-9291-4aca-b5c2-5c734b4eb6cf",
  "PatientModel": {
    "Tel":"1111",
    "Id": "f6f75b15-54c3-4d1e-a5f4-d4995f81b8f5",
    "PatientCode": "sample string 2",
    "PatientName": "sample string 3",
    "Sex": 1,
    "Age": 1,
    "IsImportant": true,
    "IsArrearage": true,
    "Image": "sample string 6"
  },
  "Balance": 2.0,
  "TotalConsumption": 3.0,
  "TotalRecharge": 4.0
}
export const getRechargeAccountChangeRecordResponse: RechargeAccountChangeRecordResponse = {
  "CurrentPage": 1,
  "TotalPages": 2,
  "TotalItems": 3,
  "ItemsPerPage": 4,
  "Items": [
    {
      "ID": "1fa32f54-cfd0-4e3f-9745-52a5a6fa9de6",
      "Money": 2.0,
      "CurrentBalance": 3.0,
      "RecordType": "充值",
      "RecordTime": "2017-06-09T14:39:55.5380004+08:00"
    },
    {
      "ID": "1fa32f54-cfd0-4e3f-9745-52a5a6fa9de6",
      "Money": 2.0,
      "CurrentBalance": 3.0,
      "RecordType": "消费",
      "RecordTime": "2016-06-09T14:39:55.5380004+08:00"
    }
  ]
}
