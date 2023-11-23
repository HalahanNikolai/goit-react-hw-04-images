import React, { Component } from 'react';
import { ModalOverlay, ModalWrap } from './Modal.styled';


export default class Modal extends Component {
  componentDidMount() {
    document.documentElement.style.overflowY = 'hidden';
    document.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    document.documentElement.style.overflowY = 'auto';
    document.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = event => {
    if (event.key === 'Escape' || event.key === ' ') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props; 
    return (
      <ModalOverlay onClick={this.handleOverlayClick}>
        <ModalWrap>
          <img src={largeImageURL} alt={tags} />
        </ModalWrap>
      </ModalOverlay>
  
    );
  }
}
