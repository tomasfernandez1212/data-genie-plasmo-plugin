import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import collapseWindowStyle from "data-text:~/contents/modal-container.css"

import chatKitStyles from "data-text:@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
}

// // Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = collapseWindowStyle + chatKitStyles
  return style
}

export const getShadowHostId = () => "plasmo-datagenie-sidebar"

const DataGenieSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("plasmo-datagenie-sidebar-show", isOpen)
  }, [isOpen])

  return (
    <div className="modalContainer">
      {isOpen && (
        <div className="modal">
          <MainContainer>
            <ChatContainer>
              <MessageList>
                <Message
                  model={{
                    message: "Customer service: Hello there! How can I help you?",
                    sentTime: "just now",
                    sender: "Joe",
                    direction: "incoming",
                    position: "single",
                  }}
                />
              </MessageList>
              <MessageInput placeholder="Type message here" onKeyDown={(event) => event.stopPropagation()}/>
            </ChatContainer>
          </MainContainer>
        </div>
      )}
      <button className="modalButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  )
}

export default DataGenieSidebar
