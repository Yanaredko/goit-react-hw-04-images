import React, { Component } from 'react';
import '../index.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    isLoadingMore: false,
    noMoreImages: false,
    totalHits: 0,
    showImages: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.loadImages()
    }
  }

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1 }) 
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }));
  }

  loadImages = () => {
    const { query, page } = this.state;

    if (!query) {
      return; 
    }

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then((data) => {
        if (data.hits.length === 0) {
          this.setState({ noMoreImages: true });
          return;
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  openModal = (imageURL) => {
    this.setState({ showModal: true, modalImage: imageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, showModal, modalImage, totalHits } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        {images.length > 0 && (
          <ImageGallery>
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => this.openModal(image.largeImageURL)}
              />
            ))}
          </ImageGallery>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalHits && (
          <Button onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal src={modalImage} alt="" onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
