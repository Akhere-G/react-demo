import { useState } from "react";

export default function useNotification() {
  const [notification, setNotification] = useState(null);

  const addNotification = (text, variant, duration = 3000) => {
    setNotification({ text, variant });

    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  // Return the data object and the function
  return { notification, addNotification };
}