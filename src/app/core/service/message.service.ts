import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import * as MessageRequestResponse from "../messages/message-request-response";
import {Observable} from "rxjs";
import {ApiMethod} from "../api-method";
import {UserService} from "./user.service";
import {ApplicationService} from "./application.service";
import {GlobalState} from "../../global.state";
import {GlobalStateEvent} from "../../core/enums/global-state-event.enum";

/**
 * 声明环信全局变量
 */
declare var WebIM:any;

@Injectable()
export class MessageService {
  /**
   * 处理接收到消息方回调
   */
  processMessageHandler:(t:any)=>void;

  constructor(private http: HttpService, private userService: UserService,
              private applicationService: ApplicationService,
              private globalState:GlobalState) { //这一块需要改，不能直接把userservice注入
  }

  /**
   *获得用户环信token
   * @returns {Observable<T>}
   */
  getUserToken(): Observable<MessageRequestResponse.GetUserTokenResponse> {
    return this.http.get(ApiMethod.message_GetUserToken);
  }

  /**
   *备份消息
   * @param request
   * @returns {Observable<T>}
   */
  storageMessage(request: MessageRequestResponse.StorageMessageRequest): Observable<MessageRequestResponse.StorageMessageResponse> {
    return this.http.post(ApiMethod.message_StorageMessage, request);
  }

  /**
   *删除消息
   * @param request
   * @returns {Observable<T>}
   */
  deleteChat(chatUser:string,messageKind:number): Observable<any> {
    let request=new MessageRequestResponse.DeleteChatRequest();
    request.ChatUserCode=chatUser;
    request.MessageKind=messageKind;
    return this.http.post(ApiMethod.message_DeleteChat, request);
  }

  /**
   *接受者消息删除
   * @param request
   * @returns {Observable<T>}
   */
  deleteToMessage(msgId:string): Observable<any> {
    let request=new MessageRequestResponse.DeleteToMessageRequest();
    request.MsgId=msgId;
    return this.http.post(ApiMethod.message_DeleteToMessage, request);
  }

  /**
   *最近消息列表
   * @returns {Observable<T>}
   */
  getRecentChat(): Observable<MessageRequestResponse.RecentChat_Full[]> {
    return this.http.get(ApiMethod.message_GetRecentChat);
  }

  /**
   *聊天记录
   * @param request
   * @returns {Observable<T>}
   */
  getHistoryMessages(request: MessageRequestResponse.GetHistoryMessagesRequest): Observable<MessageRequestResponse.GetHistoryMessagesResponse> {
    return this.http.get(ApiMethod.message_GetHistoryMessages, request);
  }

  /**
   * 设置已读
   * @param request
   * @returns {Observable<T>}
   */
  setRead(chatUser:string,messageKind:number): Observable<any> {
    let request=new MessageRequestResponse.SetReadRequest();
    request.MessageKind=messageKind;
    request.ChatUserCode=chatUser;
    return this.http.post(ApiMethod.message_SetRead, request);
  }

  /**
   * 初始化webIm
   */
  initWebIm() {
    this.applicationService.imConn = new WebIM.connection({
      isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
      url: WebIM.config.xmppURL,
      isAutoLogin: true,
      heartBeatWait: WebIM.config.heartBeatWait,
      autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      autoReconnectInterval: WebIM.config.autoReconnectInterval
    });

    let options: any = {
      apiUrl: WebIM.config.apiURL,
      appKey: WebIM.config.appkey
    };

    let imContext = this.userService.getImContext();
    if (!imContext) {
      this.getUserToken().subscribe(t => {
          imContext = new MessageRequestResponse.ImInfoContext();
          imContext.WorkerCode = this.userService.getCurrentWorkeInfo().WorkerCode;
          imContext.IMToken = t.IMToken;
          imContext.OutRoomId = t.OutRoomId;
          this.userService.setImContext(imContext);
          options.user = 'd_' + imContext.WorkerCode.replace(/\s+/g, "");
          options.accessToken = imContext.IMToken;
          this.applicationService.imConn.open(options);
        },
        error => {
          console.log(error.errorMessage);
        });
    }
    else {
      options.user = 'd_' + imContext.WorkerCode.replace(/\s+/g, "");
      options.accessToken = imContext.IMToken;
      this.applicationService.imConn.open(options);
    }
    //加载相关emoji图片
    this.loadImEmoji();

    //设置监听函数
    this.setLisen();
  }

