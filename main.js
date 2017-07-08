var SimplePeer = require('simple-peer')

// get video/voice stream
// navigator.getUserMedia({ video: true, audio: true }, gotMedia, function () {})

function gotMedia (data) {
  // var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = new SimplePeer()

  // peer1.on('signal', function (data) {
  //   peer2.signal(data)
  // })

  // peer2.on('signal', function (data) {
  //   peer1.signal(data)
  // })

  peer2.signal(data);

  peer2.on('stream', function (stream) {
    console.log(stream);
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}

var signalhub = require('signalhub')
var hub = signalhub('my-app-name', [
  'https://cloudbrowsersignalingserver.herokuapp.com/'
])

hub.subscribe('my-channel')
  .on('data', function (message) {
    console.log('new message received', message)
    if(message.type === offer) {
      gotMedia(message);
    }
  });