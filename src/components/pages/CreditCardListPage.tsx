import styled from 'styled-components';
import { usePayments } from '../../hooks/usePayments';
import { CreditCardView } from '../CreditCardView';
import { NewCreditCardButton } from '../NewCreditCardButton';
import { Page } from '../common/Page';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 46px;
  align-items: center;
  flex: 1;
`;

export const CreditCardListPage = () => {
  const { creditCards } = usePayments();

  return (
    <Page>
      <Page.Header>보유카드</Page.Header>
      <Content>
        {creditCards.map((creditCard) => (
          <CreditCardView
            key={creditCard.cardNumbers}
            name={creditCard.name}
            cardNumbers={creditCard.cardNumbers}
            expirationDate={creditCard.expirationDate}
          />
        ))}

        <NewCreditCardButton helperText={creditCards.length === 0} />
      </Content>
    </Page>
  );
};
