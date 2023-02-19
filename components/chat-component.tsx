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

import dataGenieThumbnail from "../assets/datagenie-thumbnail.png"

const ChatComponent = () => {
  
  const [isTyping, setIsTyping] = useState(true)
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hello there! How can I help you?",
      sentTime: "just now",
      sender: "Data Genie",
      direction: "incoming",
      position: "single",
    }
  ]);

  const handleUserMessageSend = (message: string) => {
    setMessages([...messages, {
      message: message,
      sentTime: "just now",
      sender: "User",
      direction: "outgoing",
      position: "single",
    }])
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
        onSend={(message) => handleUserMessageSend(message)}/>
      </ChatContainer>
    </MainContainer>
  );
}

export default ChatComponent;
