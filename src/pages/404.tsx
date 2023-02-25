import styled from 'styled-components';

export default function Custom404() {
  return (
    <Container>
      <Title>존재하지 않는 페이지입니다.</Title>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
`;

const Title = styled.h1`
`;