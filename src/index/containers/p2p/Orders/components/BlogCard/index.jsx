import React from 'react';

// Utils
import installTrustImg from '../../../assets/installTrust.png';

// Styles
import './index.less';

function BlogCard({ img, title, description }) {
  return (
    <div className="orders-blog-card">
      <img src={img || installTrustImg} alt="install trust" />
      <div className="orders-blog-card__content">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
