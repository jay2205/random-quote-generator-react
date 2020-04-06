import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./custom.css";

function getColor() {
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

export default function HookApp() {
  const quotes = useFetchQuotes();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (text.length === 0 && quotes.length > 0) {
      console.log("useEffect");
      const newIndex = Math.floor(Math.random() * quotes.length + 1);
      const quote = quotes[newIndex];
      setText(quote.quote);
      setAuthor(quote.author);
      setColor(getColor());
    }
  }, [text, quotes]);

  function getQuote() {
    const newIndex = Math.floor(Math.random() * quotes.length + 1);
    return text === quotes[newIndex] ? this.getQuote() : quotes[newIndex];
  }

  function onNewQuoteClick() {
    if (quotes.lenght !== 0) {
      const quote = getQuote();
      setText(quote.quote);
      setAuthor(quote.author);
      setColor(getColor());
    }
  }

  function getTweetURL() {
    return `http://twitter.com/intent/tweet?text=${text} - ${author}`;
  }

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
                className="btn btn-primary btn-lg float-left"
                href={getTweetURL}
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
                className="btn btn-warning btn-lg float-right"
                src="#"
                onClick={onNewQuoteClick}
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

function useFetchQuotes() {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    async function fetchQuotes() {
      const URL =
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
      const response = await fetch(URL);
      response.json().then(data => setQuotes(data.quotes));
    }
    if (quotes.length === 0) {
      fetchQuotes();
    }
  }, [quotes]);
  return quotes;
}
