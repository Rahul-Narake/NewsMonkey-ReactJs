import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitallize(props.category)}` + '- NewsMonkey';
  }

  capitallize = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  updateNews = async () => {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    await this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    await this.updateNews();
  };

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-5">
          {'NewsMonkey - Top ' + this.capitallize(this.props.category) + ' '}
          Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((news) => {
                return (
                  <div className="col-md-4" key={news.url}>
                    <NewsItem
                      title={news.title !== null ? news.title.slice(0, 45) : ''}
                      description={
                        news.description !== null
                          ? news.description.slice(0, 88) + '...'
                          : ''
                      }
                      imgUrl={
                        ~news.urlToImage !== null
                          ? news.urlToImage
                          : 'https://images.hindustantimes.com/tech/img/2023/08/06/1600x900/BGMI_1684737318815_1691282701402.jpeg'
                      }
                      newsUrl={news.url}
                      author={news.author != null ? news.author : 'Unkown'}
                      date={news.publishedAt}
                      sourceName={news.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page === 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previoue
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
