import "../styles/Modal.css";
import { useState, useEffect, useRef } from "react";
import rArrow from '../assests/rightArrow.svg';
import dArrow from '../assests/downArrow.svg'
import regenerateIcon from '../assests/regenerateIcon.svg';

interface ModalProps {
  isModalOpen: boolean;
  setisModalOpen: (isOpen: boolean) => void;
}

interface Message {
  message: string;
  type: "prompt" | "generated";
}

function Modal({ isModalOpen, setisModalOpen }: ModalProps) {


  const [isChatModeOn, setisChatModeOn] = useState<boolean>(false);
  const [messages, setmessages] = useState<Message[]>([]);
  const [prompt, setprompt] = useState<string>("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shadowRoot = document.querySelector("linkedin-extension")?.shadowRoot ;
    const handleClickOutsideModal = (event: MouseEvent) => {
      const modal = document.querySelector("linkedin-extension")?.shadowRoot?.querySelector('.modalChild') as HTMLDivElement;
      console.log(modal,event.target);
      event.stopPropagation();
      // const modal = document.querySelector(".modalChild") as HTMLDivElement;
      if(event?.target?.className=="customButton"){
        return;
      }
      if (modal && !modal.contains(event.target as Node)) {
        if (isModalOpen) {
          setisModalOpen(false);
        }
      }
    };

    if (isModalOpen) {
      shadowRoot.addEventListener("click", handleClickOutsideModal);
    } else {
      shadowRoot.removeEventListener("click", handleClickOutsideModal);
    }

    return () => {
      shadowRoot.removeEventListener("click", handleClickOutsideModal);
    };
  }, [isModalOpen, setisModalOpen]);

  const handleGenerate = () => {
    if (isChatModeOn) {
      console.log("Regenerate Clicked");
      return;
    }
    if (prompt) {
      const newMessage: Message = {
        message: prompt,
        type: "prompt",
      };
      setisChatModeOn(true);
      setmessages([
        ...messages,
        newMessage,
        {
          message:
            "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
          type: "generated",
        },
      ]);
      setprompt("");
    }
  };

  const handleInsert = () => {
    setisModalOpen(false);

    const replyText =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

    const messageElement = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLDivElement | null;

    if (messageElement) {
      const paragraph = document.createElement("p");
      paragraph.textContent = replyText;
      messageElement.textContent = "";
      messageElement.appendChild(paragraph);

      const label = document.querySelector(".msg-form__placeholder") as HTMLDivElement | null;
      if (label) {
        label.removeAttribute("data-placeholder");
      }
    }
  };

  return (
    <div className="App">
      <div className="modalPrompt">
        <div className="modalChild modalChild1" ref={modalRef}>
          {isChatModeOn ? (
            <div className="messages">
              {messages.map((msg, index) => (
                <div className={msg.type} key={index}>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
          ) : null}
          <input
            type="text"
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
                <img src={dArrow} alt="down arrow" className="rArrow" /> Insert
              </button>
            ) : null}
            {isChatModeOn ? (
              <button id="generateBtn" onClick={handleGenerate}>
                <img src={regenerateIcon} alt="regenerate icon" className="rArrow" /> Regenerate
              </button>
            ) : (
              <button id="generateBtn" onClick={handleGenerate}>
                <img src={rArrow} alt="right arrow" className="rArrow" /> Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
