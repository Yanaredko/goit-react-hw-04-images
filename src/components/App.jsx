import React, { useState, useEffect } from 'react';
import '../index.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../api';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [setNoMoreImages] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);

    fetchImages(query, page)
      .then((data) => {
        if (data.hits.length === 0) {
          setNoMoreImages(true);
          return;
        }

        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotalHits(data.totalHits);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, setNoMoreImages]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageURL) => {
    setShowModal(true);
    setModalImage(imageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => openModal(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={loadMore} />
      )}
      {showModal && <Modal src={modalImage} alt="" onClose={closeModal} />}
    </div>
  );
}

export default App;
