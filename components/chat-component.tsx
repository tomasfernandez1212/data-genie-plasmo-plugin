import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const ChatComponent = () => {
  return (
    <MainContainer style={{fontSize: "1.2em"}}>
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