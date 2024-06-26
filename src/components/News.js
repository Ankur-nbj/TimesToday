import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=5`; 
      setLoading(true);
      let response = await fetch(url, {
        headers: {
          'Upgrade': 'h2c',
          'Connection': 'Upgrade'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch news articles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - TimesToday`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=5`;
      const response = await fetch(url, {
        headers: {
          'Upgrade': 'h2c',
          'Connection': 'Upgrade'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      setPage(nextPage);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error('Failed to fetch more news articles:', error);
    }
  };

  return (
    <div className="container my-5">
      <br />
      <h2 className="text-center fixed">Top Headlines - {capitalizeFirstLetter(props.category)}</h2>
      <hr />
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container row w-100 ps-5">
          {articles.map((article) => (
            <div className="col-md-4 col-sm-6" key={article.url}>
              <NewsItem
                title={article.title ? article.title.slice(0, 40) : ''}
                description={article.description ? article.description.slice(0, 60) : <br />}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                author={article.author}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News;
