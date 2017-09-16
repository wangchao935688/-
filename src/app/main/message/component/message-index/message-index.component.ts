import {
  Component, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {UserService} from "../../../../core/service/user.service";
import {MessageService} from "../../../../core/service/message.service";
import * as MessageRequestResponse from  '../../../../core/messages/message-request-response';
import {WorkerService} from "../../../../core/service/worker.service";
import * as WorkerRequestResponse from "../../../../core/messages/worker-request-response";
import {WorkerAccessState} from "../../../../core/enums/worker-access-state.enum";
import {WorkerFull} from "../../../../core/messages/model/woker_full";
import {HistoryMessage_Full} from "../../../../core/messages/message-request-response";
import {GeneralService} from "../../../../core/service/general.service";
import {FormGroup, FormControl} from "@angular/forms";
/**
 * 声明环信全局变量
 */
declare var WebIM:any;

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.scss']
})
export class MessageIndexComponent implements OnInit, OnDestroy {
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  scrollbarOptionsRight = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  toggle = false;
  displayStatus: '';
  im: any = {
    switch: {
      openAll: 0,
      isOpen: 0,
      tabIndex: 0,
      tabChildIndex: 11,
      isShowEmojis: 0,
      isShowEmojisHover: 0,
      isEnableEmojis: 1,
    },
    friendDefault: {
      headImage: "/images/patientDef.png"
    },
    qiezziImConfig: {
      systemUser: "hx_admin1",
      pageSize: 20
    },
    isNoMessageResult: 0,
    isLoadingMore: 0,
    currentMoreItemSeq: null,
    currentListLastMsgId: null,
    currentListHaveMore: 0,
    currentListMessageKind: 1,
    isLoadingRecentChatList: 1,
    isSendingMessage: 0,
    isLoading: 0,
    currentListFetchToEnd: 0,
    systemUserDic: {
      "1": {nickname: "系统消息", headImage: "/images/mag_lie1.png"},
      "2": {nickname: "预约提醒", headImage: "/images/mag_lie2.png"},
      "3": {nickname: "微信预约", headImage: "/images/mag_lie3.png"},
      "4": {nickname: "日程安排", headImage: "/images/mag_lie4.png"},
      "5": {nickname: "库存预警", headImage: "/images/mag_lie5.png"},
      "1active": {nickname: "系统消息", headImage: "/images/mag_lie1_active.png"},
      "2active": {nickname: "预约提醒", headImage: "/images/mag_lie2_active.png"},
      "3active": {nickname: "微信预约", headImage: "/images/mag_lie3_active.png"},
      "4active": {nickname: "日程安排", headImage: "/images/mag_lie4_active.png"},
      "5active": {nickname: "库存预警", headImage: "/images/mag_lie5_active.png"}
    },
    allUnReadCount: 0
  };
//当前聊天对象
  currentRecentChat: MessageRequestResponse.RecentChat_Full = null;
  friendListStorage: WorkerFull[] = null;
  //当前展示的同事列表
  friendList: WorkerFull[] = null;
  //当前选择的同事
  currentFriend: WorkerFull = null;
  //同事搜索结果
  searchFriendList: WorkerFull[] = null;
//当前聊天列表
  messageListStorage: HistoryMessage_Full[] = null;
  //发送消息的内容
  msgContent: string;
//搜索内容
  search: string;
  //最近聊天的数据仓库
  recentChatListStorage: MessageRequestResponse.RecentChat_Full[] = null;
  //搜索formGroup
  formGroup:FormGroup;
  constructor(private router: Router, private el: ElementRef,
              private route: ActivatedRoute, private applicationService: ApplicationService, private userService: UserService,
              private messageService: MessageService, private workerService: WorkerService,
              private generateService: GeneralService
  ) {
    // 初始化消息到达回调
    this.messageService.processMessageHandler = this.processReciveMessage.bind(this);
  }

