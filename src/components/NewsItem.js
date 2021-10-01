import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, urlToImage, url, author, date, source } = this.props;
        return (
            <div className="card my-3">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: '90%' }}>{source}</span>
                <img src={urlToImage ? urlToImage : 'https://images.news18.com/ibnlive/uploads/2021/09/venus-clouds-life-form-163299369116x9.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title ? title : "..."}</h5>
                    <p className="card-text">{description ? description : ""}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
