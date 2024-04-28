import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onCloseCartDrawerAction, selectGlobal } from "../app/features/globalSlice"
import CartDrawerItem from "./CartDrawerItem"
import { selectCart } from "../app/features/cartSlice"

const CartDrawer = () => {
  const dispatch = useDispatch()
  const btnRef = useRef()
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);


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
            {
              cartProducts.map(item => (
                <CartDrawerItem key={item.id} {...item} />
              ))
            }
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