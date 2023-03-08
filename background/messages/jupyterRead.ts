import type { PlasmoMessaging } from "@plasmohq/messaging"
import { getCurrentTabId, executeScriptInMainWorld } from "~background/utils/mainWorld"
 
export type readRequestBody = {}
 
export type readResponseBody = {
  success: boolean
  notebookJSON: object
}


const handleReadRequest = (body) => {

  // Get the Jupyter object 
  const Jupyter = (window as any).Jupyter;

  // Parse the notebook
  const notebookJSON = Jupyter.notebook.toJSON()

  return notebookJSON
  
}


const handler: PlasmoMessaging.MessageHandler<readRequestBody, readResponseBody> = async (req, res) => {

  // Get the current tab id
  const tabId = await getCurrentTabId()

  // Execute the script in the main world
  const scriptResult = await executeScriptInMainWorld(tabId, handleReadRequest, [req.body])
  console.log("scriptResult", scriptResult)
 
  // Send back to the content script
  res.send({success: true, notebookJSON: scriptResult})
}
 
export default handler