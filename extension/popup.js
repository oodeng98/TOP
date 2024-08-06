let message;
let port = null;

function appendMessage(text) {
  document.getElementById("response").innerHTML += "<p>" + text + "</p>";
}

function updateUiState() {
  if (port) {
    document.getElementById("response").innerHTML += "<p>Connected</p>";
  } else {
    document.getElementById("response").innerHTML += "<p>Disconnected</p>";
  }
}

// function onNativeMessage(message) {
//   appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
// }

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() {
  const hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>");
  port = chrome.runtime.connectNative(hostName);
  // port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

document.addEventListener("DOMContentLoaded", function () {
  connect();
});
