// Plasmo Imports
import type { PlasmoCSConfig } from "plasmo"

// React Imports
import { useEffect, useState} from "react"

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
  world: "MAIN"
}

export default function JupyterNotebook() {

    const [modalShow, setModalShow] = useState(false);

    console.log("modalShow", modalShow)

    if (modalShow) {
        const Jupyter = (window as any).Jupyter
        console.log("Jupyter", Jupyter)
    }

    return
}