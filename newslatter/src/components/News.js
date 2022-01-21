import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
      loading: false,
      page: 1,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-AvengersNews`
  }

  async updateNews(){
      let url =
      `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ec1d409e52f1465ab954e070f497851e&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles ,totalresult: parseData.totalResults,
    loading:false
    });
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ec1d409e52f1465ab954e070f497851e&page=1&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles ,totalresult: parseData.totalResults,
    loading:false
    });
   
// this.updateNews();

  }

  handlenextClick = async () => { 
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalresult / this.props.pagesize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ec1d409e52f1465ab954e070f497851e&page=${
        this.state.page + 1
      }&pagesize=${this.props.pagesize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
     

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      });
    };

//   this.setState({ page: this.state.page + 1 });
//   this.updateNe

    }

  handleprevClick =async () => {
       let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ec1d409e52f1465ab954e070f497851e&page=${
         this.state.page - 1
       }&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
  
      this.setState({
page:this.state.page -1,
 articles: parseData.articles,
 loading: false
      })
// this is repeating first page
//   this.setState({ page: this.state.page - 1 });
//   this.updateNews();

  };
  render() {
    return (
      <>
        <div className="container  my-2">
          <h1 className="text-center"> Trending News - In {this.capitalizeFirstLetter(this.props.category)} Category</h1>

{this.state.loading && <Spinner/>}
          <div className="row h-25">
            {!this.state.loading && this.state.articles.map((element) => {
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
                    author={!element.author?"Unknown":element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
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
        </div>
      </>
    );
  }
}
