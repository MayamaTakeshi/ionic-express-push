var express = require('express')
var app = express()

var gcm = require('node-gcm');

var sender = new gcm.Sender('AIzaSyD35z0Se6Mzdhm6TAgaRX-q34tNO5b-v_U', {'proxy': 'http://192.168.1.7:3128/'});

var send_msg = function(r) {
  console.log("sending:");
  console.dir(r);
  var msg = new gcm.Message();
  msg.addData('message', 'wake up');
  msg.addNotification('title', 'Alarm');
  msg.addNotification('icon', 'ic_launcher');
  msg.addNotification('body', r.msg);

  sender.send(msg, {to: r.token}, function(err, response) {
     if(err) {
       console.log('failed:');
       console.dir(err);
       console.dir(response);
     } else {
       console.log('success:');
       console.dir(response);
     }
    });
};
 
app.get('/push_test', function (req, res) {
  var r = {
    token: req.query.token,
    msg: req.query.msg
  }; 
  setTimeout(function() {
    send_msg(r);
  }, parseInt(req.query.delay)*1000)
  res.send('ok');
})
 
app.listen(8080)
