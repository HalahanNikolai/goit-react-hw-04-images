import Notiflix from 'notiflix';
import { InfinitySpin } from 'react-loader-spinner';
import React, { Component } from 'react';
import * as PixabayAPI from '../../services/pixabay-api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import GalleryInfo from 'components/GalleryInfo/GalleryInfo';
import Button from 'components/Button/Button';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: this.props.searchQuery,
      currentPage: 1,
      totalPages: 0,
      images: [],
      status: Status.IDLE,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState(
        {
          searchQuery: this.props.searchQuery,
          currentPage: 1,
        },
        () => {
          this.updateImages();
        }
      );
    } else if (prevState.currentPage !== this.state.currentPage) {
      this.loadMore();
    }
  }


  fetchImages = async (searchQuery, currentPage) => {
    try {
      const data = await PixabayAPI.getImages(searchQuery, currentPage);
      return data;
    } catch (error) {
      throw error;
    }
  };


  updateImages = async () => {
    this.setState({
      status: Status.PENDING,
    });
 
    try {
      const data = await this.fetchImages(
        this.state.searchQuery,
        this.state.currentPage
      );
   
      if (data.hits.length === 0) {
        Notiflix.Report.warning(
          'PixQuery Warning',
          'Sorry, but we could not find any photos for your search query. Please try changing your keywords or search for something else.',
          'Okay'
        );
 
        return this.setState({
          status: Status.REJECTED,
        });
      }

      console.log(this.state.searchQuery);
      console.log(this.state.currentPage);
      console.log(data);

  
      this.setState({
        images: [...data.hits],
        status: Status.RESOLVED,
        totalPages: Math.ceil(data.totalHits / 12),
      });
    } catch (error) {
      Notiflix.Report.failure(
        'PixQuery Warning',
        `Error fetching images: ${error.message}`,
        'Okay'
      );
      this.setState({
        status: Status.REJECTED,
      });
    }
  };
 
  loadMore = async () => {
    this.setState({
      status: Status.PENDING,
    });
    const data = await this.fetchImages(
      this.state.searchQuery,
      this.state.currentPage
    );

    this.setState(prevState => ({
      images: [...prevState.images, ...data.hits],
      status: Status.RESOLVED,
    }));
  };

  handleButtonClick = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({
      currentPage: newPage,
    });
  };

  render() {
    const { status } = this.state;

    if (status === 'idle') {
      return <GalleryInfo></GalleryInfo>;
    }

    if (status === 'pending') {
      return (
        <>
          {this.state.images.length > 0 && (
            <ImageGallery images={this.state.images}></ImageGallery>
          )}
          <InfinitySpin
            color="#09923d"
            style={{
              margin: '22px',
            }}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGallery images={this.state.images}></ImageGallery>
          {this.state.currentPage < this.state.totalPages && (
            <Button onClick={this.handleButtonClick}></Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          Sorry, but we could not find any photos for your search query. Please
          try changing your keywords or search for something else.
        </div>
      );
    }
  }
}
