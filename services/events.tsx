
// Create click event 
const clickEvent = new MouseEvent('click', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 1,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    shiftKey: false,
    view: window
});
  
  // Create a double click event
const doubleClickEvent = new MouseEvent('dblclick', {
    view: window,
    bubbles: true,
    cancelable: true
});
  
  // Create a type event
const enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13
});

// Create Focus eventbubbles
const focusEvent = new FocusEvent('focus', {
    bubbles: false,
    cancelable: false,
    composed: false,
    }
);    

// Create Pointer Down event
const pointerDownEvent = new PointerEvent('pointerdown', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 0,
    isPrimary: true,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    pointerId: 1,
})

// Create Mouse Down event
const mouseDownEvent = new MouseEvent('mousedown', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 1,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    shiftKey: false
})

// Create Pointer Over event
const pointerOverEvent = new PointerEvent('pointerover', {
    altKey: false,
    bubbles: true,
    button: -1,
    buttons: 1,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 0,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    pointerId: 1,
    shiftKey: false
})

// Create Mouse Over event
const mouseOverEvent = new MouseEvent('mouseover', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 0,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    shiftKey: false
})

// Create Pointer Up event
const pointerUpEvent = new PointerEvent('pointerup', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 0,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    pointerId: 1,
    shiftKey: false
})

// Create Mouse Up event
const mouseUpEvent = new MouseEvent('mouseup', {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelable: true,
    composed: true,
    ctrlKey: false,
    detail: 1,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    shiftKey: false
})

// Create Keyboard Event
const keydownEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    altKey: false,
    cancelable: true,
    charCode: 0,
    code: 'KeyA',
    composed: true,
    ctrlKey: false,
    isComposing: false,
    key: 'a',
    keyCode: 65,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 65
});

// Create Key Up Event
const keyupEvent = new KeyboardEvent('keyup', {
    bubbles: true,
    altKey: false,
    cancelable: true,
    charCode: 0,
    code: 'KeyA',
    composed: true,
    ctrlKey: false,
    isComposing: false,
    key: 'a',
    keyCode: 65,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 65
});

// Create Key Press Event
const keypressEvent = new KeyboardEvent('keypress', {
    altKey: false,
    bubbles: true,
    cancelable: true,
    charCode: 97,
    code: 'KeyA',
    composed: true,
    ctrlKey: false,
    isComposing: false,
    key: 'a',
    keyCode: 97,
    location: 0,
    metaKey: false,
    repeat: false,
    shiftKey: false,
    which: 97
});

// Create Text Input Event
const textInputEvent = new InputEvent('textInput', {
    bubbles: true,
    cancelable: true,
    composed: true,
    data: 'a',
});

// Creeate Input Event
const inputEvent = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
    composed: true,
    data: 'a',
});
    


export function dispatchEvent(element: any, eventType: string): boolean {

    const eventMappings = {
        "click": clickEvent,
        "doubleClick": doubleClickEvent,
        "enter": enterEvent,
        "focus": focusEvent,
        "keydown": keydownEvent,
        "keyup": keyupEvent,
        "keypress": keypressEvent,
        "textInput": textInputEvent,
        "input": inputEvent,
        "pointerDown": pointerDownEvent,
        "mouseDown": mouseDownEvent,
        "pointerOver": pointerOverEvent,
        "mouseOver": mouseOverEvent,
        "pointerUp": pointerUpEvent,
        "mouseUp": mouseUpEvent
    }

    // Get right event (Assume click event)
    var event: MouseEvent | KeyboardEvent | FocusEvent | PointerEvent | MouseEvent = clickEvent

    if (eventType in eventMappings) {
        event = eventMappings[eventType]
    }
    else {
        console.log("Event type not found: ", eventType)
        return false
    }

    console.log("Dispatching event: ", eventType, " on element: ", element)
    const eventResult = element.dispatchEvent(event)

    return eventResult
}

function getFreshCodeMirrorLine(cell: any): any {
    return cell.getElementsByClassName("CodeMirror-line")[0]
}

function getFreshTextArea(cell: any): any {
    return cell.getElementsByTagName("textarea")[0]
}

function sendKeys(cell: any): boolean {

    dispatchEvent(getFreshTextArea(cell), "keydown")
    dispatchEvent(getFreshTextArea(cell), "keypress")
    dispatchEvent(getFreshTextArea(cell), "textInput")
    dispatchEvent(getFreshTextArea(cell), "input")

    return true
}


export function codeCellEdit(cell: any): boolean {

    console.log("Editing cell: ", cell)

    dispatchEvent(window, "focus")

    const textarea = cell.getElementsByTagName("textarea")[0]
    textarea.focus()
    textarea.click()

    // dispatchEvent(getFreshCodeMirrorLine(cell), "pointerDown")
    // dispatchEvent(getFreshCodeMirrorLine(cell), "mouseDown")

    // dispatchEvent(getFreshCodeMirrorLine(cell), "pointerOver")
    // dispatchEvent(getFreshCodeMirrorLine(cell), "mouseOver")

    // dispatchEvent(getFreshCodeMirrorLine(cell), "pointerUp")
    // dispatchEvent(getFreshCodeMirrorLine(cell), "mouseUp")

    // sendKeys(cell)

    return true
}

export function githubInput(): boolean {

    dispatchEvent(window, "focus")
    
    const element = document.getElementById("new_comment_field")
    element.focus()
    element.click()
    // dispatchEvent(element, "pointerDown")
    // dispatchEvent(element, "mouseDown")
    // dispatchEvent(element, "focus")
    // dispatchEvent(element, "pointerUp")
    // dispatchEvent(element, "mouseUp")
    // dispatchEvent(element, "click")

    (element as any).value = "Hello World"

    return true
}

