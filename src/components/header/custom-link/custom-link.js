import React from 'react';
import { Link } from 'react-router-dom';

function CustomLink({ url, styles, text }) {
  return (
    <Link to={url} className={`${styles}`}>{text}</Link>
  )
};

export default CustomLink;