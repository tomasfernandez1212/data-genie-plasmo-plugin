

export function getCurrentTabId() {
    return new Promise<number>((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        if (!tab) {
          reject(new Error("No active tab found"));
          return;
        }
        const tabId = tab.id;
        resolve(tabId);
      });
    });
}

export const executeScriptInMainWorld = async (tabId, func, args) => {
    const scriptResult = await chrome.scripting.executeScript(
      {
          target: {tabId},
          world: "MAIN", // MAIN in order to access the window object
          func: func,
          args : args // Note that only serializable objects can be passed as arguments
      })
    return scriptResult
}