import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
static defaultProps={
    country:'in',
    pagesize:20,
    category:'general',

}
static propTypes={
    country: PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string,
}

 capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading:true,
      page: 1,
      totalResults:0,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-AvengersNews`
  }

  async updateNews(){
    this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);

    let parseData = await data.json();
    this.props.setProgress(60);

    console.log(parseData);
    this.setState({ articles: parseData.articles ,totalResults: parseData.totalResults,
    loading:false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf02ed071bbf4e1f90fad0c8f120456e&page=1&pagesize=${this.props.pagesize}`;
    //   this.setState({ loading: true });

    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({ articles: parseData.articles ,totalResults: parseData.totalResults,
    // loading:false
    // });
   
this.updateNews();

  }

  // handlenextClick = async () => { 
  //   if (
  //     this.state.page + 1 >
  //     Math.ceil(this.state.totalresult / this.props.pagesize)
  //   ) {
  //   } else {
  //     let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf02ed071bbf4e1f90fad0c8f120456e&page=${
  //       this.state.page + 1
  //     }&pagesize=${this.props.pagesize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parseData = await data.json();
     

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading: false
  //     });
  //   };

//   this.setState({ page: this.state.page + 1 });
//   this.updateNe

    // }

//   handleprevClick =async () => {
//        let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=cf02ed071bbf4e1f90fad0c8f120456e&page=${
//          this.state.page - 1
//        }&pagesize=${this.props.pagesize}`;
//       this.setState({ loading: true });

//     let data = await fetch(url);
//     let parseData = await data.json();
//     console.log(parseData);
  
//       this.setState({
// page:this.state.page -1,
//  articles: parseData.articles,
//  loading: false
//       })
// this is repeating first page
//   this.setState({ page: this.state.page - 1 });
//   this.updateNews();




  // };

  
  fetchMoreData = async () => {
   // a fake async api call like which sends
   // 20 more records in 1.5 secs
  this.setState({
      page: this.state.page+1,
      
    })
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      // loading: false,
    });
  
 };
  render() {
    return (
      <>
       
          <h1 className="text-center ">
            {" "}
            Trending News - In {this.capitalizeFirstLetter(
              this.props.category
            )}{" "}
            Category
          </h1>

          {this.state.loading && <Spinner/>}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!=this.state.totalResults}
            loader={<Spinner/>}
          >
           <div className="container">
            <div className="row h-25">
              {
                this.state.articles.map((element) => {
                  return (
                    <div
                      className="col-md-3 col-sm-6 col-xs-12 mb-4"
                      key={element.url}
                    >
                      <Newsitem
                        title={element.title ? element.title.slice(0, 40) : " "}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : " "
                        }
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
      
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="text-nowrap  btn btn-lg btn-dark"
            onClick={this.handleprevClick}
          >
            <h3>&larr; Previous</h3>
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalresult / this.props.pagesize)
            }
            type="button"
            className=" text-nowrap btn btn-lg btn-dark"
            onClick={this.handlenextClick}
          >
            <h3>Next&rarr;</h3>
          </button>
        </div> */}
      </>
    );
  }
}
