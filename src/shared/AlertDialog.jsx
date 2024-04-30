import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
const CustomAlertDialog = ({
  isOpen, 
  onClose, 
  title, 
  description, 
  cancelTxt= "Cancel", 
  okTxt= "Ok",
  variant= "solid",
  onOkHandler
}) => {
  const cancelRef = useRef()

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogBody>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelTxt}
            </Button>
            <Button colorScheme='red' variant={variant} ml={3} onClick={onOkHandler}>
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

CustomAlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  title: PropTypes.bool.isRequired,
  description: PropTypes.bool.isRequired,
  cancelTxt: PropTypes.bool.isRequired,
  okTxt: PropTypes.bool.isRequired,
  variant: PropTypes.bool.isRequired,
  onOkHandler: PropTypes.bool.isRequired,
};
export default CustomAlertDialog;