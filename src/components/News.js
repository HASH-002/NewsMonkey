import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async update() {
        this.props.setProgress(10);
        const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let promise = await fetch(URL);
        this.props.setProgress(30);
        let data = await promise.json();
        this.props.setProgress(70);
        this.setState({
            articles: data.articles,
            loading: false,
            totalResults: data.totalResults
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.update();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let promise = await fetch(URL);
        let data = await promise.json();
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults
        })
    }
    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }} >NewsMonkey Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>
            </>
        )
    }
}

export default News
