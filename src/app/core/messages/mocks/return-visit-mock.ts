import {
  FollowUpGetTypeListResponse,
  FollowUpGetTemplatePageResponse,
  FollowUpGetListResponse,
  FollowUpGetTemplateListResponse,
  FollowUpGetResponse
} from "../return-visit-request-response";
export const getReturnVisitDetail = {
  "InterviewResultList": [
    {
      "Id": "773d6705-e18d-4b68-8f74-7df19d890793",
      "Result": "sample string 2",
      "WorkerCode": "sample string 3",
      "WorkerName": "sample string 4",
      "CreateTime": "2017-06-08T10:45:33.831639+08:00"
    },
    {
      "Id": "773d6705-e18d-4b68-8f74-7df19d890793",
      "Result": "sample string 2",
      "WorkerCode": "sample string 3",
      "WorkerName": "sample string 4",
      "CreateTime": "2017-06-08T10:45:33.831639+08:00"
    }
  ],
  "Id": "54cdfa9b-864c-4775-b73e-d711440421d5",
  "PatientCode": "sample string 2",
  "PatientModel": {
    "Tel":"1111",
    "Id": "072ed3f6-2f31-44c1-89f7-f41ea4ca40d7",
    "PatientCode": "sample string 2",
    "PatientName": "sample string 3",
    "Sex": 1,
    "Age": 1,
    "IsImportant": true,
    "IsArrearage": true,
    "Image": "sample string 6"
  },
  "InterviewDate": "2017-06-08T10:45:33.831639+08:00",
  "DoctorCode": "sample string 3",
  "DoctorName": "sample string 4",
  "InterviewWorkerList": [
    "sample string 1",
    "sample string 2"
  ],
  "State": 0,
  "Content": "sample string 5",
  "Note": "sample string 6",
  "Reason": "sample string 7",
  "InterviewType": 1,
  "InterviewTypeName": "sample string 8",
  "CreatorName": "sample string 9",
  "CreateTime": "2017-06-08T10:45:33.831639+08:00"
};

/*
export const getFollowUpGetList: FollowUpGetListResponse = {
  "CurrentPage": 1,
  "TotalPages": 2,
  "TotalItems": 3,
  "ItemsPerPage": 4,
  "Items": [
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    },
    {
      "Id": "e44cd306-2801-4ae7-9604-ce2b0750fa99",
      "PatientCode": "sample string 2",
      "PatientModel": {
        "Tel":"1111",
        "Id": "228b5317-b243-4973-9262-1acb55f98198",
        "PatientCode": "sample string 2",
        "PatientName": "sample string 3",
        "Sex": 1,
        "Age": 1,
        "IsImportant": true,
        "IsArrearage": true,
        "Image": "sample string 6"
      },
      "InterviewDate": "2017-06-08T10:34:18.7092532+08:00",
      "DoctorCode": "sample string 3",
      "DoctorName": "sample string 4",
      "InterviewWorkerList": [
        "sample string 1",
        "sample string 2"
      ],
      "State": 0,
      "Content": "sample string 5",
      "Note": "sample string 6",
      "Reason": "sample string 7",
      "InterviewType": 1,
      "InterviewTypeName": "sample string 8",
      "CreatorName": "sample string 9",
      "CreateTime": "2017-06-08T10:34:18.7092532+08:00"
    }

  ]
};
*/

export const getReturnType = [
  {
    "TypeID": 1,
    "TypeName": "预约回访"
  },
  {
    "TypeID": 2,
    "TypeName": "失约回访"
  }
];

export const getReturnVisitNote = [
  {
    "InterviewResultList": [
      {
        "Id": "679060f3-94ce-449e-bf73-b9379cc97db2",
        "Result": "sample string 2",
        "WorkerCode": "sample string 3",
        "WorkerName": "sample string 4",
        "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
      },
      {
        "Id": "679060f3-94ce-449e-bf73-b9379cc97db2",
        "Result": "sample string 2",
        "WorkerCode": "sample string 3",
        "WorkerName": "sample string 4",
        "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
      }
    ],
    "Id": "7067214f-0bcb-459f-ba5e-6a2dc95e8860",
    "PatientCode": "sample string 2",
    "PatientModel": {
      "Tel":"1111",
      "Id": "133b834b-1940-45f3-8368-801d43ab9036",
      "PatientCode": "sample string 2",
      "PatientName": "sample string 3",
      "Sex": 1,
      "Age": 1,
      "IsImportant": true,
      "IsArrearage": true,
      "Image": "sample string 6"
    },
    "InterviewDate": "2017-06-08T10:57:15.5988716+08:00",
    "DoctorCode": "sample string 3",
    "DoctorName": "sample string 4",
    "InterviewWorkerList": [
      "sample string 1",
      "sample string 2"
    ],
    "State": 0,
    "Content": "sample string 5",
    "Note": "sample string 6",
    "Reason": "sample string 7",
    "InterviewType": 1,
    "InterviewTypeName": "sample string 8",
    "CreatorName": "sample string 9",
    "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
  },
  {
    "InterviewResultList": [
      {
        "Id": "679060f3-94ce-449e-bf73-b9379cc97db2",
        "Result": "sample string 2",
        "WorkerCode": "sample string 3",
        "WorkerName": "sample string 4",
        "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
      },
      {
        "Id": "679060f3-94ce-449e-bf73-b9379cc97db2",
        "Result": "sample string 2",
        "WorkerCode": "sample string 3",
        "WorkerName": "sample string 4",
        "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
      }
    ],
    "Id": "7067214f-0bcb-459f-ba5e-6a2dc95e8860",
    "PatientCode": "sample string 2",
    "PatientModel": {
      "Tel":"1111",
      "Id": "133b834b-1940-45f3-8368-801d43ab9036",
      "PatientCode": "sample string 2",
      "PatientName": "sample string 3",
      "Sex": 1,
      "Age": 1,
      "IsImportant": true,
      "IsArrearage": true,
      "Image": "sample string 6"
    },
    "InterviewDate": "2017-06-08T10:57:15.5988716+08:00",
    "DoctorCode": "sample string 3",
    "DoctorName": "sample string 4",
    "InterviewWorkerList": [
      "sample string 1",
      "sample string 2"
    ],
    "State": 0,
    "Content": "sample string 5",
    "Note": "sample string 6",
    "Reason": "sample string 7",
    "InterviewType": 1,
    "InterviewTypeName": "sample string 8",
    "CreatorName": "sample string 9",
    "CreateTime": "2017-06-08T10:57:15.5988716+08:00"
  }
];

export const getReturnVisitTemplateList = [
  {
    "Id": "3a7270c5-7626-40f4-829a-8d63ac51b505",
    "Name": "模板二",
    "Content": "模板内容二"
  },
  {
    "Id": "3a7270c5-7626-40f4-829a-8d63ac51b505",
    "Name": "模板一",
    "Content": "模板内容一"
  }
]

export const getReturnVisitTemplatePage = {
  "CurrentPage": 1,
  "TotalPages": 2,
  "TotalItems": 3,
  "ItemsPerPage": 4,
  "Items": [
    {
      "Id": "0caee6db-1270-4650-8532-fc13ca409330",
      "Name": "sample string 2",
      "Content": "sample string 3"
    },
    {
      "Id": "0caee6db-1270-4650-8532-fc13ca409330",
      "Name": "sample string 2",
      "Content": "sample string 3"
    }
  ]
}
