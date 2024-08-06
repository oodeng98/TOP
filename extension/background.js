let port = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'startCapture') {
    chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], sender.tab, function (streamId) {
      sendResponse({ streamId: streamId });
    });
    return true; // Will respond asynchronously.
  }
});

function connect() {
  const hostName = "com.google.chrome.example.echo";
  console.log("Connecting to native messaging host " + hostName);
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}

function onNativeMessage(message) {
  console.log("최상단 프로그램: " + message["info"]);
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

function logTabUrl(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log("URL: ", changeInfo.url);
  }
}

chrome.tabs.onUpdated.addListener(logTabUrl);

chrome.runtime.onStartup.addListener(connect);
chrome.runtime.onInstalled.addListener(connect);
