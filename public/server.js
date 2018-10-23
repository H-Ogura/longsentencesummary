// 送信ボタン
function googleAnalyzeSentiment(){
    var txtObj = document.getElementById('textarea-id-01');

    socket.emit('googleAnalyzeSentiment', {
        content: txtObj.value
    }, function(body) {
        document.getElementById('results').innerHTML = JSON.stringify(JSON.parse(body));
    });
}

// ソケット接続を有効にする
var socket = io.connect('/');
