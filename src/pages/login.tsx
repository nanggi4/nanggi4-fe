import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import {checkLoginInput} from '../utilities/index';
import { userState, IUserDataTypes } from '../atom';

const LoginPage: NextPage = () => {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idValid, setIdValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const router = useRouter();
  const [userData, setUserData] = useRecoilState<IUserDataTypes>(userState);

  const handleLogin = async () => {
    const data = await axios.post('https://api.sixshop.com/login');
    if(data.status === 200) {
      setUserData(data.data.data);
      router.push('/');
    }
  }

  return (
    <>
      <Form>
        <FormGroup>
          <FormTitle>아이디</FormTitle>
          <TextInput 
            onChange={(e) => setId(e.target.value)}
            onBlur={() => setIdValid(checkLoginInput(id, "id"))}
            type='text'
            valid={idValid}
          />
          {!idValid&&<ErrorText>올바른 아아디 형식으로 입력해주세요.</ErrorText>}
        </FormGroup>
        <FormGroup>
          <FormTitle>비밀번호</FormTitle>
          <TextInput 
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordValid(checkLoginInput(password, "password"))}        
            type='password'
            valid={passwordValid}
          />
          {!passwordValid&&<ErrorText>올바른 비밀번호 형식으로 입력해주세요.</ErrorText>}
        </FormGroup>
        <LoginButton 
          onClick={() => handleLogin()}
          disabled={(!idValid||!passwordValid)}
        >
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const ErrorText = styled.p`
  margin-top: 8px;
  padding: 0;
  font-weight: 400;
  font-size: 13px;
  color: #ED4E5C;
`;

const FormTitle = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 13px;
  color: #6C6C7D; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const FormGroup = styled.article`
  display: flex;
  flex-direction: column;
  &:nth-child(2){
    margin-top: 16px;
  }   
`;

const TextInput = styled.input<{ valid: boolean }>`
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  background: ${(props) => (props.valid ? '#F7F7FA' : '#FDEDEE')};
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
