import {
  MainContainer,
  ConversationHeader,
  ChatContainer,
  MessageList,
  TypingIndicator,
  Message,
  Avatar,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import dataGenieThumbnail from "../assets/datagenie-thumbnail.png"

const ChatComponent = () => {
  return (
    <MainContainer responsive={true}> 
      <ChatContainer>
        <ConversationHeader>
              <Avatar src={dataGenieThumbnail} name="Data Genie" />
              <ConversationHeader.Content>
                <span >Data Genie</span>
              </ConversationHeader.Content>
          </ConversationHeader>
        <MessageList typingIndicator={<TypingIndicator content="Eliot is typing" />}>
          <Message
            model={{
              message: "Customer service: Hello there! How can I help you?",
              sentTime: "just now",
              sender: "Joe",
              direction: "incoming",
              position: "single",
            }}
          />
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
        <MessageInput placeholder="Type message here" attachButton={false} sendButton={true} autoFocus={true} onKeyDown={(event) => event.stopPropagation()}/>
      </ChatContainer>
    </MainContainer>
  );
}

export default ChatComponent;