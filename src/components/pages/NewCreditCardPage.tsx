import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PaymentsContext } from '../../context/PaymentsContext';
import type { CreditCard } from '../../types/CreditCard';
import { CardNumberInput } from '../CardNumberInput';
import { CardPasswordInput } from '../CardPasswordInput';
import { CreditCardView } from '../CreditCardView';
import { ExpirationDateInput } from '../ExpirationDateInput';
import { BackButton } from '../common/BackButton';
import { Input } from '../common/Input';
import { Page } from '../common/Page';
import { Text } from '../common/Text';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  padding: 28px;
`;

const FormGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

  margin: 10px 0px;
`;

const FormGroupLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NextButton = styled.button`
  align-self: flex-end;
  margin-top: auto;
`;

export const NewCreditCardPage = () => {
  const [newCard, setNewCard] = useState<CreditCard>({
    cardNumbers: '',
    expirationDate: ['', ''],
    name: '',
    cvc: '',
    password: '',
  });

  const setNewCardField = <Field extends keyof CreditCard>(
    field: Field,
    value: CreditCard[Field],
  ) => {
    setNewCard({ ...newCard, [field]: value });
  };

  const { creditCards, setCreditCards } = useContext(PaymentsContext);

  const navigate = useNavigate();

  const handleCardNumbersChange = (value: string) => {
    setNewCardField('cardNumbers', value);
  };

  const handleExpirationDateChange = (value: [string, string]) => {
    setNewCardField('expirationDate', value);
  };

  const handleCardNameChange = (value: string) => {
    if (value.length > 30) return;

    setNewCardField('name', value);
  };

  const handleCVCNumberChange = (value: string) => {
    if (!/^\d{0,3}$/.test(value)) return;

    setNewCardField('cvc', value);
  };

  const handleCardPasswordChange = (value: string) => {
    setNewCardField('password', value);
  };

  const handleClickNextButton = () => {
    setCreditCards([...creditCards, newCard]);
    navigate('/');
  };

  return (
    <Page>
      <Page.Header leading={<BackButton />}>카드추가</Page.Header>
      <Content>
        <CreditCardView
          name={newCard.name}
          cardNumbers={newCard.cardNumbers}
          expirationDate={newCard.expirationDate}
        />

        <FormGroup>
          <Text size="small">카드 번호</Text>
          <CardNumberInput value={newCard.cardNumbers} onChange={handleCardNumbersChange} />
        </FormGroup>

        <FormGroup>
          <Text size="small">만료일</Text>
          <ExpirationDateInput
            value={newCard.expirationDate}
            onChange={handleExpirationDateChange}
          />
        </FormGroup>

        <FormGroup>
          <FormGroupLabel>
            <Text size="small">카드 소유자 이름(선택)</Text>
            <Text size="small">{newCard.name.length} / 30</Text>
          </FormGroupLabel>
          <Input
            value={newCard.name}
            onChange={handleCardNameChange}
            placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          />
        </FormGroup>

        <FormGroup>
          <Text size="small">보안 코드</Text>
          <Input
            value={newCard.cvc}
            onChange={handleCVCNumberChange}
            width={8}
            center
            type="password"
          />
        </FormGroup>

        <FormGroup>
          <Text size="small">카드 비밀번호</Text>
          <CardPasswordInput value={newCard.password} onChange={handleCardPasswordChange} />
        </FormGroup>

        <NextButton onClick={handleClickNextButton}>
          <Text weight="bold">다음</Text>
        </NextButton>
      </Content>
    </Page>
  );
};
