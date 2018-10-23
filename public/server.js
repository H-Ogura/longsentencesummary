// 送信ボタン
function googleAnalyzeSentiment(){
    alert(document.getElementById('textarea-id-01'));

    socket.emit('googleAnalyzeSentiment', {
        content: document.getElementById('textarea-id-01')
    }, function(body) {
        console.log(JSON.parse(body));
        document.getElementById('results').innerHTML = JSON.parse(body);
    });
}

// ソケット接続を有効にする
var socket = io.connect('/');
