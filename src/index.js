import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import axios from "axios";
import randomcolor from "randomcolor";
import "./styles.css";

function RandomQuoteApp() {
  const [quote, SetQuote] = useState("");
  const [author, SetAuthor] = useState("");
  const [color, SetColor] = useState("");
  const [count, SetCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://type.fit/api/quotes")
      .then(response => {
        const x =
          Math.floor(Math.random() * (response.data.length - 1 + 1)) + 1;
        SetQuote(response.data[x].text);
        SetAuthor(response.data[x].author);
        const colorVal = randomcolor();
        SetColor(colorVal);
        $("body").css("background-color", colorVal);
      })
      .catch(err => {
        console.log(err);
      });
  }, [count]);

  const font_color = {
    color: color
  };

  const background_color = {
    backgroundColor: color
  };

  return (
    <div className="RandomQuoteBox" id="quote-box">
      <div id="text" style={font_color}>
        {quote}
      </div>
      <div id="author" style={font_color}>
        {" "}
        - {author}{" "}
      </div>

      <div className="row">
        <div className="col-3">
          <a
            href="https://twitter.com/intent/tweet"
            id="tweet-quote"
            className="btn btn-dark"
            style={background_color}
          >
            <i className="fab fa-twitter" />
          </a>
        </div>

        <div className="col-9">
          <button
            id="new-quote"
            className="btn btn-dark"
            style={background_color}
            onClick={() => SetCount(prevCount => prevCount + 1)}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<RandomQuoteApp />, rootElement);
