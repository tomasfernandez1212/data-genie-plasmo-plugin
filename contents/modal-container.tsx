import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"

import { useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bootstrapStyles from "data-text:bootstrap/dist/css/bootstrap.min.css";

// To override styles, need to use in plasmo config and get style
import modalContainerStyles from "data-text:./modal-container.css";

import ChatComponent from "../components/chat-component"

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
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button id="datagenie-modal-button" variant="primary" onClick={() => setModalShow(!modalShow)}>
        {modalShow ? "Close" : "Open"}
      </Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter" animation={false}
      dialogClassName="datagenie-modal">
        <ChatComponent />
      </Modal>
    </>
)}

export default DataGenieModal
