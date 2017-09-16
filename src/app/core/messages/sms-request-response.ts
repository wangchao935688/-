/**
 * Created by Li Jinglei on 2017/7/27.
 */
import {TemplateFullModel} from './model/sms-template-full';
import {PageRequest, PageResponse} from "./page-request-response";

/*
 * 短信数量统计
 * */
export class SMSStatisticsResponse {
  // 短信余额
  SMSBalance: number;
  // 今日赠送
  TodayPresentNumber: number;
  // 今日发送
  TodaySendNumber: number;
  // 回复未读数量
  UnreadNumber: number;
  // 总发送数量
  TotalSendNumber: number;
}
/*
* 全部模板列表（我的模板和系统模板）SMS/GetTemplateList
* */
export class GetTemplateListResponse {
  // 我的模板
  MyTemplateList: Array<TemplateFullModel>;
  // 系统模板
  SysTemplateList: Array<TemplateFullModel>;
}

/*
* 修改模板 POST api/SMS/EditTemplate
* */
export class EditTemplateRequest {
  // 模板id
  ID: string;
  // 类别ID
  TypeCode: string;
  // 模板名称
  SMSName: string;
  // 模板内容
  SMSContext: string;
}

/*
* 删除模板 POST api/SMS/DelTemplate
* */
export class DelTemplateRequest {
  ID: string;
}

