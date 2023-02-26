import { useRouter } from 'next/router'
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getCookie, deleteCookie } from 'cookies-next';
import { User } from '../types/user';

const HomePage: NextPage = () => {
  const router = useRouter(); 
  const user: User = getCookie('user') !== undefined ? JSON.parse(getCookie('user')) : '';

  const handleLogout = () => {
    deleteCookie('user');
    deleteCookie('token');
    router.replace('/');
  }
  
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {user ? (
          <nav>
            <UserName>{user.name}</UserName>
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