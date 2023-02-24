import { useRouter } from 'next/router'
import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IUserDataTypes, userState } from '../atom';

const HomePage: NextPage = () => {

  const router = useRouter();
  const [userData, setUserData] = useRecoilState<IUserDataTypes>(userState);

  const handleLogout = () => {
    if(userData.user.id) {
      setUserData({accessToken: '',
      user: {
        id: '',
        name: ''
      }})
      router.push('/');
    }
  }

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {userData.user.id ? (
          <nav>
            <UserName>{userData.user.name}</UserName>
            <Logout
              onClick={() => handleLogout()}
            >
              logout
            </Logout>
          </nav>
        ) : (
          <Link href='/login'>
            <p>login</p>
          </Link>
        )}
      </Header>
    </>
  );
};

export default HomePage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const UserName = styled.p`
`;

const Logout = styled.a`
`;