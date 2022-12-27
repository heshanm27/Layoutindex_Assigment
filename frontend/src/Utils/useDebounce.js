import { useState } from "react";

export default function useDebounce() {
  const [typingTimeOut, setTypeingTimeOut] = useState(null);

  function debounce(func, wait = 1000) {
    clearTimeout(typingTimeOut);
    const timeout = setTimeout(() => func(), wait);

    setTypeingTimeOut(timeout);
  }
  return debounce;
}
