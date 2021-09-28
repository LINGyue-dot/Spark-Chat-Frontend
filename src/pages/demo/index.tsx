import React, { ChangeEvent, useEffect, useState } from 'react';

import { Button, Input } from 'antd';
import styled from 'styled-components';
import { MessageProp, MessageType } from '../../utils/websocket/type';
import { selectWebsocket } from '../../store/ws/wsSlice';
import { useAppSelector } from '../../store/hook';

const Demo = () => {
  // !!! 封装成 hook
  const [noticeArr, setNoticeArr] = useState<MessageProp[]>([]);

  const ws = useAppSelector(selectWebsocket);

  // onmessage
  // !!! todo show different message depend on message.type and message.userid
  const onmessage = (data: MessageProp) => {
    if (data.type === MessageType.SYSTEM && data.id === ws?.getUserid()) {
      return;
    }
    setNoticeArr((old) => [...old, data]);
  };

  const configWS = () => {
    ws?.configOptions({ onmessage: onmessage });
  };

  useEffect(() => {
    configWS();
  }, []);

  const [value, setValue] = useState<string | null>(null);
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // send message
  const hanleSend = () => {
    ws?.send(value || '');
  };

  return (
    <>
      <ConnectDiv>
        <Input onChange={inputChange} />
        <Button type="primary" onClick={hanleSend}>
          发送
        </Button>
      </ConnectDiv>

      <NoticeDiv>
        {noticeArr.map((item, i) => (
          <p key={i}>
            {item.type + ' : ' + item.username + ':' + item.message}
          </p>
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
