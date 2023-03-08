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

import { sendToBackground } from "@plasmohq/messaging"
import type { readRequestBody, readResponseBody } from "~background/messages/jupyterRead"
import type { writeRequestBody, writeResponseBody } from "~background/messages/jupyterWrite"


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


const cleanUserInput = (input: string) => {

  // HTML Entities
  var cleanInput = input.replace(/&nbsp;|&#160;/gi, "")

  return cleanInput
}


type ChatComponentProps = {
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  messages: MessageModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>;
};

export const ChatComponent = ({ isTyping, setIsTyping, messages, setMessages }: ChatComponentProps) => {

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

      // Send to background to update the notebook
      const writeResults = sendToBackground<writeRequestBody, writeResponseBody>({
        name: "jupyterWrite",
        body: {
          instructions: responseJson.instructions
        }
      })
      console.log("writeResults", writeResults)

    })

  }
  
  const handleUserMessageSend = async (message: string) => {

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
    const readResponseBody = await sendToBackground<readRequestBody, readResponseBody>({
      name: "jupyterRead",
      body: {}
    })
    console.log("notebookJSON", readResponseBody.notebookJSON)

    const body = JSON.stringify({
      pastMessages: messages,
      latestMessage: latestMessage,
      notebookJSON: readResponseBody.notebookJSON
    })

    console.log("body", body)

    // Request the data genie backend to respond
    // fetch("http://localhost:8050/", {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: body
    // })
    //   .then(response => handleBackendResponse(response))

    const mockResponse = new Response(JSON.stringify({
      "natural_language_response": "I have updated the cells with index 0 and 1.",
      "instructions": []
    }), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    });

    handleBackendResponse(mockResponse)

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

