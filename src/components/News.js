import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let URL = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=*****&page=1&pageSize=20'
        let promise = await fetch(URL);
        let data = await promise.json();
        this.setState({ articles: data.articles, totalResults: data.totalResults })
    }
    handlePrevClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=*****&page=${this.state.page - 1}&pageSize=20`
        let promise = await fetch(URL);
        let data = await promise.json();
        this.setState({
            articles: data.articles,
            page: this.state.page - 1
        })
    }
    handleNextClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=*****&page=${this.state.page + 1}&pageSize=20`
        let promise = await fetch(URL);
        let data = await promise.json();
        this.setState({
            articles: data.articles,
            page: this.state.page + 1
        })
    }
    render() {
        return (
            <>
                <div className="container">
                    <h1 className="text-center" >NewsMonkey Headlines</h1>
                    <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} url={element.url} urlToImage={element.urlToImage ? element.urlToImage : 'https://images.news18.com/ibnlive/uploads/2021/09/venus-clouds-life-form-163299369116x9.jpg'} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={Math.ceil( this.state.totalResults/20 )<this.state.page +1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News
