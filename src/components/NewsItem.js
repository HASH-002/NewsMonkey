import React from 'react'

export default function NewsItem(props) {
    let { title, description, urlToImage, url, author, date, source } = props;
    return (
        <div className="card my-3">
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                <span className="badge rounded-pill bg-danger"> {source} </span>
            </div>
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