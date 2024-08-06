let port = null;

function connect() {
  const hostName = "com.google.chrome.example.echo";
  console.log("Connecting to native messaging host " + hostName);
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}

function onNativeMessage(message) {
  console.log("최상단 프로그램: " + message["info"]);
  if (message["info"] == "chrome.exe") {
    logActiveTabUrl();
  }
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

function logActiveTabUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      let activeTab = tabs[0];
      console.log("URL: ", activeTab.url);
    }
  });
}

chrome.runtime.onStartup.addListener(connect);
chrome.runtime.onInstalled.addListener(connect);
