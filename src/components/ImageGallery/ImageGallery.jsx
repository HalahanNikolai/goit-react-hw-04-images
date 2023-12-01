import React from 'react';
import { useState, useEffect } from 'react';

import imagesAPI from 'services/getImages';

import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import ImageErrorView from 'components/errorMessage/errorMessage';
import { InitialStateGallery } from '../InitialStateGallery/InitialStateGallery';
import { Button } from 'components/Button/Button';
import { errorMessages } from 'utils/errorMessages';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ImageGallery = ({ value, page, onLoadMore }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (page === 1) {
      setImages([]);
    }

    setStatus(Status.PENDING);

    imagesAPI
      .getImages(value, page)
      .then(images => {
        setImages(prevState => [...prevState, ...images.hits]);
        setTotalPages(Math.floor(images.totalHits / 12));
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [value, page, onLoadMore]);

  if (status === Status.IDLE) {
    return <InitialStateGallery text="Welcome to the searchable image gallery!" />;
  }
  if (status === Status.PENDING) {
    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </List>
        <Loader />;
      </>
    );
  }
  if (status === Status.REJECTED) {
    return <ImageErrorView message={error.message} />;
  }
  if (images.length === 0) {
    return <ImageErrorView message={errorMessages.imagesAPI} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </List>
        {images.length > 0 &&
          status !== Status.PENDING &&
          page <= totalPages && <Button onClick={onLoadMore}>Load More</Button>}
      </>
    );
  }
};

