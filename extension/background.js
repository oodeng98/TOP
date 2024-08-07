// let port = null;

const SERVER_URL = 'https://i11a707.p.ssafy.io:4443/ov-server';

async function getToken() {
  const response = await fetch(SERVER_URL + '/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          roomName,
          participantName
      })
  });
  if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
  }
  const data = await response.json();

  const tokenResponse = await fetch(`${SERVER_URL}/openvidu/api/sessions/${data.id}/connection`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`OPENVIDUAPP:${SECRET}`)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: 'PUBLISHER' })
  });

  const tokenData = await tokenResponse.json();
  return data.token;
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('OpenVidu Chrome Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  if (!OV) {
    OV = new OpenVidu();
    session = OV.initSession();

    session.on('streamCreated', (event) => {
      session.subscribe(event.stream, 'video-container');
    });

    session.connect('https://i11a707.p.ssafy.io:4443/ov-server', 'YOUR_TOKEN')
      .then(() => {
        const publisher = OV.initPublisher('video-container');
        session.publish(publisher);
      })
      .catch((error) => {
        console.error('Error connecting to OpenVidu session:', error);
      });
  }
});

// function connect() {
//   const hostName = "com.google.chrome.example.echo";
//   console.log("Connecting to native messaging host " + hostName);
//   port = chrome.runtime.connectNative(hostName);
//   port.onMessage.addListener(onNativeMessage);
//   port.onDisconnect.addListener(onDisconnected);
// }

// function onNativeMessage(message) {
//   console.log("최상단 프로그램: " + message["info"]);
// }

// function onDisconnected() {
//   console.log("Failed to connect: " + chrome.runtime.lastError.message);
//   port = null;
// }

// function logTabUrl(tabId, changeInfo, tab) {
//   if (changeInfo.url) {
//     console.log("URL: ", changeInfo.url);
//   }
// }

// chrome.tabs.onUpdated.addListener(logTabUrl);

// chrome.runtime.onStartup.addListener(connect);
// chrome.runtime.onInstalled.addListener(connect);
