import { Outlet } from 'react-router';
import styled from 'styled-components';
import { PaymentsProvider } from '../context/PaymentsContext';
import { ResetStyle } from '../styles/ResetStyle';

const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 100px;
  height: 100vh;
`;

export const App = () => {
  return (
    <PaymentsProvider>
      <Container>
        <ResetStyle />

        <Outlet />
      </Container>
    </PaymentsProvider>
  );
};