  ngOnInit() {
    this.applicationService.workModule = this;
    this.applicationService.workBoard = this.el.nativeElement;
    this.im.emojis = WebIM.Emoji;

    this.openIm();

    this.formGroup = new FormGroup ({
      PatientName: new FormControl()
    });
  }
  ngOnDestroy(): void {
    this.messageService.processMessageHandler=null;
  }
  private openIm() {
    this.im.switch.isOpen = 1;
    if (this.im.switch.tabIndex == 0) {
      this.switchTab(1);

      return;
    }
    if (!this.currentRecentChat) {
      return;
    }
    else {
      if (this.im.switch.tabIndex == 1) {
        this.selectRecentChat(this.currentRecentChat, 1);//刷新
        ////标记消息为已读
        let tempRecentChat = this.currentRecentChat as MessageRequestResponse.RecentChat_Full;
        this.messageService.setRead(tempRecentChat.ChatUser, tempRecentChat.MessageKind).subscribe(res => {
          setTimeout(function () {
            if (!this.currentRecentChat) {
              return;
            }
            this.currentRecentChat.UnReadCount = 0;

            this.otherGetRecentChatList();
          }, 1000)
        });
      }
      else if (this.im.switch.tabIndex == 3) {
        let seq = this.im.currentListMessageKind;
        this.selectMore(seq);
        //标记消息为已读
        this.messageService.setRead(this.currentRecentChat.ChatUser, this.currentRecentChat.MessageKind,).subscribe(t => {
          if (!this.currentRecentChat) {
            return;
          }
          this.currentRecentChat.UnReadCount = 0;
          //计算当前未读消息
          this.otherGetRecentChatList();
        });
      }
    }
  }

  private closeIm() {
    this.im.switch.isOpen = 0;
  }

  //页面跳转
  private jumpToUrl = function (url) {
    this.closeIm();
    location.href = url;
  }

  /**
   * tab 切换
   * @param tabIndex
   * @param flag
   * @param isForce
   */
switchTab(tabIndex, flag?, isForce?) {
    if (this.im.switch.tabIndex == tabIndex && !isForce) {
      return;
    }
    this.im.switch.tabIndex = tabIndex;
    this.im.currentListLastMsgId = null;
    this.im.currentListHaveMore = null;

    if (tabIndex == 2) {               //同事栏目
      this.im.switch.tabChildIndex = "2" + (1 + 0);
      this.im.currentRecentChat = null;
      this.getFriendList();
    }
    else if (tabIndex == 3) { //系统消息栏目
      this.im.search = "";
      this.im.currentMoreItemSeq = null;
      this.selectMore(1);
    }
    else if (tabIndex == 1) { //最近消息
      this.im.search = "";
      this.im.switch.tabChildIndex = "11";
      if (!flag) {
        this.im.currentRecentChat = null;
      }
      this.getRecentChatList();
    }
  }
/*
* TODO 叉号
* */
  clickcross () {
    this.toggle = !this.toggle;
  }
  //获取同时列表
  private getFriendList() {
    let request = new WorkerRequestResponse.GetListWorkerFullRequest();
    request.pageIndex = 1;
    request.pageSize = 1000;
    request.accessState = WorkerAccessState.ok;
    this.workerService.getListWorkerFull(request).subscribe(t => {
      this.friendListStorage = t.Items;
      this.friendList = this.friendListStorage;
      if (this.friendList.length > 0) {
        this.currentFriend = this.friendList[0];
        if (this.currentRecentChat) {
          return;
        }
        this.selectFriend(this.currentFriend);
      }
    });
  }

  //IM生成IMUser
  private generateIMUser(code) {
    if (code == "hx_admin1") {
      return code;
    }
    return "d_" + code.replace(/\s+/g, "");
  }

  //删除消息
  private processDeleteMessage(msg) {
    let isToMessage = this.generateIMUser(this.currentUser.WorkerCode) == msg.ToUser;
    if (isToMessage) {
      this.messageService.deleteToMessage(msg.Id).subscribe();
    }
    else {
      // messageService.deleteFromMessage(msg.Id);
    }
    let theIndex = this.messageListStorage.findIndex(item => {
      return item.Id == msg.Id;
    });
    this.messageListStorage.splice(theIndex, 1);
  }

  //删除提示
  private deleteMessage(msg) {
    this.applicationService.frontLayer.openConfirmDialog('确定要删除吗').subscribe(t => {
      if (t) {
        this.processDeleteMessage(msg);
      }
    });
  }

  //---------同事--------//
  //选中同事
  private selectFriend(model) {
    this.currentFriend = model;
    this.im.switch.tabChildIndex = "2" + (1 + 0);
  }

