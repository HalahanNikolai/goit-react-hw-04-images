import { Text, Wrapper } from './errorMessage.styled';

export default function ImageErrorView({ message }) {
  return (
    <Wrapper role="alert">
      <Text>{message}</Text>
    </Wrapper>
  );
}
