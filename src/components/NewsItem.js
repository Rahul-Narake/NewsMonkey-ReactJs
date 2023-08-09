import React from 'react';

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, sourceName } = props;
  return (
    <div className="container my-3">
      <div className="card">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {sourceName}
        </span>
        <img className="card-img-top" src={imgUrl} alt="news pic" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target="blank" className="btn btn-dark btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