  //发送消息
 sendMessage(friend) {
   if (this.currentRecentChat) {
     this.im.switch.tabChildIndex = "11";
     return;
   }
   this.currentRecentChat = new MessageRequestResponse.RecentChat_Full();
   if (friend) {
     this.currentFriend = friend;
   }
   this.currentRecentChat.ChatUser = this.generateIMUser(this.currentFriend.WorkerCode);
   this.currentRecentChat.ChatUserName = this.currentFriend.WorkerName;
   this.currentRecentChat.UpdateTime = new Date().toString();
   this.currentRecentChat.MessageKind = 0;
   this.messageListStorage = null;
   this.switchTab(1, 1, 1);
 }

  //发送消息搜索
sendMessageSearch = function (friend) {
  this.currentRecentChat = new MessageRequestResponse.RecentChat_Full();
  if (friend) {
    this.currentFriend = friend;
  }
  this.currentRecentChat.ChatUser = this.generateIMUser(this.currentFriend.WorkerCode);
  this.currentRecentChat.ChatUserName = this.currentFriend.WorkerName;
  this.currentRecentChat.UpdateTime = new Date();
  this.currentRecentChat.MessageKind = 0;
  this.messageListStorage = null;
  this.switchTab(1, 1, 1);
}

  private keySendMessage = function ($event) {
    //console.log($event.altKey + "" + $event.which)
    //console.log($event.ctrlKey + "" + $event.which);
    //console.log("  " + $event.keyCode);
    var code = $event.keyCode || $event.which;
    if (!this.msgContent) {
      this.msgContent = "";
    }
    if ($event.ctrlKey && (code == 10)) {
      this.msgContent += "\r\n";
    }
    if (code == 13) {
      this.sendTextMsg();
    }
    return;
  }
  //替换字符串
  private replaceString(str) {
    return str.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
  }

  //朋友搜索
  private searchFriend() {
    if (this.friendListStorage) {
      this.searchFriendList = this.friendListStorage.filter(t => {
        return t.WorkerName.indexOf(this.search);
      })
      if (this.searchFriendList.length > 0) {
      }
      return;
    }
  }

  //获取friendName
  private GetFriendByUserName(searchUser) {
    if (this.friendListStorage) {
      let temp = this.friendListStorage.find(t => {
        return this.generateIMUser(t.WorkerCode).toLowerCase() == searchUser.toLowerCase();
      });
      return temp || null;
    }
    return null;
  }

  //获取朋友的头像
  private GetFriendPhotoByUserName(username) {
    var friend = this.GetFriendByUserName(username);
    if (friend) {
      return friend.HeadImageUrl;
    }
    return null;
  }

  //获取朋友实体
  private loadFriendList() {
    let request = new WorkerRequestResponse.GetListWorkerFullRequest();
    request.pageIndex = 1;
    request.pageSize = 1000;
    request.accessState = WorkerAccessState.ok;
    this.workerService.getListWorkerFull(request).subscribe(t => {
      this.friendListStorage = t.Items;
    });
  }

  //---------更多--------//
   selectMore(seq) {
    if (seq == this.im.currentMoreItemSeq) {
      return;
    }
    this.im.isNoMessageResult = 0;
    this.im.currentMoreItemSeq = seq;
    this.im.switch.tabChildIndex = "3" + seq;
    this.im.currentListMessageKind = seq;
    this.im.currentListFetchToEnd = 0;
    this.im.currentListHaveMore = 0;
    this.messageListStorage = null;
    this.im.currentListLastMsgId = null;
    this.currentRecentChat = {"ChatUser": this.im.qiezziImConfig.systemUser, "MessageKind": seq} as MessageRequestResponse.RecentChat_Full
    this.loadMessageList();
    //标记消息为已读
    this.messageService.setRead(this.currentRecentChat.ChatUser, parseInt(seq)).subscribe(t => {
      if (!this.currentRecentChat) {
        return;
      }
      this.currentRecentChat.UnReadCount = 0;
      //计算当前未读消息
      this.otherGetRecentChatList();
    });
  }

