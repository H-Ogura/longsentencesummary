// 送信ボタン
function googleAnalyzeSentiment(){
    alert(document.getElementById('textarea-id-01').innerText);

    socket.emit('googleAnalyzeSentiment', {
        content: document.getElementById('textarea-id-01').innerText
    }, function(body) {
        console.log(JSON.stringify(JSON.parse(body), undefined, 4));
        document.getElementById('results').innerHTML = JSON.stringify(JSON.parse(body), undefined, 4);
    });
}

// ソケット接続を有効にする
var socket = io.connect('/');
