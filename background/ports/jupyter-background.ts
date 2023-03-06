import type { PlasmoMessaging } from "@plasmohq/messaging"

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

const handleInstruction = (req, res) => {

    console.log("handleInstruction");
    console.log(req);
    console.log(res);

    const Jupyter = (window as any).Jupyter
    const instruction = req.body;

    if (instruction.action === "update"){

        // Get the cell
        const cell = Jupyter.notebook.get_cell(instruction.cell_index)

        // Modify the content of the cell
        cell.set_text(instruction.updated_cell);

        // Execute the cell - only if text_cell
        if (instruction.cell_type === "text_cell"){
            cell.execute();
        }
    }
}


const handler: PlasmoMessaging.PortHandler = async (req, res) => {

    console.log(req)
    res.send("Hello from port handler")

   

    getCurrentTabId().then((tabId) => {
        chrome.scripting.executeScript(
            {
                target: {tabId},
                world: "MAIN", // MAIN in order to access the window object
                func: handleInstruction,
                args : [req, res]
            },
            () => {
                console.log("Background script got callback after injection")
            }
        );
    }).catch((error) => {
        console.error(error);
    });

}
   
export default handler