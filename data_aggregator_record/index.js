const http = require("http");
const request = require("request");
const fs = require("fs");
const csv = require("csv");
const url = require("url");
const create_html = require('./create_html.js');
const update_log = require('./update_log.js');

let json_request_body = undefined;
let csv_request_body = undefined;
let htmlContent = undefined;


setInterval(() => {
  request(
    `${process.env.API_TRUCKS}`,
    (err, request_res, body) => {
      json_request_body = body;
    }
  );
  console.log("Requesting JSON Data");
}, 2000);

setInterval(() => {
  request(
    `${process.env.API_PUBLIC_ART}`,
    (err, request_res, body) => {
      csv.parse(body, (err, data) => {
        csv_request_body = data;
      });
    }
  );
  console.log('Requesting CSV Data')
}, 2000);

http
  .createServer((req, res) => {
    if (json_request_body && csv_request_body && htmlContent) {
      res.writeHead(200, { "Content-Type": "text/html" });
      let request_url = url.parse(req.url);
      switch (request_url.path) {
        case "/json":
          update_log.updateLogFile('Accessed JSON data')
          res.end(create_html.createHtmlStringFromJson(htmlContent, JSON.parse(json_request_body)));
          break;
        case "/csv":
          update_log.updateLogFile('Accessed CSV data')
          res.end(create_html.createHtmlStringFromCsv(htmlContent, csv_request_body));
          break;
        default:
          res.end("Wrong Route!");
          break;
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Nothing retrieved yet.");
    }
  })
  .listen(4500);

fs.readFile("./index.html", (err, html) => {
  if (err) {
    throw err;
  }
  htmlContent = html;
});
