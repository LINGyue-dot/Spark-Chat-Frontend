export enum MessageType {
  // 初始化
  INIT = 'INIT',
  // 关闭
  CLOSE = 'CLOSE',
  // 新用户加入或者其他通知
  SYSTEM = 'SYSTEM',
  // 其他用户的消息
  USER = 'USER'
}

export interface UserProp {
  id?: string | number;
  username?: string;
}

export interface MessageProp extends UserProp {
  type: MessageType,
  message?: string | null;
}

