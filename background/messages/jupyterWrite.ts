
import type { PlasmoMessaging } from "@plasmohq/messaging"
 
export type writeRequestBody = {
  id: number
}
 
export type writeResponseBody = {
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

const handleWriteRequest = (write_instructions) => {

    const Jupyter = (window as any).Jupyter;

    console.log("Inside handleWriteRequest", write_instructions)
    // const cells = Jupyter.notebook.get_cells()
    // // Loop through the cells and update the content
    // for (let i = 0; i < cells.length; i++) {
    //     const cell = cells[i];
    //     cell.fromJSON(updated_notebook.cells[i])
    // }

    return "Write request completed."

}


const handler: PlasmoMessaging.MessageHandler<
    writeRequestBody,
    writeResponseBody
> = async (req, res) => {
  console.log(req.body.id)

  const tabId = await getCurrentTabId()
  const scriptResult = await chrome.scripting.executeScript(
          {
              target: {tabId},
              world: "MAIN", // MAIN in order to access the window object
              func: handleWriteRequest,
              args : [req.body] // Note that only serializable objects can be passed as arguments
          })
  console.log("Script Result", scriptResult)

  console.log("After execute script")
 
  res.send({
    message: scriptResult
  })
}
 
export default handler