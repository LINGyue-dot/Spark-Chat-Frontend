import React, { ChangeEvent, useState } from 'react';

import { Button, Input } from 'antd';
import { useInit } from '../../utils';

const Demo = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>();
  const initWebSocket = () => {
    const temp = new WebSocket('ws://localhost:7000');
    setWebSocket(temp);
    temp.onopen = function () {
      console.log('websocket open ');
    };
    temp.onmessage = function (evt: MessageEvent<WebSocket>) {
      console.log(evt);
    };
  };

  const hanleConnect = () => {
    initWebSocket();
  };

  const hanleSend = () => {
    webSocket?.send(value || 'temp');
  };

  const [value, setValue] = useState<string | null>(null);
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Button type="primary" onClick={hanleConnect}>
        链接
      </Button>
      <Input onChange={inputChange} />
      <Button type="primary" onClick={hanleSend}>
        发送
      </Button>
    </div>
  );
};

export default Demo;
