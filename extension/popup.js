let message;
let port = null;

function appendMessage(text) {
  document.getElementById("response").innerHTML += "<p>" + text + "</p>";
}

function updateUiState() { // 3
  if (port) {
    document.getElementById("response").innerHTML += "<p>Connected</p>";
  } else {
    document.getElementById("response").innerHTML += "<p>Disconnected</p>";
  }
}

function onDisconnected() { // 4
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() { // 2
  const hostName = "com.google.chrome.example.echo";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>");
  port = chrome.runtime.connectNative(hostName);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

document.addEventListener("DOMContentLoaded", function () { // 1
  connect();
});
