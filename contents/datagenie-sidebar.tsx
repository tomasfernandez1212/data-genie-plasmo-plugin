import chatKitStyles from "data-text:@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type { PlasmoGetStyle } from "plasmo"
 
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import iconBase64 from "data-base64:~assets/icon.png"
import sidebarStyle from "data-text:~/contents/datagenie-sidebar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
}

// // Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = chatKitStyles + sidebarStyle
  return style
}

export const getShadowHostId = () => "plasmo-datagenie-sidebar"

const DataGenieSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("plasmo-datagenie-sidebar-show", isOpen)
  }, [isOpen])

  return (
    <div>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "🟡 Close" : "🟣 Open"}
      </button>
      <div id="sidebar" className={isOpen ? "open" : "closed"}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                  direction: "incoming",
                  position: "normal",
                }}
              />
            </MessageList>
            <MessageInput id="message-input" placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default DataGenieSidebar
