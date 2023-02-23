import { useState } from "react"

import {
  MainContainer,
  ConversationHeader,
  ChatContainer,
  MessageList,
  TypingIndicator,
  Message,
  Avatar,
  MessageInput,
  MessageModel
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import dataGenieThumbnail from "url:../assets/datagenie-thumbnail.png"

// Services Imports
import { getAllCellsData, getAllCells } from "../services/parse-notebook"

export const initMessagesList: MessageModel[] = [
  {
    message: "Hello there! How can I help you?",
    sentTime: "just now",
    sender: "Data Genie",
    direction: "incoming",
    position: "single",
  }
]

document.addEventListener("keydown", (event: KeyboardEvent) => {
  console.log("keydown event", event);
});

document.addEventListener("click", (event: MouseEvent) => {
  console.log("click event", event);
});


const cleanUserInput = (input: string) => {

  // HTML Entities
  var cleanInput = input.replace(/&nbsp;|&#160;/gi, "")

  // // Prevent XSS (cross-site scripting) attack
  // cleanInput = cleanInput.replace(/<\/?[^>]+(>|$)/g, "")

  // // Prevent SQL injection attack
  // cleanInput = cleanInput.replace(/'/g, "''")

  // // Control Characters (such as carriage returns, line feeds, tabs, and form feeds)
  // cleanInput = cleanInput.replace(/[\n\r\t\f]/g, "")

  // // Unicode Characters
  // cleanInput = cleanInput.replace(/[^\x00-\x7F]/g, "")

  return cleanInput
}


type ChatComponentProps = {
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  messages: MessageModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>;
};

export const ChatComponent = ({ isTyping, setIsTyping, messages, setMessages }: ChatComponentProps) => {

  const handleBackendInstructions = (instructions: any) => {

    // If there are no instructions, return
    if (instructions.length === 0) {
      return
    }

    // If there are instructions, execute them
    instructions.forEach((instruction: any) => {
      if (instruction.action === "update") {
        const cellIndex = instruction.cell_index
        const cellUpdated = instruction.updated_cell

        // Get cells
        const cells = getAllCells()

        // // Single click the cell 
        const cell: any = cells[cellIndex]
        const clickCellEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0, // left mouse button
          detail: 1, // single click
        });
        cell.dispatchEvent(clickCellEvent);

        // Shortcut 'enter' to edit the cell
        const keydownEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          composed: true,
          cancelable: true,
          view: window,
          key: "Enter",
          code: "Enter",
          charCode: 0,
          keyCode: 13,
          shiftKey: false,
        });
        cell.focus();
        cell.dispatchEvent(keydownEvent);

        const textArea = document.activeElement as HTMLTextAreaElement

        // // Type the new cell content
        const inputString = "hello";
        for (let i = 0; i < inputString.length; i++) {

          const char = inputString.charAt(i);
          const charUpper = char.toUpperCase();

          console.log("char", char)
          console.log("charUpper", charUpper)
          

          const keyPressEvent = new KeyboardEvent("keydown", {
            altKey: false,
            bubbles: true,
            cancelable: true,
            charCode: 0,
            code: "KeyH", 
            composed: true,
            ctrlKey: false,
            key: "h",
            keyCode: 72,
            location: 0,
            metaKey: false,
            repeat: false,
            shiftKey: false,
            view: window,
            which: char.charCodeAt(0),
          });
          textArea.focus();
          textArea.dispatchEvent(keyPressEvent);

          console.log("keyPressEvent", char)

          const keyUpEvent = new KeyboardEvent("keyup", {
            altKey: false,
            bubbles: true,
            cancelable: true,
            charCode: 0,
            code: "KeyH", 
            composed: true,
            ctrlKey: false,
            key: "h",
            keyCode: 72,
            location: 0,
            metaKey: false,
            repeat: false,
            shiftKey: false,
            view: window,
            which: char.charCodeAt(0),
          });
          textArea.focus();
          textArea.dispatchEvent(keyUpEvent);
        }

      }
    })

  }


  const handleBackendResponse = (response: any) => {
    
    response.json().then((responseJson: any) => {
      
      console.log(responseJson)

      // Add the message to the messages list
      const latestMessage: MessageModel = {
          message: responseJson.natural_language_response,
          sentTime: "just now",
          sender: "Data Genie",
          direction: "incoming",
          position: "single",
      }
      setMessages(prevMessages => [...prevMessages, latestMessage])
  
      // Set the typing indicator to false
      setIsTyping(false)

      handleBackendInstructions(responseJson.instructions)

    })

  }
  
  const handleUserMessageSend = (message: string) => {

    const cleanMessage = cleanUserInput(message)

    // Add the user message to the messages list
    const latestMessage: MessageModel = {
        message: cleanMessage,
        sentTime: "just now",
        sender: "User",
        direction: "outgoing",
        position: "single",
    }
    setMessages(prevMessages => [...prevMessages, latestMessage])

    // Set the typing indicator to true
    setIsTyping(true)

    // Get the data from the notebook
    const parsedNotebook = getAllCellsData()

    const body = JSON.stringify({
      pastMessages: messages,
      latestMessage: latestMessage,
      parsedNotebook: parsedNotebook
    })

    console.log(parsedNotebook)

    // Request the data genie to respond
    fetch("http://localhost:8050/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body
    })
      .then(response => handleBackendResponse(response))
  }

  return (
    <MainContainer responsive={true}> 
      <ChatContainer>
        <ConversationHeader>
            <Avatar src={dataGenieThumbnail} name="Data Genie" />
            <ConversationHeader.Content>
              <span >Data Genie</span>
            </ConversationHeader.Content>
        </ConversationHeader>
        <MessageList typingIndicator={isTyping ? <TypingIndicator content="Data Genie is typing" /> : null}>
          {messages.map((message, index) => (
            <Message key={index} model={message} />
          ))}
        </MessageList>
        <MessageInput placeholder="Type message here" attachButton={false} 
        sendButton={true} autoFocus={true} onKeyDown={(event) => event.stopPropagation()}
        onSend={handleUserMessageSend}/>
      </ChatContainer>
    </MainContainer>
  );
}

