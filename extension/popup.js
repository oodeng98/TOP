let message;
let port = null;

// function appendMessage(text) {
//   document.getElementById("response").innerHTML += "<p>" + text + "</p>";
// }

// function updateUiState() { // 3
//   if (port) {
//     document.getElementById("response").innerHTML += "<p>Connected</p>";
//   } else {
//     document.getElementById("response").innerHTML += "<p>Disconnected</p>";
//   }
// }

// function onDisconnected() { // 4
//   appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
//   port = null;
//   updateUiState();
// }

// function connect() { // 2
//   const hostName = "com.google.chrome.example.echo";
//   appendMessage("Connecting to native messaging host <b>" + hostName + "</b>");
//   port = chrome.runtime.connectNative(hostName);
//   port.onDisconnect.addListener(onDisconnected);
//   updateUiState();
// }

// document.addEventListener("DOMContentLoaded", function () { // 1
//   connect();
// });

// document.getElementById('start').addEventListener('click', function () {
//   chrome.runtime.sendMessage({ type: 'startCapture' }, function (response) {
//     if (response.streamId) {
//       startOpenViduSession(response.streamId);
//     } else {
//       console.error('Failed to get stream ID');
//     }
//   });
// });

function startOpenViduSession(streamId) {
  const OV = new OpenVidu();
  const session = OV.initSession();

  session.on('streamCreated', event => {
    session.subscribe(event.stream, 'video-container');
  });

  // Replace with your OpenVidu server URL and credentials
  const OPENVIDU_SERVER_URL = 'https://i11a707.p.ssafy.io/ov-server';
  const OPENVIDU_SERVER_SECRET = 'ssafy';

  getToken().then(token => {
    session.connect(token)
      .then(() => {
        navigator.mediaDevices.getUserMedia({
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId
            }
          }
        }).then(stream => {
          const videoTrack = stream.getVideoTracks()[0];
          const publisher = OV.initPublisher('video-container', {
            videoSource: videoTrack,
            publishAudio: true
          });
          session.publish(publisher);
        }).catch(error => {
          console.error('Error accessing user media', error);
        });
      }).catch(error => {
        console.error('Error connecting to the session:', error);
      });
  });

  function getToken() {
    return createSession().then(sessionId => createToken(sessionId));
  }

  function createSession() {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: '' });
      fetch(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json())
        .then(data => resolve(data.id))
        .catch(error => reject(error));
    });
  }

  function createToken(sessionId) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({});
      fetch(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json())
        .then(data => resolve(data.token))
        .catch(error => reject(error));
    });
  }
}
