import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";


const ChatComponent = () => {
  return (
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
        <MessageInput placeholder="Type message here" sendButton={true} autoFocus={true} onKeyDown={(event) => event.stopPropagation()}/>
      </ChatContainer>
    </MainContainer>
  );
}

export default ChatComponent;