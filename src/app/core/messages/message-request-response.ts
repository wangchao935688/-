/**
 * Created by bingq on 2017/8/1.
 */
export class SetReadRequest{
  /**
   *消息类别
   */
  MessageKind:number
  /**
   *聊天对象code
   */
  ChatUserCode:string;

  /**
   *消息id(app系统消息,金茄子)
   */
  Id:string;
}

export class GetHistoryMessagesRequest{
  /**
   *聊天人环信code
   */
  chatUserCode:string;
  /**
   *类型
   */
  messageKind:number;
  /**
   *页容量
   */
  pageSize:number;
  /**
   *最后一条id
   */
  lastMsgId:string;
}

export class GetHistoryMessagesResponse{
  /**
   * 更多消息 1 有 2 没有
   */
  HaveMore:number;
  /**
   * 上次msgId
   */
  LastMsgId:string;
  /**
   * 聊天记录
   */
  Items:HistoryMessage_Full[];
}

export class HistoryMessage_Full{
  /**
   *
   */
  Id:string;
  /**
   *发送人
   */
  FromUser:string;
  /**
   *发送人id
   */
  FromUserId:string;
  /**
   *发送人姓名
   */
  FromUserName:string;
  /**
   *接收人
   */
  ToUser:string;
  /**
   *接收人id
   */
  ToUserId:string;
  /**
   *接收人姓名
   */
  ToUserName:string;
  /**
   *内容
   */
  MessageContent:string;
  /**
   *MessageType（消息类型 0文字 1图片 2语音 位置 4视频 5链接）
   */
  MessageType:number;
  /**
   *消息类型
   */
  MessageKind:number;
  /**
   *发送时间
   */
  SendTime:string;
  /**
   *0 发送 1是接受
   */
  Flog:number;
  /**
   *扩展字段
   */
  ExtMsg:string;

  /**
   * 是否隐藏时间，接口中没有此字段
   */
  hideTime:number;
}

export class RecentChat_Full{
  Id:number;
  /**
   * 类型（消息类型 0文字 1图片 2语音 位置 4视频 5链接）
   */
  MessageType:number;
  /**
   * 内容
   */
  MessageContent:string;
  /**
   * 消息的种类 0用户消息 1系统消息 2预约提醒 3微信预约 4日程安排 5库存预警
   */
  MessageKind:number;
  /**
   * 消息id
   */
  MessageId:string;
  /**
   * 时长
   */
  Duration:number;
  /**
   * 修改时间
   */
  UpdateTime:string;
  /**
   *未读数量
   */
  UnReadCount:number;
  /**
   * 扩展
   */
  ExtMsg:string;
  /**
   * 对面环信code
   */
  ChatUser:string;
  /**
   * 对面名称
   */
  ChatUserName:string;
  /**
   * 0 发送 1是接受
   */
  MessageFlag:number;
  /**
   * 自己环信code
   */
  OwnUser:string;
  /**
   * 头像
   */
  ChatHeadPhoto:string;
}

export class DeleteToMessageRequest{
  /**
   *洽谈消息id
   */
  MsgId:string;
  /**
   *消息id(系统消息)
   */
  Id:string;
}

export class DeleteChatRequest{
  /**
   *消息类别
   */
  MessageKind:number;
  /**
   *聊天对象code
   */
  ChatUserCode:string;

}
export class StorageMessageRequest{
  ToUser:string; //接受者
  ToUserId:string;//接受者Id
  ToUserName:string;//接受者名称
  ToType=0;//	  接受这类型0用户 1聊天室 2群组
  MessageContent:string;//消息内容
  MessageType:number;//MessageType（消息类型 0文字 1图片 2语音）
  MessageKind=0;//消息的种类 0用户消息 1系统消息 2预约提醒 3微信预约 4日程安排 5库存预警
  Duration:number;//时长s
  ExtMsg:string;//扩展消息
  SendTime:string;//发送时间
}

export class StorageMessageResponse{
  MessageId:string;
}

export class GetUserTokenResponse{
  /**
   * 用于接受系统通知
   */
  OutRoomId:string;
  /**
   * 环信token
   */
  IMToken:string;
}

/**
 * 用于的即时通讯上下文信息
 */
export class ImInfoContext extends GetUserTokenResponse{
  WorkerCode:string;
}
