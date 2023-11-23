import styled from 'styled-components';

export const GalleryItem = styled.li`
  position: relative;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;

  height: 450px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover img {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    transform: scale(1.05);
  }
  &:hover {
    cursor: pointer;
    box-shadow: rgba(255, 255, 255, 0.152) 0px 10px 50px;
  }
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
`;
