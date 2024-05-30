import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  const noImage =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const publishDate = new Date(date);
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateInIST = publishDate.toLocaleString("en-IN", options);

  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={imageUrl || noImage}
          className="card-img-top "
          style={{ height: "30vh" }}
          alt="..."
        />
        <div className="card-body position-relative">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By <strong>{author ? author : "Unknown"}</strong> on {dateInIST}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
