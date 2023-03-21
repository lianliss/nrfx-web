import React from 'react';

// Utils
import installTrustImg from '../../../assets/installTrust.png';
import moment from 'moment';

// Styles
import './index.less';

function BlogCard({ img, title, description, date }) {
  return (
    <div className="orders-blog-card">
      <img src={img || installTrustImg} alt="install trust" />
      <div className="orders-blog-card__content">
        <h5>{title}</h5>
        <p>{description}</p>
        {date && (
          <span className="orders-blog-card__date">
            {moment(date).format('YYYY-MM-DD')}
          </span>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
