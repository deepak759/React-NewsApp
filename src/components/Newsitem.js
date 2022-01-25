import React from 'react'

const Newsitem=(props)=>{
  
   
         let { title, description, imageUrl,newsURL,author,date } =props;
        return (
          <div className="my-3 ">
            <div
              className="card  text-white    "
              style={{
                backgroundColor: "#1d1b83",
                height: "80vh",
                border: " 3px solid black",
              }}
            >
              
              <img
                style={{ height: "28vh" }}
                src={imageUrl}
                className="card-img-top"
                alt="..."
              />
              <div
                className="card-body d-flex flex-column  "
                style={{
                  backgroundImage: `url("https://wallpaperaccess.com/full/1767711.jpg")`,
                  height: "52vh",
                  zIndex:1
                }}
              >
                <h5
                  className="card-title"
                  style={{
                    height: "13vh",
                  }}
                >
                  HEADLINES &nbsp; :&nbsp;&nbsp;&nbsp; {title}...
                  <hr style={{ weight: "bold" }} />
                </h5>

                <p
                  className="card-text"
                  style={{
                    height: "13vh",
                  }}
                >
                  
                  <strong>DESCRIPTION</strong> &nbsp;:&nbsp;&nbsp;&nbsp;
                  {description}...
                  <hr style={{ weight: "bold" }} />
                </p>

                <div className="card-footer text-light">
                  <strong>AUTHOR&nbsp;&nbsp;:&nbsp;&nbsp; By</strong> {author}{" "}
                  on {new Date(date).toGMTString()}
                  <hr style={{ weight: "bold" }} />
                </div>
                <a
                  href={newsURL}
                  rel="noreferrer"
                  target="_blank"
                  className="btn mt-auto btn-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
    
}

export default Newsitem
