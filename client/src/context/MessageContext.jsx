import { createContext, useContext, useState, useEffect } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true); // Show the message
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide the message after 5 seconds
        setMessage(null); // Clear the message
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);