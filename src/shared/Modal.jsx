import { Modal, ModalCloseButton, ModalContent, ModalBody, ModalOverlay, ModalHeader, ModalFooter, Button } from "@chakra-ui/react"
import PropTypes from 'prop-types';

const CustomModal = ({ isOpen, onClose, title, onOkClick, okTxt= "Update", cancelTxt= "Cancel", children, isLoading }) => {
  return (
    <div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              {cancelTxt}
            </Button>
            <Button colorScheme='blue' onClick={onOkClick} isLoading={isLoading}>
              {okTxt}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

CustomModal.propTypes = {
  isOpen: PropTypes.string.isRequired,
  onClose: PropTypes.number.isRequired,
  title: PropTypes.number.isRequired,
  okTxt: PropTypes.number.isRequired,
  cancelTxt: PropTypes.number.isRequired,
  children: PropTypes.number.isRequired,
  onOkClick: PropTypes.number.isRequired,
  isLoading: PropTypes.number.isRequired,
};

export default CustomModal