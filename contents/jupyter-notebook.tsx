// Plasmo Imports
import type { PlasmoCSConfig } from "plasmo"

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
  world: "MAIN"
}

// Empty component - leave as is or else causes problems with background port scripts. 
export default function JupyterNotebook() {

    return
}