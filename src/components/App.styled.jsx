import styled from 'styled-components';
import ScrollToTop from 'react-scroll-up';

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
export const BtnScrollToTop = styled(ScrollToTop)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  padding: 8px;
  background-color: rgba(22, 172, 177, 0.5);
  border-radius: 8px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
`;
