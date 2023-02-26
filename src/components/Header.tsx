import { useRouter } from 'next/router'
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { User } from '../types/user';

import { useRecoilState } from 'recoil';
import { userState } from '../atom';

const HomePage: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useState(false);
 
  useEffect(() => {
    if(hasCookie('user')) {
      const userData: User = JSON.parse(getCookie('user'));
      setUserData(userData);
    }
  }, []);

  const handleLogout = (): void => {
    deleteCookie('user', { path: '/' });
    setUser({
      name: '',
      id: ''
    });
    router.replace('/');
  }
  
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {hasCookie('user') ? (
          <UserData>
            <UserName>{userData.name}</UserName>
            <Logout
              onClick={() => handleLogout()}
            >
              logout
            </Logout>
          </UserData>
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

const UserData = styled.nav`
`;