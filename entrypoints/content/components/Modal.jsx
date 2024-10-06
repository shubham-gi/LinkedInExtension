import "../styles/Modal.css";
import { useState, useEffect } from "react";
import rArrow from "../assests/rightArrow.svg";
import dArrow from "../assests/downArrow.svg";
import regenerateIcon from "../assests/regenerateIcon.svg";
function Modal({ isModalOpen, setisModalOpen }) {
  const [insertPromt, setinsertPromt] = useState("");
  const [isChatModeOn, setisChatModeOn] = useState(false);
  const [messages, setmessages] = useState([]);
  const [prompt, setprompt] = useState("");
  const modalRef = useRef(null);
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (modalRef.current && !modalRef.current.contains(event.target)) {
  //         console.log("Modal CLosed")
  //         setisModalOpen(false); // Call the close function when clicking outside
  //       }
  //     };

  //     if (isModalOpen) {
  //       // Attach listener when modal is open
  //       document.addEventListener("mousedown", handleClickOutside);
  //     } else {
  //       // Clean up the listener when modal is closed
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     }

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  const handleGenerate = (e) => {
    console.log("handleGenerateClicked");
    if (isChatModeOn) {
      console.log("Regenerate Clicked");
      return;
    }
    if (prompt) {
      const msg = {
        message: prompt,
        type: "prompt",
      };
      // setmessages([...messages ,]);
      console.log(messages);
      setisChatModeOn(true);
      setmessages([
        ...messages,
        msg,
        {
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
          type: "generated",
        },
      ]);
      setinsertPromt(
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
      );
      setprompt("");
    }
  };
  const handleInsert = (e) => {
    console.log("handleInsertClicked");
    e.stopPropagation();
    console.log(messages);
    const messageBox = document.querySelector(".msg-form__contenteditable"); // LinkedIn message box
    if (messageBox) {
    messageBox.setAttribute("aria-label", null);
      
    const lastMessage = messages[messages.length - 1]; // Get the last message

      if (lastMessage && lastMessage.type === "generated") {
        // Insert the text as innerHTML, because it's a contenteditable div
        messageBox.innerHTML = lastMessage.message;
        console.log("Message inserted into LinkedIn message box!");
      } else {
        console.log("No generated message to insert.");
      }
      messageBox.focus(); // Focus on the message box
    } else {
      console.log("LinkedIn message box not found!");
    }
    setisModalOpen(false);
  };

  return (
    <div className="App">
      <div className="modalPrompt">
        <div className="modalChild" ref={modalRef}>
          {/* <button onClick={()=>{setisModalOpen(false)}}>close</button> */}
          {isChatModeOn ? (
            <div className="messages">
              {messages.map((msg, index) => {
                return (
                  <div className={`${msg.type}`} key={index}>
                    <p>{msg.message}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
          <input
            type="text"
            name=""
            placeholder="Your Prompt"
            id="inputPrompt"
            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                handleGenerate();
              }
            }}
          />
          <div className="btnParent">
            {isChatModeOn ? (
              <button id="insertBtn" onClick={handleInsert}>
                <img src={dArrow} alt="" className="rArrow" /> Insert
              </button>
            ) : null}
            {isChatModeOn ? (
              <button id="generateBtn" onClick={handleGenerate}>
                <img src={regenerateIcon} alt="" className="rArrow" />{" "}
                Regenerate
              </button>
            ) : (
              <button id="generateBtn" onClick={handleGenerate}>
                <img src={rArrow} alt="" className="rArrow" /> Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
