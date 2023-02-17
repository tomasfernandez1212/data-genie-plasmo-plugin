import type { PlasmoGetStyle } from "plasmo"
import type { PlasmoCSConfig } from "plasmo"

import { useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import bootstrapStyles from "data-text:bootstrap/dist/css/bootstrap.min.css";

// To override styles, need to use in plasmo config and get style
import modalContainerStyles from "data-text:./modal-container.css";

import ChatComponent from "../components/chat-component"
import chatKitStyles from "data-text:@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
)}

export default DataGenieModal
