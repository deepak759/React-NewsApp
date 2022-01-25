import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
const [articles, setarticles] = useState([]);
const [loading, setloading] = useState(true);
const [page, setpage] = useState(1);
const [totalResults, settotalResults] = useState(0);


const capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
 

const updateNews= async ()=>{
    props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
      setloading({ loading: true });

    let data = await fetch(url);
    props.setProgress(30);

    let parseData = await data.json();
    props.setProgress(60);

    setarticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setloading(false);
   
    props.setProgress(100);
  }

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)}-AvengersNews`

    updateNews();
  }, []);
  
 

  
     

  
 const fetchMoreData = async () => {
  
    let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`;
    
   setpage(page + 1);

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setarticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults)
   
  
 };
  
    return (
      <>
       <br /> <h1
          className="text-center "
          style={{ padding: "60px", height: "60px", color:"white" }}
        >
          {" "}
          Trending News - In {capitalizeFirstLetter(props.category)} Category
        </h1>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div
            className="container-lg"
           
          >
            <div className="row h-25">
              {articles.map((element) => {
                return (
                  <div
                    className="col-md-4 col-sm-6 col-xs-12 mb-4"
                    key={element.url}
                  >
                    <Newsitem
                      title={element.title ? element.title.slice(0, 100) : " "}
                      description={
                        element.description
                          ? element.description.slice(0, 160): " "}
                      imageUrl={
                        !element.urlToImage
                          ? "https://timesofindia.indiatimes.com/thumb/msid-88963409,width-1200,height-900,resizemode-4/88963409.jpg"
                          : element.urlToImage
                      }
                      newsURL={element.url}
                      author={!element.author ? "Unknown" : element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

News.defaultProps={
    country:'in',
    pagesize:20,
    category:'general',

}
 News.propTypes={
    country: PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string,
}
export default News
