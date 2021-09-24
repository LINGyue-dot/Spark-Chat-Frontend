/**
 * 封装的目的：
 * 1. 将多余的状态判断逻辑隐藏在该文件中，这样外部就无需进行业务逻辑之外的判断等
 */
class Ws {

  private _ws: WebSocket | undefined

  public onopen: (() => {}) | undefined
  public onmessage: ((event: WebSocketEventMap) => {}) | undefined
  public onclose: ((event: WebSocketEventMap) => {}) | undefined
  public onerror: (() => {}) | undefined

  constructor(url: string) {
    this._ws = new WebSocket(url)
    this._initEvent()
  }

  // 初始化挂载自定义事件
  private _initEvent() {
    this._initOnopen()
    this._initOnmessage()
    this._initOnerror()
    this._initOnclose()
  }

  private _initOnopen() {

  }

  private _initOnmessage() {

  }
  private _initOnclose() {

    this._ws?.close()
  }

  private _initOnerror() {

  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this._ws?.readyState === this._ws?.OPEN) {
      this._ws?.send(data)
    }
  }



}

export default Ws