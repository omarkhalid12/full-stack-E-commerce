import { useToast } from "@chakra-ui/react"
import { Children, useEffect, useRef, useState } from "react"

const InternetConnectionProvider = () => {
  const toast = useToast();
  const toastIdRef = useRef();
  const [isOnline, setIsOnline] = useState(true);

  function close() {
    toast.closeAll(toastIdRef.current)
  }

  useEffect(() => {
    setIsOnline(navigator.onLine)
  }, []);

  window.addEventListener("online", e => {
    setIsOnline(true)
  });

  window.addEventListener("offline", e => {
    setIsOnline(false)
    close()
  });

  if(!isOnline) {
    return <>{ children }</>
  }

  return { children };
}

export default InternetConnectionProvider