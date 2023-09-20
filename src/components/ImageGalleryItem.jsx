import React from "react";
import PropTypes from 'prop-types';
import "../index.css";

const ImageGalleryItem = ({ src, alt, onClick }) => (
  <li className="ImageGalleryItem" onClick={onClick}>
    <img className="ImageGalleryItem-image" src={src} alt={alt} />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;