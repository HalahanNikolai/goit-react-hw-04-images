import React, { Component } from 'react';
import {
  GalleryItem,
  GalleryImage
} from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      image: {
        webformatURL,
        largeImageURL,
        tags
      },
    } = this.props; 
    return (
      <GalleryItem>
        <GalleryImage
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={this.toggleModal}
        />

        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          ></Modal>
        )}
      </GalleryItem>
    );
  }
}
