import React from 'react';
import { LoaderBackdrop } from './Loader.styled';
import DotLoader from 'react-spinners/DotLoader';

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <DotLoader
        color="#32d2dd"
        size={150}
        cssOverride={{ position: 'absolute', top: '25%', left: '45%' }}
      />
    </LoaderBackdrop>
  );
};
