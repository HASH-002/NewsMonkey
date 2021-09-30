import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className="container">
                <h1 >NewsMonkey Headlines</h1>
                <div className="row my-3">
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" urlToImage="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" />
                    </div>
                </div>
            </div>

        )
    }
}

export default News
