/**
 * 封装的目的：
 * 1. 将多余的状态判断逻辑隐藏在该文件中，这样外部就无需进行业务逻辑之外的判断等
 * 2. 过滤获取来的数据将用于初始化获取 用户 id 以及关于自己的数据
 * 3. 代理数据，数据状态以类实例模式存储在 redux 中
 * 4. 封闭部分与业务无关流程，例如初始化获取用户 id 这些与业务无关流程应该与业务代码解耦
 */

import { MessageProp, MessageType, WSOptionsProp } from "./type"

class WS {

  private _websocket: WebSocket | undefined
  private _username: string | undefined
  private _userid: string | undefined

  private _incomingOnmessage: undefined | ((data: MessageProp) => void);
  private _incomingOnopen: undefined | (() => void);
  private _incomingOnerror: undefined | ((e: Error) => void);

  private _connectSuccess: undefined | (() => void);
  private _connectFail: undefined | ((str: string) => void)


  constructor(url: string, name: string, connectSuccess: (() => void), connectFail?: ((str: string) => void),) {
    // init websocket
    this._websocket = new WebSocket(url)
    // attention 'this' pointer 
    this._websocket.onopen = this._onopen.bind(this)
    this._websocket.onmessage = this._onmessage.bind(this)
    //
    this._connectSuccess = connectSuccess
    this._connectFail = connectFail
    //
    this._username = name

  }

  public configOptions(options: WSOptionsProp) {
    // config custom functions 
    this._incomingOnopen = options.onopen
    this._incomingOnmessage = options.onmessage
    this._incomingOnerror = options.onerror
  }

  // init userinfo send username to server and return userid
  private _initUser() {
    const initData: MessageProp = {
      username: this._username,
      type: MessageType.INIT
    }
    this._send(initData)
  }


  private _onopen() {
    this._incomingOnopen && this._incomingOnopen()
    this._initUser()
  }

  private _onmessage(evt: MessageEvent<WebSocket>) {
    const data = JSON.parse(evt.data as unknown as string) as MessageProp;

    this._hanleInit(data)

    // show all message from server about oneself or others
    this._incomingOnmessage && this._incomingOnmessage(data)
  }

  // init get userid from server
  private _hanleInit(data: MessageProp) {
    if (data.type === MessageType.INIT) {
      if (data.message === 'success') {
        this._userid = data.id
        this._connectSuccess && this._connectSuccess()
        return
      } else {
        // some error
        this._connectFail && this._connectFail(data.message || 'error')
      }
    }
  }

  // send message to server 
  private _send(data: MessageProp) {
    console.log(data)
    this._websocket?.send(Buffer.from(JSON.stringify(data)))
  }

  // universal send fucntion for outer
  public send(msg: string) {
    const tempData: MessageProp = {
      username: this._username,
      id: this._userid,
      type: MessageType.USER,
      message: msg
    }
    this._send(tempData)
  }

  public setUsername(username: string) { this._username = username }

  public getUserid() {
    return this._userid
  }

}


export default WS
