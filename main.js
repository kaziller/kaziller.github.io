var SimplePeer = require('simple-peer');

  var peer = new SimplePeer({channelName: 'cloudbrowserawt',})

  peer.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('video')
    video.src = window.URL.createObjectURL(stream)
    video.play()
  });
