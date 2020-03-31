import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./custom.css";

//implement with redux https://daveceddia.com/where-fetch-data-redux/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      text: "",
      author: "",
      color: "",
      isLoading: true
    };
    this.getQuote = this.getQuote.bind(this);
    this.onNewQuoteClick = this.onNewQuoteClick.bind(this);
    this.getTweetURL = this.getTweetURL.bind(this);
  }

  getColor() {
    const color = [
      "#ccc",
      "#fff",
      "#98a1a8",
      "#5aa7de",
      "#929ae9",
      "#dc7be5",
      "#e57dba",
      "#e6838b",
      "#dd8d54",
      "#b0a200",
      "#00b84d",
      "#00b3a4"
    ];
    const randomIndex = Math.floor(Math.random() * color.length + 1);
    return color[randomIndex];
  }

  getQuote() {
    const { quotes, text } = this.state;
    const newIndex = Math.floor(Math.random() * quotes.length + 1);
    return text === quotes[newIndex] ? this.getQuote() : quotes[newIndex];
  }

  onNewQuoteClick() {
    const quote = this.getQuote();
    this.setState({
      text: quote.quote,
      author: quote.author,
      color: this.getColor()
    });
  }

  getTweetURL() {
    const { text, author } = this.state;
    return `http://twitter.com/intent/tweet?text=${text} - ${author}`;
  }

  componentDidMount() {
    const URL =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          quotes: data.quotes,
          isLoading: false
        });
      })
      .then(this.onNewQuoteClick);
  }

  render() {
    const { text, author, color, isLoading } = this.state;
    return (
      <div
        id="wrapper"
        className="container-fluid fill  d-flex justify-content-center align-items-center"
        style={{ backgroundColor: color }}
      >
        <div
          id="quote-box"
          className="w-50 p-md-5"
          style={{
            borderRadius: 10
          }}
        >
          <div className="column">
            <div className="text-center text-justify text-wrap row">
              <div className="col-xl-1">
                <h2>
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </h2>
              </div>
              <div className="col-xl-11">
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} size="2x" spin />
                ) : (
                  <h2 id="text">{text}</h2>
                )}
              </div>
            </div>
            <div className="p-3 col-xs-12">
              <p
                id="author"
                className="float-right font-weight-light"
                style={{ fontSize: 24 }}
              >
                {author}
              </p>
            </div>
            <div className="row w-100">
              <div className="col">
                <a
                  id="tweet-quote"
                  type="button"
                  class="btn btn-primary btn-lg float-left"
                  href={this.getTweetURL()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <div className="col">
                <button
                  id="new-quote"
                  type="button"
                  class="btn btn-warning btn-lg float-right"
                  src="#"
                  onClick={this.onNewQuoteClick}
                >
                  New Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
