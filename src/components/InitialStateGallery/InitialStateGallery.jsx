import React from 'react';
import { Text, Wrapper } from './InitialStateGallery.styled';

export const InitialStateGallery = ({ text }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
};
