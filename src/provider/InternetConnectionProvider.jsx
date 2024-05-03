import { useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { BsWifiOff } from "react-icons/bs";

const InternetConnectionProvider = ({ children }) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const [isOnline, setIsOnline] = useState(true);

  function close() {
    toast.closeAll(toastIdRef.current)
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You'r offline.",
      description: "Please make sure you have internet connectivity.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />
    })
  }

  useEffect(() => {
    window.addEventListener("online", e => {
      setIsOnline(true);
      close();
    });
  
    window.addEventListener("offline", e => {
      setIsOnline(false);
    });

    return () => {
      // ** CleanUp function to useEffect .. 
      window.removeEventListener()
    }
  }, []);

  if(!isOnline) {
    return <>{ children } {addToast()}</>
  }

  return children;
}

export default InternetConnectionProvider