  //加载更多消息
  private loadMessageList() {
    this.im.isLoading = 1;
    this.im.currentListHaveMore = 0;
    let request = new MessageRequestResponse.GetHistoryMessagesRequest();
    request.chatUserCode = this.currentRecentChat.ChatUser;
    request.lastMsgId = this.im.currentListLastMsgId;
    request.messageKind = this.im.currentListMessageKind;
    request.pageSize = this.im.qiezziImConfig.pageSize;
    this.messageService.getHistoryMessages(request).subscribe(res => {
      this.im.isLoading = 0;
      if (request.chatUserCode != this.currentRecentChat.ChatUser) {
        return false;
      }
      if (!res.Items || res.Items.length == 0) {
        this.im.isNoMessageResult = 1;
        this.messageListStorage = [];
        return;
      }

      res.Items.forEach(item => {
        item.ExtMsg = JSON.parse(item.ExtMsg);
      });

      if (this.messageListStorage) {
        this.messageListStorage = res.Items.concat(this.messageListStorage);
      }
      else {
        this.messageListStorage = res.Items;
      }

      this.im.isNoMessageResult = 0;

      if (this.im.currentListLastMsgId && !res.HaveMore) {
        this.im.currentListFetchToEnd = 1;
      }
      this.im.currentListLastMsgId = res.HaveMore ? res.LastMsgId : null;

      this.im.currentListHaveMore = res.HaveMore;

      this.scrollToLoaction();


    });
  };

  //重新计算未读
  private reCalculateUnRead() {
    let allCount = 0;
    this.recentChatListStorage.forEach(item => {
      if (!item || !item.UnReadCount) {
        return;
      }
      allCount += item.UnReadCount;
    });
    this.im.allUnReadCount = allCount;
  }

  //---------最近聊天--------//
  //选中聊天对象
  private selectRecentChat(chat, seq) {

    if (!this.currentRecentChat) {
      return;
    }
    if (chat.ChatUser == this.currentRecentChat.ChatUser && this.currentRecentChat.MessageKind == chat.MessageKind && !seq) {
      return;
    }

    if (chat.MessageKind != 0) {
      this.im.switch.tabChildIndex = "3" + chat.MessageKind;
    } else {
      this.im.switch.tabChildIndex = "11";
    }
    this.im.isNoMessageResult = 0;
    this.currentRecentChat = chat;
    this.im.isLoadingMore = 0;
    this.im.currentListMessageKind = chat.MessageKind;
    this.im.currentListFetchToEnd = 0;
    this.im.currentListHaveMore = 0;
    this.messageListStorage = null;
    this.im.currentListLastMsgId = null;
    this.loadMessageList();

    //标记消息为已读
    this.messageService.setRead(chat.MessageKind, chat.ChatUser).subscribe(t => {
      if (!this.currentRecentChat) {
        return;
      }
      this.currentRecentChat.UnReadCount = 0;
      //计算当前未读消息
      this.reCalculateUnRead();
    });
    this.messageService.setRead(chat.MessageKind, chat.ChatUser).subscribe(res => {
      if (!this.currentRecentChat) {
        return;
      }
      this.currentRecentChat.UnReadCount = 0;
      //计算当前未读消息
      this.reCalculateUnRead();
    });
  }

  //加载最近聊天
  private getRecentChatList() {
    this.im.isLoadingRecentChatList = 1;
    this.messageService.getRecentChat().subscribe(res => {
        this.im.isLoadingRecentChatList = 0;
        let yourselfItemIndex = res.findIndex(item => {
          return item.ChatUser == item.OwnUser && item.MessageFlag == 0;
        });

        if (yourselfItemIndex > -1) { //异常自己给自己发送的消息
          res.splice(yourselfItemIndex, 1);
        }

        res.forEach(item => {
          item.ExtMsg = JSON.parse(item.ExtMsg);
        });

        this.recentChatListStorage = res;

        if (this.recentChatListStorage.length > 0) {
          if (this.currentRecentChat) {
            this.currentRecentChat = this.recentChatListStorage[0];
          }
        }

        //设置当前选中项
        if (this.currentRecentChat) {
          let indexR = this.recentChatListStorage.findIndex(item => {
            return item.ChatUser == this.currentRecentChat.ChatUser;
          });

          if (indexR == -1) {
            this.recentChatListStorage.unshift(this.currentRecentChat);
          } else {
            this.currentRecentChat = this.recentChatListStorage[indexR];
          }

          this.selectRecentChat(this.currentRecentChat, 1);
        }
        else {
          return;
        }
        this.moveChatToFirst();
        //计算当前未读消息
        this.reCalculateUnRead();
      },
      error => {
        this.im.isLoadingRecentChatList = 0;
      });
  };

