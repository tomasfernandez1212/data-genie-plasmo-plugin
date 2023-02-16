import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import ChatComponent from "../components/chat-component"
import collapseWindowStyle from "data-text:~/contents/modal-container.css"
import chatKitStyles from "data-text:@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";


// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
}


// Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = collapseWindowStyle + chatKitStyles
  return style
}

const DataGenieModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modalContainer">
      {isOpen && (
        <div className="modal">
          <ChatComponent />
        </div>
      )}
      <button className="modalButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  )
}

export default DataGenieModal
