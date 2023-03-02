import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react"
import { useEffect, useState } from "react"

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"

import dataGenieThumbnail from "url:../assets/datagenie-thumbnail.png"

// Services Imports
import { getAllCells, getAllCellsData } from "../services/parse-notebook"

export const initMessagesList: MessageModel[] = [
  {
    message: "Hello there! How can I help you?",
    sentTime: "just now",
    sender: "Data Genie",
    direction: "incoming",
    position: "single"
  }
]

const cleanUserInput = (input: string) => {
  // HTML Entities
  var cleanInput = input.replace(/&nbsp;|&#160;/gi, "")

  return cleanInput
}

type ChatComponentProps = {
  isTyping: boolean
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
  messages: MessageModel[]
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>
}

export const ChatComponent = ({
  isTyping,
  setIsTyping,
  messages,
  setMessages
}: ChatComponentProps) => {
  // const dispatchKeyEvent = (el, char__) => {
  //   // KEYDOWN
  //   el.dispatchEvent(
  //     new KeyboardEvent("keydown", {
  //       altKey: false,
  //       bubbles: true,
  //       cancelable: true,
  //       charCode: 0,
  //       code: "KeyJ",
  //       key: "j",
  //       keyCode: 74,
  //       shiftKey: false
  //     })
  //   )

  //   // el.dispatchEvent(
  //   //   new TextEvent("textInput", {
  //   //     bubbles: true,
  //   //     cancelable: false,
  //   //     data: "j"
  //   //   })
  //   // );

  //   // KEYPRESS
  //   el.dispatchEvent(
  //     new KeyboardEvent("keypress", {
  //       altKey: false,
  //       bubbles: true,
  //       cancelable: true,
  //       charCode: 106,
  //       code: "KeyJ",
  //       key: "j",
  //       keyCode: 106,
  //       shiftKey: false
  //     })
  //   )

  //   var textEvent = document.createEvent("TextEvent")
  //   textEvent.initTextEvent("textInput", true, true, null, "j", 9, "en-US")

  //   el.dispatchEvent(textEvent)

  //   // var TextEvent = document.createEvent('TextEvent');
  //   // TextEvent.initEvent(
  //   //   'textInput',
  //   //   true,
  //   //   true,
  //   //   null,
  //   //   char__,
  //   // );
  //   el.dispatchEvent(
  //     new Event("input", {
  //       bubbles: true,
  //       cancelable: false,
  //       data: "j",
  //       inputType: "insertText"
  //     })
  //   )
  //   // KEY UP
  //   el.dispatchEvent(
  //     new KeyboardEvent("keyup", {
  //       altKey: false,
  //       bubbles: true,
  //       cancelable: true,
  //       charCode: 0,
  //       code: "KeyJ",
  //       key: "j",
  //       keyCode: 74,
  //       shiftKey: false
  //     })
  //   )
  // }

  useEffect(() => {
    const hiddenElm = document.querySelector(".CodeMirror div textarea") as HTMLTextAreaElement;
    console.log('mirror line', hiddenElm)

    hiddenElm.addEventListener("keydown", (e) => {
      console.log(hiddenElm.value)
    })

    hiddenElm.addEventListener("change", (e) => {
      hiddenElm.value = '';
      console.log(hiddenElm.value)
    })
  }, [])

  useEffect(() => {
    // setTimeout(() => {
    //   const inputElm = document.querySelector(".CodeMirror")
    //   inputElm.dispatchEvent(
    //     new KeyboardEvent("keydown", {
    //       key: "e",
    //       keyCode: 69,
    //       code: "KeyE",
    //       which: 69,
    //       shiftKey: false,
    //       ctrlKey: false,
    //       metaKey: false
    //     })
    //   ) 
    // }, 5000)

    setTimeout(() => {
      // const inputElm = document.querySelector('.CodeMirror');
      // dispatchKeyEvent(inputElm, 's');
      // const preElm = document.querySelector(".CodeMirror-code pre")
      // preElm.innerHTML = "hello world"

      var el = document.querySelector(
        ".CodeMirror textarea"
      ) as HTMLTextAreaElement
      var text = "print("
      el.value = text
      // var evt = document.createEvent("Events")
      // evt.initEvent("change", true, true)
      // el.dispatchEvent(evt)

      const codeMirror = document.querySelector('.CodeMirror');
      console.log('code mirror', codeMirror)
    }, 5000)

    // setTimeout(() => {
    //   var el = document.querySelector(
    //     ".CodeMirror textarea"
    //   ) as HTMLTextAreaElement
    //   var text = "new text"
    //   el.value = text
    //   var evt = document.createEvent("Events")
    //   evt.initEvent("change", true, true)
    //   el.dispatchEvent(evt)
    // }, 5000)
  }, [])

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

        // Update the cell - TODO: Write cellUpdated string into the cellIndex cell
        console.log("Updating cell")
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
        position: "single"
      }
      setMessages((prevMessages) => [...prevMessages, latestMessage])

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
      position: "single"
    }
    setMessages((prevMessages) => [...prevMessages, latestMessage])

    // Set the typing indicator to true
    setIsTyping(true)

    // Get the data from the notebook
    const parsedNotebook = getAllCellsData()

    const body = JSON.stringify({
      pastMessages: messages,
      latestMessage: latestMessage,
      parsedNotebook: parsedNotebook
    })

    // Request the data genie backend to respond
    // fetch("http://localhost:8050/", {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: body
    // })
    //   .then(response => handleBackendResponse(response))

    const mockResponse = new Response(
      JSON.stringify({
        natural_language_response:
          "I have updated the cells with index 0 and 1.",
        instructions: [
          {
            action: "update",
            cell_index: 0,
            updated_cell: "# After the assistant modifies the notebook:"
          },
          {
            action: "update",
            cell_index: 1,
            updated_cell: 'print("Hello World")'
          }
        ]
      }),
      {
        status: 200,
        headers: { "Content-type": "application/json" }
      }
    )

    handleBackendResponse(mockResponse)
  }

  return (
    <MainContainer responsive={true}>
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={dataGenieThumbnail} name="Data Genie" />
          <ConversationHeader.Content>
            <span>Data Genie</span>
          </ConversationHeader.Content>
        </ConversationHeader>
        <MessageList
          typingIndicator={
            isTyping ? <TypingIndicator content="Data Genie is typing" /> : null
          }>
          {messages.map((message, index) => (
            <Message key={index} model={message} />
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          attachButton={false}
          sendButton={true}
          autoFocus={true}
          onKeyDown={(event) => event.stopPropagation()}
          onSend={handleUserMessageSend}
        />
      </ChatContainer>
    </MainContainer>
  )
}