/*
* 添加模板（短信另存为）SMS/AddTemplate
* */
export class AddTemplateRequest {
  // 类别ID
  TypeCode: string;
  // 模板名称
  SMSName: string;
  // 模板内容
  SMSContent: string;
}
/*
* 短信回复列表 SMS/ReplyList
* */
export class ReplyListRequest extends PageRequest {
  // 0 未读 1已读
  readStatus?: number = null;
}
export class ReplyListResponse extends PageResponse {
  Items: Array<ReplyModelSimple>;
}
export class ReplyModelSimple {
  Id: string;
  // 发送时间
  SendTime: string;
  // 内容
  Content: string;
  // 是否已读
  IsRead: boolean;
  // 未读条数
  UnReadNum: number;
  // 发送人model
  SendModel: SMSContactsSimpleModel;
}
export class SMSContactsSimpleModel {
  Id: string;
  // 名称
  Name: string;
  // 头像
  Image: string;
  // 性别
  Sex: number;
}
/*
* 发送列表 GET api/SMS/SendList
* */
export class SendListRequest extends PageRequest {
  // 搜索关键字
  keyword: string = null;
  // 开始时间
  beginTime: string = null;
  // 结束时间
  endTime: string = null;
}
export class SendListResponse extends PageResponse {
  Items: Array<SendSimpleModel>;
}
export class SendSimpleModel {
  // 0群发 1单条发送
  Type: number;
  Id: string;
  // 收信人 数组
  Receiver: string[];
  // 发送时间
  SendTime: string;
  // 内容
  Content: string;
  // 发送人
  Sender: string;
}
/*
* 发送详情 GET api/SMS/SendDetails/{id}
* */
export class SendDetailsRequest {
  id: string;
}
export class SendDetailsResponse {
  // 0群发 1单条发送
  Type: number;
  Id: string;
  // 收信人
  Receiver: string[];
  // 发送时间
  SendTime: string;
  // 内容
  Content: string;
  // 发送人
  Sender: string;
}
/*
* 充值记录列表GET api/SMS/GetRechargerList
* */
export class GetRechargerListRequest extends PageRequest {

}
export class GetRechargerListResponse extends PageResponse {
  Items: Array<SMSRechargerSimpleModel>;
}
export class SMSRechargerSimpleModel {
  Id: string;
  // 订单号
  RechargerCode: string;
  // 金额
  RechargerBalance: number;
  // 条数
  RechargerSMSNum: number;
  // 支付方式 1支付宝 2微信
  Paymethod: number;
  // 下单时间
  CreateTime: string;
  // 支付时间
  PayTime: string;
  // 0 待支付 1支付成功
  Status: number;
  // 0充值 1赠送 2兑奖
  Type: number;

}
/*
* 充值记录详情GET api/SMS/GetRecharger/{id}
* */
export class GetRechargerRequest {
  id: string;
}
export class GetRechargerResponse {
  Id: string;
  // 订单号
  RechargerCode: string;
  // 金额
  RechargerBalance: number;
  // 条数
  RechargerSMSNum: number;
  // 支付方式 1支付宝 2微信
  Paymethod: number;
  // 下单时间
  CreateTime: string;
  // 支付时间
  PayTime: string;
  // 0 待支付 1支付成功
  Status: number;
  // 0充值 1赠送 2兑奖
  Type: number;
}
/*
* 获得调用支付宝/微信数据POST api/SMS/SMSRecharger
* */
export class SMSRechargerRequest {
  // 241 支付宝 244 微信
  Paymethod: number;
  // 订单Id
  Id: string;
}
export class SMSRechargerResponse {
  // 返回提交表达 form 提提交 支付宝
  ChargeSubmitForm: string;
}
/*
* 生成订单 POST api/SMS/CreateRechargerRecord
* */
export class CreateRechargerRecordRequest {
  // 短信条数
  Num: number;
  // 金额
  Money: number;
}
export class CreateRechargerRecordResponse {
  // 单号
  RechargerCode: string;
  // 订单Id
  Id: string;
  // 金额
  Money: number;
  // 短信条数
  Num: number;
}
/*
* 根据模板类型code查找模板 GET api/SMS/GetTemplateList?typeCode={typeCode}
* */
export class GetTemplateListByCodeRequest {
  // 类别编号
  typeCode: string;
}
export class GetTemplateListByCodeResponse { // 数组
  // 模板Id
  Id: string;
  // 模板名称
  SMSName: string;
  // 模板内容
  SMSContext: string;
}
/*
* 模板类别列表 GET api/SMS/TemplateTypeList
* */
export class TemplateTypeListResponse { // 数组
  Id: string;
  // 编号
  Code: string;
  // 名称
  Name: string;
  // 数量
  Num: number;
}
/*
* 添加模板类别 POST api/SMS/AddTemplateType
* */
export class AddTemplateTypeRequest {
  // 类别名称
  TypeName: string = null;
}
/*
* 修改模板类别 POST api/SMS/EditTemplateType
* */
export class EditTemplateTypeRequest {
  // 类别编号
  TypeCode: string;
  // 类别名称
  TypeName: string;
}
/*
* 删除模板类别 POST api/SMS/DelTemplateType
* */
export class DelTemplateTypeRequest {
  // 模板类型编号
  TypeCode: string;
}
/*
* 聊天 GET api/SMS/GetChat/{id}?pageIndex={pageIndex}&pageSize={pageSize}
* */
export class GetChatRequest extends PageRequest {
  // 聊天人id
  id: string;
}
export class GetChatResponse extends PageResponse {
  Items: Array<ChatModel>;
}
export class ChatModel {
  // 发送时间
  SendTime: string;
  // 内容
  Content: string;
  // 发送人
  Sender: SMSContactsSimpleModel;
  // 0诊所发送 1患者回复
  Type: number;
}
/*
* 群发短信 POST api/SMS/SendGroupSMS
* */
export class SendGroupSMSRequest {
  // 患者Id
  PatientId?: string[] = [];
  // 医生编号
  DoctorCode?: string = null;
  // 是否重要
  IsImportant?: boolean = null;
  // 是否欠费
  IsArrearage?: boolean = null;
  // 开始时间
  SatrtTime?: string = null;
  // 结束时间
  EndTime?: string = null;
  // 就诊事项
  Aim?: string[] = [];
  // 患者标签code
  RelationCode?: string[] = [];
  // 患者来源code
  PatientsWith?: string = null;
  // 搜索关键字
  KeyWords?: string = null;
  // 短信
  Content?: string = null;
}
/*
*获取短信包
* */
export class SMSPackageListResponse {
  Num: number;
  Money: number;
}
/*
 6、短信设置已读 Message/SetRead
 2、通讯录-获取联系人列表Contacts/GetList
 * */
