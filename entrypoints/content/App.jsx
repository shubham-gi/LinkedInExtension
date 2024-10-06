import React, { useEffect, useRef } from "react";
import Modal from "./components/Modal";

const App = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  useEffect(() => {
    function insertButton() {
      
      document.addEventListener("focusin", (event) => {
        const target = event.target;

        // Check if the focus is inside the LinkedIn message box
        if (target.classList.contains("msg-form__contenteditable")) {
          const messageBox = document.querySelector(
            ".msg-form__contenteditable"
          );

          console.log("Message Box Found or Focussed");

          // Check if the button already exists to avoid multiple insertions
          if (messageBox && !document.getElementById("customButton")) {
            console.log("BUTTON INSERTED");
            // Create the button
            const button = document.createElement("button");
            button.id = "customButton"; // Add an ID to prevent duplicates
            button.innerText = "Open Modal";
            button.style.position = "absolute";
            button.style.bottom = "10px";
            button.style.right = "10px";
            button.style.zIndex = "1000"; // Ensure it's on top
            button.style.padding = "10px";
            button.style.backgroundColor = "#0073b1"; // LinkedIn blue
            button.style.color = "#fff";
            button.style.border = "none";
            button.style.cursor = "pointer";

            // Append the button to the message box
            messageBox.appendChild(button);

            // Add click event listener to open modal when button is clicked
            button.addEventListener("click", (e) => {
              e.preventDefault();
              console.log("Modal Opened");
              setisModalOpen(true);
            });
          }
        }
      });
    }
    insertButton();
  }, []);
  return (
    <>
      {isModalOpen && (
        <Modal setisModalOpen={setisModalOpen} isModalOpen={isModalOpen} />
      )}
    </>
  );
};
export default App;
