import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import collapseWindowStyle from "data-text:~/contents/floating-button.css"

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
}

// // Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = collapseWindowStyle
  return style
}

export const getShadowHostId = () => "plasmo-datagenie-sidebar"

const DataGenieSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("plasmo-datagenie-sidebar-show", isOpen)
  }, [isOpen])

  return (
    <div className="floatingButtonContainer">
      {isOpen && (
        <div className="floatingButtonCard">
          <p>Hello World</p>
        </div>
      )}
      <button className="floatingButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  )
}

export default DataGenieSidebar
