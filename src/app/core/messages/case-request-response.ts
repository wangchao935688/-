import {DictSimpleModel} from './model/dict-simple.model';
import {PageRequest, PageResponse} from './page-request-response';
import {CaseSimpleModel} from './model/case-simple.model';
import {CaseItemModel} from './model/case-item.model';
import {CaseRelationSimpleModel} from './model/case-relation-simple.model';
/**
 * Created by lijignlei on 2017/7/3.
 */
/*
* 患者详情
* */
export class CaseDetailsRequest {
  Id: string;
}
export class CaseDetailsResponse {
  Id?: string;
  // 病例code，空新建，非空修改
  CaseCode?: string;
  // 患者Id
  PatientId?: string;
  // 患者Code
  PatientCode?: string;
  // 患者姓名
  PatientName?: string;
  // 性别
  Sex?: number;
  // 年龄
  Age?: number;
  // 就诊时间
  VisitingTime?: string;
  // 病历类型 0 初诊 1 复诊
  CaseType?: number;
  // 医生编号
  DoctorCode?: string;
  // 医生姓名
  DoctorName?: string;
  // 护士编号
  NurseCode?: string;
  // 护士姓名
  NurseName?: string;
  // 就诊事项索引
  Aim?: string;
  // 就诊事项名称
  AimString?: string;
  // 主诉
  MainSuit?: string;
  //  现病史
  MedicalHistory?: string;
  // 既往史
  PastHistory?: string;
  // 医嘱
  DoctorAdvice?: string;
  // 病例标签名称 多个逗号分隔
  RelationName?: string;
  // 患者权限
  PatientEnabled?: number;
  // 是否是图片病历
  IsImageCase?: boolean;
  // 病历图片，多张用逗号隔开
  CaseImage?: string;
  // 病例标签
  RelationNameList?: Array<DictSimpleModel>;
  // 病例详情
  CaseItemList?: Array<CaseItemModel>;
}

/*
* 患者的所有病例列表（patientID）
* */
export class CaseListRequest {
  patientID: string;
}
export class CaseListResponse extends PageResponse {
  Items: Array<CaseListModel>;
}
export class CaseListModel {
  Id: string;
  // 病例编号
  CaseCode?: string;
  // 账单时间
  VisitingTime?: string;
  // 患者删除标记
  PatientEnabled?: number;
  // 患者code
  PatientCode?: string;
  // 患者名
  PatientName?: string;
  // 标签名称
  RelationName?: string;
  // 医生编号
  DoctorCode?: string;
  // 医生名称
  CaseType?: number;
  // 是否是图片病例
  IsImageCase?: boolean;
}
/*
* 患者的所有病例列表（PatientCode）
* */
/*export class GetCaseListRequest extends PageRequest {
  PatientCode?: string;
}
export class GetCaseListResponse extends PageResponse {
  Items: Array<CaseListModel>;
}*/
/*
* 所有患者病例列表
* */
export class GetCaseListByRequest extends PageRequest {
  // 医生ID
  doctorID?: string = null;
  // 标签ID
  relationID?: string  = null;
  // 搜索关键字
  keyword?: string  = null;
  // 0初诊 1复诊
  patlogType?: string  = null;
  // 开始时间
  beginTime?: string  = null;
  // 结束时间
  endTime?: string  = null;
}
export class GetCaseListByResponse extends PageResponse {
  Items: Array<CaseSimpleModel>;
}
/*
*  新增病例
* */
export class SaveCaseRequest {
  // 病例ID，空新建，非空修改
  Id: string;
  // 病例code
  CaseCode: string;
  // 患者编号
  PatientCode: string;
  // 就诊时间
  VisitingTime: string;
  // 病历类型 0 初诊 1 复诊
  CaseType: string;
  // 医生编号
  DoctorCode: string;
  // 护士编号
  NurseCode: string;
  // 就诊事项
  Aim: string;
  // 主诉
  MainSuit: string;
  // 现病史
  MedicalHistory: string;
  // 既往史
  PastHistory: string;
  // 医嘱
  DoctorAdvice: string;
  // 是否是图片病历
  IsImageCase: boolean;
  // 病历图片，多张用逗号隔开
  CaseImage: string;
  // 病例详情
  CaseItemList: Array<CaseItemModel>;
  // 病例标签列表
  CaseRelationList: Array<DictSimpleModel>;
}
/*
* 标签列表
* */
export class CaseRelationListRequest {
  Items: Array<CaseRelationSimpleModel>;
}
/*
*标签上下移
* */
export class ReorderCaseRelationRequest {
  // 上移1 下移-1
  Offset: number;
  Id: string;
}
/*
* 添加病历标签
* */
export class AddCaseRelationRequest {
  Name: string;
}
/*
* 修改病例标签
* */
export class EditCaseRelationRequest {
  Id: string;
  Name: string;
}
/*
* 删除病例标签
* */
export class DelCaseRelationRequest {
  ID: string;
}
/*
* 医嘱模板列表--医生常用语
* */
export class GetDoctorAdviceTemplateListRequest extends PageRequest {

}
export class  GetDoctorAdviceTemplateListResponse extends PageResponse {
  Items: Array<DoctorAdviceTemplateSimple>;
}
export class DoctorAdviceTemplateSimple {
  ID: string;
  Content: string;
}
/*
 * 上下移医嘱模板--医生常用语
 * */
