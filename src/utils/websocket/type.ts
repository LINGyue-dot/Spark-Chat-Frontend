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
  id?: string;
  username?: string;
}

export interface MessageProp extends UserProp {
  type: MessageType,
  message?: string | null;
}



export interface WSOptionsProp {
  onopen?: () => void;
  onmessage: (data: MessageProp) => void;
  onerror?: (e: Error) => void;
}