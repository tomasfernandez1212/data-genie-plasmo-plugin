// Plasmo Imports
import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"

// React Imports
import { useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bootstrapStyles from "data-text:bootstrap/dist/css/bootstrap.min.css";

// Modal Styling Imports
import modalContainerStyles from "data-text:./modal-container.css";

// Chat Component Imports
import { ChatComponent, initMessagesList } from "../components/chat-component"
import type { MessageModel } from "@chatscope/chat-ui-kit-react";

// Match any URL that ends with ipynb
export const config: PlasmoCSConfig = {
  matches: ["*://*/*.ipynb"],
  css: ["modal-container.css"]
}

// Inject into the ShadowDOM
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = bootstrapStyles + modalContainerStyles 
  return style
}

const DataGenieModal = () => {

  // Define the state for the modal
  const [modalShow, setModalShow] = useState(false);
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<MessageModel[]>(initMessagesList);
  const [parsedNotebook, setParsedNotebook] = useState<[]>([])

  return (
    <>
      <Button id="datagenie-modal-button" variant="primary" onClick={() => setModalShow(!modalShow)}>
        {modalShow ? "Close" : "Open"}
      </Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter" animation={false}
      dialogClassName="datagenie-modal">
        <ChatComponent isTyping={isTyping} setIsTyping={setIsTyping} messages={messages} setMessages={setMessages} />
      </Modal>
    </>
)}

export default DataGenieModal