'use strict';

const language = require('@google-cloud/language');
// Instantiates a client
const client = new language.LanguageServiceClient();
const fs = require("fs");
const http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var output = fs.readFileSync("./public/index.html", "utf-8");
    response.end(output);
}).listen(process.env.PORT, process.env.IP);

var io = require('socket.io').listen(http);
io.sockets.on('connection', function (socket) {
    socket.on('googleAnalyzeSentiment', function (params, cb) {
        const document = {
            content: params.content,
            type: 'PLAIN_TEXT'
        };

        client
            .analyzeSentiment({document: document})
            .then(results => {
                console.log(results);
                const sentiment = results[0].documentSentiment;

                console.log(`Text: ${text}`);
                console.log(`Sentiment score: ${sentiment.score}`);
                console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
                cb(results);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });
});
/*
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze
const text = 'Hello, world!';

const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
  .analyzeSentiment({document: document})
  .then(results => {
    const sentiment = results[0].documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  */