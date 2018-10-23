const language = require('@google-cloud/language');
// Instantiates a client
const client = new language.LanguageServiceClient();

const express = require('express');
const http = require('http');
const app = express();
app.use(express.static('./public'));
var server = require('http').Server(app);

server.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
var io = require('socket.io').listen(server);
/* node-static は npm からアンインストールあとでする
var static = require('node-static');
var fs = new static.Server('./public');

http.createServer(function(request, response) {
    request.addListener('end', function () {
        fs.serve(request, response);
    }).resume();
//}).listen(process.env.PORT, process.env.IP);
}).listen(process.env.PORT);

var io = require('socket.io').listen(http);*/
io.sockets.on('connection', function (socket) {
    socket.on('googleAnalyzeSentiment', function (params, cb) {
        console.log(params);
        
        const document = {
            content: params.content,
            type: 'PLAIN_TEXT'
        };

        client
            .analyzeSentiment({document: document})
            .then(results => {
                JSON.stringify(results);
                const sentiment = results[0].documentSentiment;

                console.log(`Text: ${params.content}`);
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