export class ReorderDoctorAdviceTemplateRequest {
  // 上移1 下移-1
  Offset: number;
  Id: string;
}
/*
* 添加医嘱模板--医生常用语
* */
export class AddDoctorAdviceTemplateRequest {
// 内容
Content: string;
}
/*
* 修改医嘱模板--医生常用语
* */
export class EditDoctorAdviceTemplateRequest {
ID: string;
// 内容
Content: string;
}
/*
* 删除医嘱模板--医生常用语
* */
export class DelDoctorAdviceTemplateRequest {
  ID: string;
}
/*
* 病例模板列表/搜索
* */
export class TemplateListRequest extends PageRequest {
  // 常用-1，我的模板0，系统模板2
  Type: number;
  // 搜索关键字
  Search?: string;
}
export class TemplateListResponse extends PageResponse {
  Items: Array<TemplateNameModel>;
}
export class TemplateNameModel {
  // 模板id
  Id: string;
  // 模板名称
  Title: string;
}
/*
* 病例模板详情
* */
export class TemplateDetailsRequest {
  Id: string;
}
export class TemplateItemModel {
  // 类型 0 主诉 1 现病史 2 既往史 3 检查 4 X光检查 5 诊断 6 治疗计划 7 治疗
  Type: number;
  // 类型名称
  TypeName: string;
  // 内容
  Content: string;
}
export class TemplateDetailsResponse {
  // 模版ID
  Id: string;
  // 标题
  Title: string;
  // 主诉
  ZS: TemplateItemModel;
  // 现病史
  XBS: TemplateItemModel;
  // 既往史
  JWS: TemplateItemModel;
  // 检查
  JC: TemplateItemModel;
  // X光检查
  XGJC: TemplateItemModel;
  // 诊断
  ZD: TemplateItemModel;
  // 治疗计划
  ZLJH: TemplateItemModel;
  // 治疗
  ZL: TemplateItemModel;
}
/*
* 词条类别列表
* */
export class LemmaCategoryListRequest extends PageRequest {
  // 常用-1，我的模板0，系统模板2
  Type?: number;
  // 搜索关键字
  Search?: string;
}
export class LemmaCategoryListResponse {
  Items: Array<LemmaMainCategory>;
}
export class LemmaMainCategory {
  Id: string;
  // 词条分类名称
  Name: string;
  // 词条子类列表
  Items: Array<LemmaSubCategory>;
}
export class LemmaSubCategory {
  Id: string;
  // Pid
  Pid: string;
  // 分类别
  Name: string;
  // 分别词条数
  Num: number;
}
/*
*添加词条类别
* */
export class AddLemmaTypeRequest {
  // 父id
  Pid: string;
  // 名称
  Name: string;
}
/*
* 修改词条类别
* */
export class EditLemmaTypeRequest {
  Id: string;
  // 父id
  Pid: string;
  // 名称
  Name: string;
}
/*
* 删除词条类别
* */
export class DelLemmaTypeRequest {
  ID: string;
}
/*
* 词条列表
* */
export class LemmaListRequest {
  // 类别，1主拆，现病史，既往史，2检查，3x光检查，4诊断，5治疗计划，6治疗
  Type: number;
  // 主类
  MainCategoryId: string;
  // 子类
  SubCategoryId: string;
}
export class LemmaListResponse {
  Items: Array<CaseLemmaGroup>;
}
export class CaseLemmaGroup {
  // 组id
  Id: string;
  // 组名称
  Name: string;
  // 词条列表
  Items: Array<CaseSourceLemma>;
}
export class CaseSourceLemma {
  // 词条id
  Id: string;
  // 组id
  GroupId: string;
  // 组名称
  GroupName: string;
  // 词条内容
  Content: string;
}
/*
* 添加词条
* */
export class AddLemmaRequest {
  // 类别，1主拆，现病史，既往史，2检查，3x光检查，4诊断，5治疗计划，6治疗
  Type: number;
  // 类别id
  CategoryId: string;
  // 群组id
  GroupId: string;
  // 内容
  Content: string;
}
/*
* 修改词条
* */
export class EditLemmaRequest {
  // 内容
  Content: string;
  // 主键
  ID: string;
}
/*
* 删除词条
* */
export class DelLemmaRequest {
  ID: string;
}
