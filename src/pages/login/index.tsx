import { Button, Input, message } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/hook';
import { initWebsocket } from '../../store/ws/wsSlice';
import WS from '../../utils/websocket';

const Login = () => {
  const [name, setName] = useState('');
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const dispatch = useAppDispatch();
  const initWs = () => {
    if (!name.trim()) {
      return;
    }
    const temp = new WS(
      'ws://localhost:7000',
      name,
      connectSuccess,
      connectFail
    );
    dispatch(initWebsocket(temp));
  };

  const history = useHistory();
  const connectSuccess = () => {
    history.push('/demo');
    message.success('登录成功');
  };

  const connectFail = (str: string) => {
    message.error(str);
    dispatch(initWebsocket(undefined));
  };

  return (
    <FormDiv>
      <Input onChange={inputChange} />
      <Button type="primary" onClick={initWs}>
        登录
      </Button>
    </FormDiv>
  );
};

const FormDiv = styled.div`
  height: 200px;
  width: 200px;
  backgroundcolor: pink;
`;

export default Login;
