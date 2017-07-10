var Peer = require('simple-peer')
var signalhub = require('signalhub')
var hub = signalhub('my-app-name', [
  'https://cloudbrowsersignalingserver.herokuapp.com/'
])

var isConnected = false;

hub.subscribe('my-channel')
  .on('data', function (message) {
    console.log('new message received')
    if(JSON.parse(message).type === 'offer' && !isConnected) {
    p.signal(message);
    isConnected = true;
    }
  })

var p = new Peer({ initiator: false, trickle: false })

p.on('error', function (err) { console.log('error', err) })

p.on('signal', function (data) {
  console.log('SIGNAL', JSON.stringify(data));
  hub.broadcast('my-channel', JSON.stringify(data));
})

p.on('connect', function () {
  console.log('CONNECT')
  p.send('whatever' + Math.random())
})

p.on('data', function (data) {
  console.log('data: ' + data)
})

p.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })