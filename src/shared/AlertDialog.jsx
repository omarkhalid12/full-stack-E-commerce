import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
const CustomAlertDialog = ({isOpen, onOpen, onClose}) => {
  const cancelRef = useRef()

  return (
    <>
      <Button onClick={onOpen}>Discard</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Product?</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this product? the product will be
            deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

CustomAlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
};
export default CustomAlertDialog;