import React, { ChangeEvent, useState } from 'react';

import { Button, Input } from 'antd';
import { MessageProp, MessageType } from './type';
import styled from 'styled-components';

// 发送
const send = (ws?: WebSocket, data?: MessageProp) => {
  if (!ws || !data) {
    return;
  }
  ws.send(Buffer.from(JSON.stringify(data)));
};

const Demo = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>();

  // !!! 封装成 hook
  const [noticeArr, setNoticeArr] = useState<MessageProp[]>([]);

  // 添加 notice 为什么不行
  const addNotice = (data: MessageProp) => {
    console.log('23--------');
    console.log(noticeArr);
    const beforeMessage = JSON.parse(JSON.stringify(noticeArr));
    beforeMessage.push(data);
    console.log('beforeMessage: ', beforeMessage);
    setNoticeArr(beforeMessage);
  };

  const initWebSocket = () => {
    if (webSocket) {
      return;
    }
    const temp = new WebSocket('ws://localhost:7000');
    setWebSocket(temp);
    temp.onopen = function () {
      addNotice({
        type: MessageType.INIT,
        message: 'WebSocket init successfully',
      });
      // // 消息 arr
      // setNoticeArr((old) => [
      //   ...old,
      //   {
      //     type: MessageType.INIT,
      //     message: 'WebSocket init successfully',
      //   },
      // ]);
    };
    temp.onmessage = function (evt: MessageEvent<WebSocket>) {
      console.log('----------');
      console.log(noticeArr);
      // addNotice(JSON.parse(evt.data as unknown as string));
      // setNoticeArr((old) => [
      //   ...old,
      //   JSON.parse(evt.data as unknown as string),
      // ]);
    };
  };

  const hanleConnect = () => {
    initWebSocket();
  };

  const hanleSend = () => {
    const tempData: MessageProp = {
      id: 1,
      type: MessageType.USER,
      message: value,
    };
    send(webSocket, tempData);
  };

  const [value, setValue] = useState<string | null>(null);
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <ConnectDiv>
        <Button type="primary" onClick={hanleConnect}>
          链接
        </Button>
        <Input onChange={inputChange} />
        <Button type="primary" onClick={hanleSend}>
          发送
        </Button>
      </ConnectDiv>

      <Button
        onClick={() => {
          console.log(noticeArr);
        }}
      >
        show
      </Button>
      <NoticeDiv>
        {noticeArr.map((item, i) => (
          <p key={i}>{item.type + ' : ' + item.message}</p>
        ))}
      </NoticeDiv>
    </>
  );
};

const ConnectDiv = styled.div`
  width: 300px;
  height: 300px;
`;

const NoticeDiv = styled.div`
  height: 300px;
  width: 500px;
  flex: 1;
  margin: 20px;
`;

export default Demo;
