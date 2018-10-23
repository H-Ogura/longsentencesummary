// 送信ボタン
function googleAnalyzeSentiment(){
    //alert(document.getElementById('textarea-id-01'));
    var txtObj = document.getElementById('textarea-id-01');
    alert(txtObj.value);
    
    socket.emit('googleAnalyzeSentiment', {
        //content: document.getElementById('textarea-id-01')
        content: txtObj.value
    }, function(body) {
        document.getElementById('results').innerHTML = body;
    });
}

// ソケット接続を有効にする
var socket = io.connect('/');
