
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { getCurrentTabId, executeScriptInMainWorld } from "~background/utils/mainWorld"
 
export type addInstruction = {
  cell_content: string
  cell_position: number
}

export type updateInstruction = {
  cell_id: string
  cell_content: string
}

export type deleteInstruction = {
  cell_id: string
}

export type writeRequestBody = {
  instructions: Array<addInstruction | updateInstruction | deleteInstruction>
}
 
export type writeResponseBody = {
  success: boolean
}


const handleWriteRequest = (write_instructions) => {

    const Jupyter = (window as any).Jupyter;

    // const cells = Jupyter.notebook.get_cells()
    // // Loop through the cells and update the content
    // for (let i = 0; i < cells.length; i++) {
    //     const cell = cells[i];
    //     cell.fromJSON(updated_notebook.cells[i])
    // }

    return "Write request completed."

}


const handler: PlasmoMessaging.MessageHandler<writeRequestBody, writeResponseBody> = async (req, res) => {

  // Get the current tab id
  const tabId = await getCurrentTabId()

  // Execute the script in the main world
  const scriptResult = await executeScriptInMainWorld(tabId, handleWriteRequest, [req.body])
  console.log("scriptResult", scriptResult)
 
  // Send back to the content script
  res.send({success: true})
}
 
export default handler