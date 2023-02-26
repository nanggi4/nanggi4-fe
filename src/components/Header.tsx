import { useRouter } from 'next/router'
import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { getCookie, deleteCookie } from 'cookies-next';
import { User } from '../types/user';

const HomePage: NextPage = () => {
  const router = useRouter();
  const user: User = getCookie('user') !== undefined ? JSON.parse(getCookie('user')) : '';
  
  const handleLogout = () => {
    deleteCookie('user', { path: '/' });
    router.replace('/');
  }
  
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {user ? (
          <div>
            <UserName>{user.name}</UserName>
            <Logout
              onClick={() => handleLogout()}
            >
              logout
            </Logout>
          </div>
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