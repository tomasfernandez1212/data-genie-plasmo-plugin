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
import { getAllCellsData, CellDataInterface } from "../services/parse-notebook"

export const initMessagesList: MessageModel[] = [
  {
    message: "Hello there! How can I help you?",
    sentTime: "just now",
    sender: "Data Genie",
    direction: "incoming",
    position: "single",
  }
]

type ChatComponentProps = {
  messages: MessageModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>;
  setParsedNotebook: React.Dispatch<React.SetStateAction<CellDataInterface[]>>;
};

export const ChatComponent = ({ messages, setMessages, setParsedNotebook }: ChatComponentProps) => {
  
  const [isTyping, setIsTyping] = useState(true)
  
  const handleUserMessageSend = (message: string) => {

    // Add the user message to the messages list
    setMessages([...messages, {
      message: message,
      sentTime: "just now",
      sender: "User",
      direction: "outgoing",
      position: "single",
    }])

    // Set the typing indicator to true
    setIsTyping(true)

    // Get the data from the notebook
    setParsedNotebook(getAllCellsData())
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

