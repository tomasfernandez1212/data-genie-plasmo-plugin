import iconBase64 from "data-base64:~assets/icon.png"
import cssText from "data-text:~/contents/datagenie-sidebar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

// Inject to the webpage itself
import "./datagenie-sidebar-base.css"

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
}

// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "plasmo-datagenie-sidebar"

const DataGenieSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("plasmo-datagenie-sidebar-show", isOpen)
  }, [isOpen])

  return (
    <div id="sidebar" className={isOpen ? "open" : "closed"}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "🟡 Close" : "🟣 Open"}
      </button>
      <img src={iconBase64} alt="Extension Icon" width={128} height={128} />
      <p>Hello World</p>
    </div>
  )
}

export default DataGenieSidebar
