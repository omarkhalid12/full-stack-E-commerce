import { useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { BsWifiOff } from "react-icons/bs";
import PropTypes from 'prop-types';

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

  const setOnline = () => {
    setIsOnline(true);
    close();
  }

  const setOffline = () => {
    setIsOnline(false);
  }

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      // ** CleanUp function to useEffect .. 
      window.removeEventListener("online", setOnline)
      window.removeEventListener("offline", setOffline)
    }
  }, []);

  if(!isOnline) {
    return <>{ children } {addToast()}</>
  }

  return children;
}

InternetConnectionProvider.propTypes = {
  children: PropTypes.string.isRequired,
}
export default InternetConnectionProvider