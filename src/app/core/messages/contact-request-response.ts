/**
 * Created by chengqi on 2017/7/27.
 */
// 联系人列表（request）
export class GetListRequest {
  // 是否重要
  isImportant?: boolean= null;
  // 群组编号
  groupCode?: string= null;
  // 搜索关键字
  keyword?: string= null;
}
// 联系人列表（response）
export class GetListResponse {
  Id?: string;
  // 姓名
  Name?: string;
  // 手机号
  Tel?: string;
  // 头像
  Image?: string;
  // 拼音码
  PhoneticCode?: string;
  // 分类编号
  AddressListCode?: string;
  // 分类名称
  AddressListName?: string;
}
// 联系人详情(request)
export class GetRequest {
  // 联系人ID
  id: string;
}
// 联系人详情（response）
export class GetResponse {
  // id
  Id: string;
  // 姓名
  Name: string;
  // 手机号
  Tel: string;
  // 头像
  Image: string;
  // 拼音码
  PhoneticCode: string;
  // 群组编号
  AddressListCode: string;
  // 群组名称
  AddressListName: string;
  // 性别0男1女
  Sex: number;
  // 职位
  Job: string;
  // 地址
  Address: string;
  // 邮箱
  Mail: string;
  // QQ
  QQ: string;
  // 备注
  Note: string;
  // 省
  Province: string;
  // 市
  City: string;
  // 区
  Area: string;
  // 出生日期
  BirthDate: string;
  // 微博
  Weibo: string;
  // 微信
  Weixin: string;
  /*关联人*/
  ConPerson: string;
  /*
  * 关联人ID
  * */
  ConPersonID: string;
  /*
  * 关联人Code
  * */
  ConPersonCode: string;
  /*公司*/
  Company: string;
  // 座机
  Phone: string;
  // 是否重要
  IsImportant: boolean;
}
// 添加联系人(request)
export class AddRequest {
  // 姓名
  Name: string;
  // 手机号
  Tel: string;
  // 头像
  Image: string;
  // 群组编号
  AddressListCode: string;
  /*性别 0男 1女*/
  Sex: number;
  // 职位
  Job: string;
  // 所在地区
  Address: string;
  // 邮箱
  Mail: string;
  // QQ
  QQ: string;
  // 备注
  Note: string;
  // 省
  Province: string;
  // 市
  City: string;
  // 区
  Area: string;
  // 出生日期
  BirthDate: string;
  // 微博
  Weibo: string;
  /*微信*/
  Weixin: string;
  /*关联人ID*/
  ConPersonID: string;
  /*公司*/
  Company: string;
  // 座机
  Phone: string;
  // 是否重要
  IsImportant: boolean;
}
// 更新（request）
export class UpdateRequest {
  // 联系人id
  Id: string;
  // 姓名
  Name: string;
  // 手机号
  Tel: string;
  // 头像
  Image: string;
  // 群组编号
  AddressListCode: string;
  // 性别0男1女
  Sex: number;
  // 职位
  Job: string;
  // 所在地区
  Address: string;
  // 邮箱
  Mail: string;
  // QQ
  QQ: string;
  // 备注
  Note: string;
  // 省
  Province: string;
  // 市
  City: string;
  // 区
  Area: string;
  // 出生日期
  BirthDate: string;
  // 微博
  Weibo: string;
  // 微信
  Weixin: string;
  /*关联人ID*/
  ConPersonID: string;
  /*公司*/
  Company: string;
  // 座机
  Phone: string;
  // 是否重要
  IsImportant: boolean;
}
/*删除联系人(request)*/
export class DeleteRequest {
  // 主键
  Id: string;
}
// 群组列表(request)
export class GroupListRequest {
  // 群组名称
  GroupName: string;
  // 群组编号
  GroupCode: string;
  // 群组人数
  Num: number;
}
// 添加群组(request)
export class AddGroupRequest {
  // 群组名称
  GroupName: string;
  // 联系人Id集合
  ContactList: string[];
}
// 修改群组(request)
export class EditGroupRequest {
  // 群组编号
  GroupCode: string;
  // 群组名称
  GroupName: string;
}
// 删除群组(Request)
export class DeleteGroupRequest {
  // 群组编号
  GroupCode: string;
}
// 群组添加联系人(request)
export class AddContactsToGroup {
  // 群组编号
  GroupCode: string;
  // 联系人Id集合
  ContactList: string;
}
// 从群组移除联系人(request)
export class DeleteContactsFromGroupRequest {
  // 群组编号
  GroupCode: string;
  // 联系人Id集合
  ContactList: string;
}
// 通讯录人数统计(request)
export class AddressListStatisticsRequest {
  // 患者数量
  PatientCount: number;
  // 重要患者数量
  PatientCount_Important: number;
  // 员工数量
  WorkerCount: number;
  // 其他联系人数量
  ContactsCount: number;
  // 重要联系人数量
  ContactsCount_Important: number;
}
// 最近联系人(request)
export class RecentContactsListRequest {
  // ID
  Id: string;
  // 类型 0患者 1员工 2其他联系人
  Type: number;
  // 姓名
  Name: string;
  // 头像
  Image: string;
  // 手机号
  Tel: string;
}
// 联系人群组上下移(request)
export class ReorderGroupRequest {
  // 上移1 下移-1
  Offset: number;
  // 唯一标识
  Key: number;
}