  //不在最近聊天时刷新最近聊天
  private otherGetRecentChatList() {
    this.messageService.getRecentChat().subscribe(res => {
      let yourselfItemIndex = res.findIndex(item => {
        return item.ChatUser == item.OwnUser && item.MessageFlag == 0;
      });
      if (yourselfItemIndex > -1) { //异常自己给自己发送的消息
        res.splice(yourselfItemIndex, 1);
      }

      res.forEach(item => {
        item.ExtMsg = JSON.parse(item.ExtMsg);
      });

      this.recentChatListStorage = res;

      //计算当前未读消息
      this.reCalculateUnRead();
    });
  }

  //移除聊天对象
  private removeChat(chat) {
    let theIndex = this.recentChatListStorage.findIndex(item => {
      return item.ChatUser == chat.ChatUser && item.MessageKind == chat.MessageKind;
    });
    this.recentChatListStorage.splice(theIndex, 1);
    if (this.recentChatListStorage) {
      if (this.recentChatListStorage.length > 0) {
        if (chat.ChatUser == this.currentRecentChat.ChatUser && chat.MessageKind == this.currentRecentChat.MessageKind) {
          if (theIndex == this.recentChatListStorage.length) {
            this.currentRecentChat = this.recentChatListStorage[0];
          }
          else {
            this.currentRecentChat = this.recentChatListStorage[theIndex];
          }
        }
        else {
        }
        this.selectRecentChat(this.currentRecentChat, 1);
      }
      else {
        if (this.currentRecentChat.MessageKind != 0) {
          this.im.switch.tabChildIndex = "11";
        }
        this.currentRecentChat = null;
        this.messageListStorage = null;
      }
    }

    this.messageService.deleteChat(chat.C, chat.MessageKind).subscribe(t => {
      //计算当前未读消息
      this.reCalculateUnRead();
    });
  }

  //处理接受到的消息
  private processReciveMessage(message) {
    //request
    let historyMessage = new MessageRequestResponse.HistoryMessage_Full();

    historyMessage.ExtMsg = message.ext;
    historyMessage.MessageContent = message.data;
    historyMessage.MessageKind = message.ext.NotifyKind == 6 ? 5 : message.ext.NotifyKind;
    if (historyMessage.MessageKind == 6) {
      historyMessage.MessageKind = 5;
    }

    historyMessage.FromUser = message.from;
    historyMessage.FromUserName = message.ext.Nickname;
    historyMessage.Id = message.ext.MsgId;
    historyMessage.MessageType = message.ext.MessageType;
    // historyMessage.ToType = 0;
    historyMessage.ToUser = message.to;
    historyMessage.ToUserName = this.currentworker.WorkerName;
    historyMessage.SendTime = new Date().toDateString();

    if (historyMessage.MessageKind === undefined) {
      historyMessage.MessageKind = 0;
    }
    if (historyMessage.MessageType === undefined) {
      historyMessage.MessageType = 0;
    }
    if (historyMessage.MessageKind == 0) {
      if (!this.GetFriendByUserName(message.from)) {
        return;
      }
    }

    if (historyMessage.MessageKind == 4) { //弹出日程提醒
      let dateString = message.ext.SendTime.toString();
      if (dateString.indexOf("GMT") == -1 && this.isChrome()) {
        dateString = new Date(dateString);
        dateString = new Date(dateString.valueOf() - 8 * 60 * 60 * 1000);
      }
      //判断是否弹框
      let intervalSecond = this.getDateDiff(dateString.toString(), historyMessage.SendTime.toString(), "second");//+ 28800
      if (intervalSecond < 120) {
        this.alertScheduleMessage(message);
      }
    }

    if (!this.im.switch.isOpen || this.im.switch.tabIndex != 1) {
      setTimeout(() => {
        this.otherGetRecentChatList();
      }, 2000);
      return;
    }

    if (this.currentRecentChat && this.currentRecentChat.ChatUser.toLowerCase() == historyMessage.FromUser && this.currentRecentChat.MessageKind == historyMessage.MessageKind) {
      if (this.messageListStorage && message.ext.NotifyKind != 1) {
        let msgIndex = this.messageListStorage.findIndex(item => {
          return item.Id == message.ext.MsgId;
        });
        if (msgIndex > -1) {
          return;
        }
      }
      if ((this.currentRecentChat.ChatUser != this.generateIMUser(this.currentUser.WorkerCode))) {
        //判断是否显示时间
        if (this.messageListStorage.length > 0 && this.currentRecentChat.MessageKind === 0) {
          let intervalSecond = this.getDateDiff(this.messageListStorage[this.messageListStorage.length - 1].SendTime, historyMessage.SendTime, "second");
          if (intervalSecond < 60) {
            historyMessage.hideTime = 1;
          }
        }
        this.messageListStorage.push(historyMessage);
      }
      this.currentRecentChat.MessageContent = historyMessage.MessageContent;
      this.currentRecentChat.UpdateTime = new Date().toDateString();

      //标记消息为已读
      this.messageService.setRead(historyMessage.FromUser, historyMessage.MessageKind).subscribe(res => {
        if (!this.im.currentRecentChat) {
          return;
        }
        this.currentRecentChat.UnReadCount = 0;
      });

      this.moveChatToFirst();
      setTimeout(() => {
        this.scrollToLoaction();
      }, 500);
    }
    else {
      setTimeout(() => {
        this.otherGetRecentChatList();
      }, 2000);
    }
  }

