
import { useState, useEffect, useRef } from "react";
import rArrow from '../assests/rightArrow.svg';
import dArrow from '../assests/downArrow.svg'
import regenerateIcon from '../assests/regenerateIcon.svg';
import { removeButton } from "../utils/utilities";
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
    const shadowRoot = document.querySelector("linkedin-extension")?.shadowRoot as unknown as EventTarget;;
    const handleClickOutsideModal = (ev: Event) => {
      const event = ev as MouseEvent;
      const modal = document.querySelector("linkedin-extension")?.shadowRoot?.querySelector('.modalChild') as HTMLDivElement;
      console.log(modal, event.target);
      const target = event.target as HTMLElement;
      event.stopPropagation();
      if (target.className == "customButton") {
        return;
      }
      if (modal && !modal.contains(event.target as Node)) {
        if (isModalOpen) {
          setisModalOpen(false);
          removeButton();

        }
      }
    };

    if (isModalOpen) {
      shadowRoot?.addEventListener("click", handleClickOutsideModal);
    } else {
      shadowRoot?.removeEventListener("click", handleClickOutsideModal);
    }

    return () => {
      shadowRoot?.removeEventListener("click", handleClickOutsideModal);
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
      //We have to call the API here and the corresponding response will be added to the messages array
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
      messageElement.focus();
      const label = document.querySelector(".msg-form__placeholder") as HTMLDivElement | null;
      if (label) {
        label.removeAttribute("data-placeholder");
      }
      // removeButton();
    }
  };

  return (
    <div className="App " >
      <div className="modalPrompt flex flex-col justify-center items-center fixed top-0 left-0 w-[100%] h-[100%] bg-[#00000044] z-50">
        <div className="modalChild flex flex-col justify-center items-center w-[400px] rounded-[10px] p-[14px] max-w-[600px] bg-[#F9FAFB]" ref={modalRef}>
          {isChatModeOn ? (
            <div className="w-[100%]">
              {messages.map((msg, index) => (

                <div className={`${msg.type == "generated" ? " flex justify-start" : " flex justify-end"} w-[100%]`} key={index}>
                  <p className={`${msg.type == "generated" ? "bg-[#DBEAFE]  text-[#666D80] " : "bg-[#DFE1E7] text-[#666D80] "} p-[10px] max-w-[320px] rounded-[10px] my-[10px] `}>{msg.message}</p>
                </div>
              ))}
            </div>
          ) : null}
          <input
            type="text"
            placeholder="Your Prompt"
            className="py-[6px] px-[13px] bg-[#F9FAFB] border-[1px] border-solid border-[#C1C7D0] rounded-[8px] w-[100%] mt-[5px] text-[14px] font-normal transition duration-500 outline-none text-[#666D80]"

            value={prompt}
            onChange={(e) => setprompt(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                handleGenerate();
              }
            }}
          />
          <div className="flex justify-end items-center w-[100%] mt-[20px] gap-[20px]">
            {isChatModeOn ? (
              <button
                className="flex justify-center items-center border-[1.3px] border-solid border-[#666D80] bg-[#F9FAFB] gap-[5px] rounded-[6px] py-[6px] px-[13px] text-[#666D80] cursor-pointer text-[15px] hover:bg-[#f3f2f2]"
                onClick={handleInsert}>
                <img src={dArrow} alt="down arrow" className="h-[14px] w-[14px]" /> Insert
              </button>
            ) : null}
            {isChatModeOn ? (
              <button
                className="flex justify-center items-center border-[0px] border-solid  bg-[#3B82F6] gap-[5px] rounded-[6px] py-[6px] px-[13px] text-white cursor-pointer text-[15px] bold hover:bg-[#4a8dfa]"
                onClick={handleGenerate}>
                <img src={regenerateIcon} alt="regenerate icon" className="h-[16px] w-[16px]" /> Regenerate
              </button>

            ) : (
              <button
                className="flex justify-center items-center border-[0px] border-solid  bg-[#3B82F6] gap-[5px] rounded-[6px] py-[6px] px-[13px] text-white cursor-pointer text-[15px] bold hover:bg-[#4a8dfa]"
                onClick={handleGenerate}>
                <img src={rArrow} alt="right arrow" className="h-[14px] w-[14px]" /> Generate
              </button>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
