import React, { Component } from 'react'

export class Newsitem extends Component {
  
    render() {
         let { title, description, imageUrl,newsURL,author,date,source } = this.props;
        return (
          <div className="my-3 ">
            <div
              className="card  text-white    "
              style={{
                backgroundColor: "#abb9c7",
                height: "60vh",
                border: " 3px solid black",
              }}
            >
              {/* <span className="position-absolute start-70 top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%" ,zIndex:'1'}}>
                {source}
              </span> */}
              <img
                style={{ height: "20vh" }}
                src={imageUrl}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body  ">
                <h5 className="card-title">{title}...</h5>

                <p className="card-text">{description}...</p>
                <div className="card-footer text-light">
                  <strong>By</strong> {author} on {new Date(date).toGMTString()}
                  .
                </div>
                <a
                  href={newsURL}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-sm  btn-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
    }
}

export default Newsitem