  // 私聊发送文本消息，发送表情同发送文本消息，只是会在对方客户端将表情文本进行解析成图片
  private sendPrivateText(msgContent, messageType) {
    this.im.isSendingMessage = 1;
    let id = this.applicationService.imConn.getUniqueId();
    let msg = new WebIM.message('txt', id);
    let ext: any = {};
    ext.MessageType = messageType;
    ext.NotifyKind = 0;
    ext.HeadPhoto = this.currentworker.HeadImageUrl;
    ext.Nickname = this.currentworker.WorkerName;

    //request
    let requestStroage = new MessageRequestResponse.StorageMessageRequest();
    requestStroage.ExtMsg = JSON.stringify(ext);
    requestStroage.MessageContent = msgContent;
    requestStroage.MessageKind = 0;
    requestStroage.MessageType = messageType;
    requestStroage.ToType = 0;
    requestStroage.ToUser = this.currentRecentChat.ChatUser;
    requestStroage.ToUserName = this.currentRecentChat.ChatUserName;
    requestStroage.SendTime = this.generateService.getServerTime();

    this.messageService.storageMessage(requestStroage).subscribe(res => {
      this.im.isSendingMessage = 0;
      let message = JSON.parse(JSON.stringify(requestStroage)) as HistoryMessage_Full;

      message.Id = res.MessageId;
      ext.MsgId = message.Id;
      requestStroage.ExtMsg = ext;
      //添加到聊天列表
      this.im.currentListLastMsgId = message.Id;
      if (!this.messageListStorage) {
        this.messageListStorage = [];
      }
      //判断是否显示时间
      if (this.messageListStorage.length > 0) {
        let dateString: any = this.messageListStorage[this.messageListStorage.length - 1].SendTime.toString();
        if (dateString.indexOf("GMT") == -1 && this.isChrome()) {
          dateString = new Date(dateString.valueOf() - 8 * 60 * 60 * 1000);
        }
        var intervalSecond = this.getDateDiff(dateString.toString(), requestStroage.SendTime.toString(), "second");
        if (intervalSecond < 60) {
          message.hideTime = 1;
        }
      }
      this.messageListStorage.push(message);
      //环信发送
      ext.MsgId = message.Id;
      msg.set({
        msg: msgContent,                       // 消息内容
        ext: ext,
        to: this.currentRecentChat.ChatUser,                          // 接收消息对象
        roomType: false,
        success: function (id, serverMsgId) {
          console.log("send private text Success");
        }
      });
      msg.body.chatType = 'singleChat';
      this.applicationService.imConn.send(msg.body);
      this.msgContent = "";
      if (!this.recentChatListStorage) {
        this.recentChatListStorage = [];
      }
      this.currentRecentChat.MessageContent = requestStroage.MessageContent;
      this.currentRecentChat.MessageType = requestStroage.MessageType;
      this.currentRecentChat.UpdateTime = new Date().toDateString();
      //移至第一位
      this.moveChatToFirst();
      this.scrollToLoaction();
    });
  }

  //把最近聊天移到第一位
  private moveChatToFirst(data?: MessageRequestResponse.RecentChat_Full) {
    if (!data) {
      data = this.currentRecentChat;
    }
    if (!this.currentRecentChat) {
      return;
    }
    let theIndex = this.recentChatListStorage.findIndex(item => {
      return item.ChatUser.toLowerCase() == data.ChatUser.toLowerCase();
    });
    if (this.recentChatListStorage.length > 1 && theIndex != 0) {
      let deleteItems = this.recentChatListStorage.splice(theIndex, 1);
      this.recentChatListStorage.unshift(deleteItems[0]);
    }
  }

