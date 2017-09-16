/**
 * Created by KingKong on 2017/7/1.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class FormKeyDictionaryService {
  private dictionary: { [key: string]: { [key: string]: string } } = {
    ProcessSent: {
      'CommonTime': 'CommonTime',
      'ExpressCode': 'ExpressCode',
      'ContactID': 'ContactID',
      'DayNum': 'DayNum'
    },
    ProcessReworked: {'ReworkReason': 'ReworkReason', 'CommonTime': 'CommonTime'},
    ProcessReceived: {'CommonTime': 'CommonTime'},
    ProcessContent: {'DictDetailCode': 'DictDetailCode', 'DictDetailName': 'DictDetailName'},
    ProcessColor: {'DictDetailCode': 'DictDetailCode', 'DictDetailName': 'DictDetailName'},
    ProcessCompleted: {'field': 'CommonTime'},
    CreateProcess: {
      'PatientID': 'PatientID',
      'DoctorID': 'DoctorID',
      'Price': 'Price',
      'ProcessNum': 'ProcessNum',
      'ProcessCompanyId': 'ProcessCompanyId',
      'Note': 'Note',
      'VisitingTime': 'VisitingTime'
    },
    Patient: {
      'PatientName': 'PatientName',
      'PatientCode': 'PatientCode',
      'Sex': 'Sex',
      'Age': 'Age',
      'BirthDate': 'BirthDate',
      'Tel': 'Tel',
      'AreaCode': 'AreaCode',
      'Phone': 'Phone',
      'Province': 'Province',
      'City': 'City',
      'Area': 'Area',
      'Address': 'Address',
      'IntentionDoctorName': 'IntentionDoctorName',
      'PatientsWith': 'PatientsWith',
      'RelationName': 'RelationName',
      'Note': 'Note',
      'FirstDate': 'FirstDate',
      'FirstDoctor': 'FirstDoctor',
      'IntentionDoctorCode': 'IntentionDoctorCode'
    },
      Interview : {
        'Note': 'Note',
        'PatientID': 'PatientID',
        'DoctorID': 'DoctorID',
        'Content': 'Content',
        'InterviewWorkerIDList': 'InterviewWorkerIDList_Delete',
        'InterviewDate': 'InterviewDate'
    },
    Transfer: {
      'Money': 'Money',
      'AccountTo': 'AccountTo',
      'AccountFrom': 'AccountFrom'
    },
    MessageTemplate: {
      'TypeCode': 'TypeCode',
      'SMSName': 'SMSName',
      'SMSContent': 'SMSContent'
    },
    ReturnVisit: {
      'Note': 'Note',
      'PatientID': 'PatientID',
      'DoctorID': 'DoctorID',
      'Name': 'Name',
      'Content': 'Content',
      'InterviewWorkName': 'InterviewWorkName',
      'InterviewDate': 'InterviewDate'
    },
    Demo: {
      'PatientName': 'PatientName',
      'PatientCode': 'PatientCode',
      'Sex': 'Sex',
      'Age': 'Age',
      'BirthDate': 'BirthDate',
      'Tel': 'Tel'
    },
    SortClass: {
      'ID': 'ID',
      'Name': 'Name',
      'Color': 'Color',
      'StartTime': 'StartTime',
      'StopTime': 'StopTime'
    },
    ExpenseType: {
      'ID': 'ID',
      'Type': 'Type',
      'TypeName': 'TypeName',
      'IconUrl': 'IconUrl'
    },
    DailyExpenseAdd: {
      'Type': 'Type',
      'TypeID': 'TypeID',
      'ID': 'ID',
      'Money': 'Money',
      'HandlerID': 'HandlerID',
      'Image': 'Image',
      'Note': 'Note'
    },
    Schedule: {
      Name: 'Name',
      StartDate: '',
      StartTime: '',
      EndDate: '',
      EndTime: '',
      Players: 'PlayerID',
      TimeAlert: '',
      Note: 'Note'
    },
    Worker: {
      // 员工名称
      WorkerName: 'WorkerName',
      // 性别
      Sex: 'Sex',
      // 出生日期
      BirthDate: 'BirthDate',
      // 电话
      Tel: 'Tel',
      // 地址
      Address: 'Address',
    },
    Booking: {
      PatientID: '',
      Sex: 'Sex',
      Age: 'Age',
      BirthDate: 'BirthDate',
      Tel: 'Tel',
      AreaCode: 'AreaCode',
      Phone: 'Phone',
      DoctorCode: 'DoctorCode',
      VisitDate: 'Date',
      Note: 'Note',
      PatlogType: 'PatlogType',
      Aim: 'Aim',
      StartTime: '',
      EndTime: '',
      PatientName: 'PatientName',
      PatientCode: 'PatientCode',
    },
    InputPop: {'field': 'Content'},
  };

  getFormKeys(formName): { [key: string]: string } {
    return this.dictionary.hasOwnProperty(formName) ? this.dictionary[formName] : null;
  }
}
