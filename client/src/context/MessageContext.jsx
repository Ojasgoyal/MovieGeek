import { createContext, useContext, useState, useEffect } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true); // Show the message
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide the message after 5 seconds
        setMessage(null); // Clear the message
        setType("success");
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage, type, setType,showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);