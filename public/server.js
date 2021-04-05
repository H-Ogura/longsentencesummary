/*
// 送信ボタン
function googleAnalyzeSentiment(){
    var txtObj = document.getElementById('textarea-id-01');

    socket.emit('googleAnalyzeSentiment', {
        content: txtObj.value
    }, function(body) {
        document.getElementById('results').innerText = JSON.stringify(body, null, '\t');
    });
}

// ソケット接続を有効にする
var socket = io.connect('/');
*/
http.createServer(function(req, res) {
    if(req.method === 'GET') {
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(html);
    } else if(req.method === 'POST') {
      var data = '';
      
     //POSTデータを受けとる
     req.on('data', function(chunk) {data += chunk})
        .on('end', function() {
  
          console.log(data);
          res.end(html);
  
        })
  
     }
  }).listen(3000);

  function abstract() {
    var options = {
        url: 'https://clapi.asahi.com/abstract',
        method: 'POST',
        form: {
            "text":"太郎",
            length:"200",
            auto_paragraph:"true"
        }
    }

    request(options, function (error, response, body) {
 
        console.log(body);
     
     
    });
  }

  function execlongsentencesummary() {
      abstract();
  }