  /**
   * 加载相关emoji图片
   */
  private loadImEmoji(){
    WebIM.Emoji = {
      path: '/assets/script/webim/images/faces/'  /*表情包路径*/
      , map: {
        '[):]': 'ee_1.png',
        '[:D]': 'ee_2.png',
        '[;)]': 'ee_3.png',
        '[:-o]': 'ee_4.png',
        '[:p]': 'ee_5.png',
        '[(H)]': 'ee_6.png',
        '[:@]': 'ee_7.png',
        '[:s]': 'ee_8.png',
        '[:$]': 'ee_9.png',
        '[:(]': 'ee_10.png',
        '[:\'(]': 'ee_11.png',
        '[:|]': 'ee_12.png',
        '[(a)]': 'ee_13.png',
        '[8o|]': 'ee_14.png',
        '[8-|]': 'ee_15.png',
        '[+o(]': 'ee_16.png',
        '[<o)]': 'ee_17.png',
        '[|-)]': 'ee_18.png',
        '[*-)]': 'ee_19.png',
        '[:-#]': 'ee_20.png',
        '[:-*]': 'ee_21.png',
        '[^o)]': 'ee_22.png',
        '[8-)]': 'ee_23.png',
        '[(|)]': 'ee_24.png',
        '[(u)]': 'ee_25.png',
        '[(S)]': 'ee_26.png',
        '[(*)]': 'ee_27.png',
        '[(#)]': 'ee_28.png',
        '[(R)]': 'ee_29.png',
        '[({)]': 'ee_30.png',
        '[(})]': 'ee_31.png',
        '[(k)]': 'ee_32.png',
        '[(F)]': 'ee_33.png',
        '[(W)]': 'ee_34.png',
        '[(D)]': 'ee_35.png'
      }
    };
  }
  /**
   * 设置监听函数
   */
  private setLisen(){
    let conn=this.applicationService.imConn;
    let self=this;
    // listern，添加回调函数
    conn.listen({
      onOpened: function (message) {          //连接成功回调，连接成功后才可以发送消息
        //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
        // 所以无需调用conn.setPresence();
        console.log("opened");
        let imContext =self.userService.getImContext() ;
        var outRoomId = imContext.OutRoomId;
        // 加入聊天室
        setTimeout(function () {
          conn.joinChatRoom({
            roomId: outRoomId// 聊天室id
          });
        }, 2000)
      },
      onTextMessage: function (message) {
        // 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
        console.log(message.type);

        self.preProcessMessage();

        if (self.processMessageHandler){
          self.processMessageHandler(message);
        }
      },  //收到文本消息
      onEmojiMessage: function (message) {
        // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
        // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
        // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
        var reMsgData = "";
        var data = message.data;
        for (var i = 0, l = data.length; i < l; i++) {
          reMsgData += (data[i].type === 'emoji' ? '<img src="' + data[i].data + '" />' : data[i].data);
        }
        message.data = reMsgData;

        self.preProcessMessage();

        if (self.processMessageHandler){
          self.processMessageHandler(message);
        }
      },   //收到表情消息
      onPictureMessage: function (message) {
        console.log('Picture');

        let options:any = { url: message.url };
        options.onFileDownloadComplete = function () {
          // 图片下载成功
          console.log('Image download complete!');
        };
        options.onFileDownloadError = function () {
          // 图片下载失败
          console.log('Image download failed!');
        };
        WebIM.utils.download.call(conn, options);       // 意义待查

      }, //收到图片消息
      onCmdMessage: function (message) {
        console.log('CMD');
      },     //收到命令消息
      onAudioMessage: function (message) {
        console.log("Audio");
      },   //收到音频消息
      onLocationMessage: function (message) {
        console.log("Location");
      },//收到位置消息
      onFileMessage: function (message) {
        console.log("File");
      },    //收到文件消息
      onVideoMessage: function (message) {
        let node:any = document.getElementById('privateVideo');
        let option = {
          url: message.url,
          headers: {
            'Accept': 'audio/mp4'
          },
          onFileDownloadComplete: function (response) {
            var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
            node.src = objectURL;
          },
          onFileDownloadError: function () {
            console.log('File down load error.')
          }
        };
        WebIM.utils.download.call(conn, option);
      },   //收到视频消息
      onPresence: function (message) {
        switch (message.type) {
          case 'subscribe':                           // 对方请求添加好友
            // 同意对方添加好友
            document.getElementById('agreeFriends').onclick = function (message:any) {
              conn.subscribed({
                to: 'asdfghj',
                message: "[resp:true]"
              });
              // 需要反向添加对方好友
              conn.subscribe({
                to: message.from,
                message: "[resp:true]"
              });
            };
            // 拒绝对方添加好友
            document.getElementById('rejectFriends').onclick = function (message:any) {
              conn.unsubscribed({
                to: message.from,
                message: "rejectAddFriend"                  // 拒绝添加好友回复信息
              });
            };

            break;
          case 'subscribed':                          // 对方同意添加好友，已方同意添加好友
            break;
          case 'unsubscribe':                         // 对方删除好友
            break;
          case 'unsubscribed':                        // 被拒绝添加好友，或被对方删除好友成功
            break;
          case 'joinChatRoomSuccess':                 // 成功加入聊天室
            console.log('join chat room success');
            break;
          case 'joinChatRoomFaild':                   // 加入聊天室失败
            console.log('join chat room faild');
            break;
          case 'joinPublicGroupSuccess':              // 意义待查
            console.log('join public group success', message.from);
            break;
        }
      },       //收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
      onRoster: function (message) {
        console.log('Roster');
      },         //处理好友申请
      onInviteMessage: function (message) {
        console.log('Invite');
      },  //处理群组邀请
      onOnline: function () {
        console.log('onLine');
      },                  //本机网络连接成功
      onOffline: function () {
        console.log('offline');
      },                 //本机网络掉线
      onError: function (message) {
        console.log(JSON.stringify(message));
        console.log('Error');
      },           //失败回调
      onBlacklistUpdate: function (list) {
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
      }     // 黑名单变动
    });
  }

  /**
   * 预处理消息到达
   */
  private preProcessMessage(){
    this.globalState.notifyDataChanged(GlobalStateEvent.imleftEvent,true)
  }

}
