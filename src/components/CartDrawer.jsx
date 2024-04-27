import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onCloseCartDrawerAction, selectGlobal } from "../app/features/globalSlice"

const CartDrawer = () => {
  const dispatch = useDispatch()
  const btnRef = useRef()
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const onClose = () => dispatch(onCloseCartDrawerAction())
  
  return (
    <Drawer
        isOpen= {isOpenCartDrawer}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' colorScheme="red" mr={3} onClick={() => {}}>
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default CartDrawer