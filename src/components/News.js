import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async update() {
        const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=***&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let promise = await fetch(URL);
        let data = await promise.json();
        this.setState({
            articles: data.articles,
            loading: false,
            totalResults: data.totalResults
        })
    }

    async componentDidMount() {
        this.update();
    }
    handlePrevClick = async () => {
        this.update();
        this.setState({ page: this.state.page - 1 })
    }
    handleNextClick = async () => {
        this.update();
        this.setState({ page: this.state.page + 1 })
    }
    render() {
        return (
            <>
                <div className="container">
                    <h1 className="text-center" style={{ margin: '35px 0px' }} >NewsMonkey Headlines</h1>
                    {this.state.loading && <Spinner />}
                    {!this.state.loading && <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description} url={element.url} urlToImage={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>}
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={Math.ceil(this.state.totalResults / this.props.pageSize) < this.state.page + 1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News
