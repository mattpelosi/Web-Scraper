const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

app.get("/scrape", function(req, res) {
  let url = "https://www.imdb.com/title/tt1229340/";
  request(url, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      let title, release, rating;
      let json = {
        title: "",
        release: "",
        rating: ""
      };
      $(".title_wrapper").filter(function() {
        let data = $(this);
        let title = data
          .children()
          .first()
          .text();
        json.title = title;
      });
      $("#titleYear").filter(function() {
        let data = $(this);
        let release = data
          .children()
          .first()
          .text();
        json.release = release;
      });
      $(".ratingValue strong").filter(function() {
        let data = $(this);
        let rating = data
          .children()
          .first()
          .text();
        json.rating = rating;
      });
      fs.writeFile("output.json", JSON.stringify(json, null, 4), function(err) {
        console.log(
          "File successfully written! - check project directory for output.json"
        );
      });
      res.send("Check your console");
    }
  });
});

app.listen(8080);
console.log("magic happens on port 8080");
