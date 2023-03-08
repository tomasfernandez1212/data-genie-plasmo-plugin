import type { PlasmoMessaging } from "@plasmohq/messaging"
 
export type readRequestBody = {
  id: number
}
 
export type readResponseBody = {
  message: object
}


function getCurrentTabId() {
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

const handleReadRequest = (body) => {

  console.log("Inside handleReadRequest", body)

  const Jupyter = (window as any).Jupyter;
  const notebookJSON = Jupyter.notebook.toJSON()

  return notebookJSON
  
}

 
const handler: PlasmoMessaging.MessageHandler<
  readRequestBody,
  readResponseBody
> = async (req, res) => {
  console.log(req.body.id)

  const tabId = await getCurrentTabId()
  const scriptResult = await chrome.scripting.executeScript(
          {
              target: {tabId},
              world: "MAIN", // MAIN in order to access the window object
              func: handleReadRequest,
              args : [req.body] // Note that only serializable objects can be passed as arguments
          })
  console.log("Script Result", scriptResult)

  console.log("After execute script")
 
  res.send({
    message: scriptResult
  })
}
 
export default handler