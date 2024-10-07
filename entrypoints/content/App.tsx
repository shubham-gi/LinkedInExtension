import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { insertButton } from "./utils/utilities";

const App: React.FC = () => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleFocus = () => {
      insertButton({ isModalOpen, setisModalOpen });
    }
    handleFocus();
    return () => {
      document.removeEventListener("focusin", handleFocus);
      
    };
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
