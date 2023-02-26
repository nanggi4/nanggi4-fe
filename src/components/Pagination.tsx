import React from 'react';
import styled from 'styled-components';
import type { NextPage } from 'next';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { PageType, PaginationType } from '../types/page';

const Pagination: NextPage<PaginationType> = ({
  page,
  currentPage,
  displayPage,
  changePage,
  next,
  prev 
}) => {
  return (
    <Container>
      <Button onClick={() => prev(currentPage)} disabled={currentPage < 6}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {displayPage.map(page => (
          <Page onClick={() => changePage(page)} key={page} selected={page === currentPage} disabled={page === currentPage}>
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={() => next(currentPage)} disabled={currentPage > 105}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.nav`
  display: flex;
  margin: 0 16px;
`;

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