  //发送文本消息
 sendTextMsg() {
    if (!this.msgContent) {
      return;
    }
    if (this.msgContent.length > 1000) {
      this.applicationService.main.openErrorMessage("发送的内容不能超过1000个字符");
      return;
    }
    this.sendPrivateText(this.msgContent, 0);
  }

  //发送图片消息
  private sendPictureMsg = function (picUrl) {
    this.sendPrivateText(picUrl, 1);
  }
  //选择emoji
  private selectEmoji(key) {
    this.msgContent = this.msgContent || "";
    this.msgContent += key;
    this.im.switch.isShowEmojis = 0;
  }

  private showEmojis(flag) {
    this.im.switch.isShowEmojis = (this.im.switch.isShowEmojis + 1) % 2;
    this.im.switch.isShowEmojisHover = this.im.switch.isShowEmojis;
    if (!this.im.switch.isShowEmojis) {
      this.im.switch.isEnableEmojis = 0;
    }
    setTimeout(() => {
      this.im.switch.isEnableEmojis = 1;
    }, 1000);
  }

  //鼠标放上去/离开
  private hoverShowEmojis(status, isUl) {
    if (this.im.switch.isShowEmojis) {
      return;
    }
    this.im.isUl = isUl;
    if (status == 0) {
      setTimeout(() => {
        if (this.im.isUl) {
          status = 1;
        }
        this.im.switch.isShowEmojisHover = status;
      }, 100);
    }
    else {
      this.im.switch.isShowEmojisHover = status;
    }
    return;
  }

  //转换emoji字符串
  private parseEmojiToString(data) {
    return WebIM.utils.parseEmoji(data);
  }

  //点击朋友头像
  private showFriendDetail(chatUser) {
    this.currentFriend = this.GetFriendByUserName(chatUser);
    this.im.switch.tabChildIndex = "2" + (1 + 0);
  }

  /**
   * 获取当前用户的上下文
   * @returns {MessageRequestResponse.ImInfoContext}
   */
  private get currentUser() {
    return this.userService.getImContext();
  }

  /**
   * 当前员工信息
   * @returns {UserRequestResponse.WorkerInfoModel}
   */
  private get currentworker() {
    return this.userService.getCurrentWorkeInfo();
  }

  /**
   * 判断是否非火狐
   * @returns {boolean}
   */
  private isChrome = function () {
    return !(navigator.userAgent.indexOf("Firefox") > 0);
  }
  //判断是否是今天
  private isToday = function (str) {
    str = str.toString();
    if (!str) {
      return true;
    }
    let d = new Date(str);
    if (str.indexOf("GMT") > -1) {
      d = new Date(str);
    } else {
      d = new Date(d.valueOf() - 8 * 60 * 60 * 1000);
    }
    let sdd = new Date().toLocaleString();
    let nss = new Date().toString();
    if (d.toDateString() == new Date().toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 判断两个时间的差值
   * @param startTime
   * @param endTime
   * @param diffType
   * @returns {number}
   */
  private getDateDiff(startTime, endTime, diffType) {
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    let sTime = new Date(startTime); //开始时间
    let eTime = new Date(endTime); //结束时间
    //作为除数的数字
    let divNum = 1;
    switch (diffType) {
      case "second":
        divNum = 1000;
        break;
      case "minute":
        divNum = 1000 * 60;
        break;
      case "hour":
        divNum = 1000 * 3600;
        break;
      case "day":
        divNum = 1000 * 3600 * 24;
        break;
      default:
        break;
    }
    return ( eTime.getTime() - sTime.getTime()) / (divNum);
  }

  private scrollToBottom = function () {
    // $(".reply_er_two").each(function () {
    //   $(this).scrollTop($(this)[0].scrollHeight);
    // });
  }
  private scrollToLoaction = function () {
    setTimeout(() => {
      if (this.im.isLoadingMore) {

      } else {
        this.scrollToBottom();
      }
    }, 500);
  }

  /**
   * 弹窗日程提醒
   * @param message
   */
  private alertScheduleMessage(message) {
    console.log(JSON.stringify(message));
  }

}
