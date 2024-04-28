import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import PropTypes from 'prop-types';
import { BsTrash } from "react-icons/bs";
import { removeFromCart } from "../app/features/cartSlice";


const CartDrawerItem = ({id, attributes: { thumbnail, title, price }, quantity}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.data.attributes.url}`}
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded="full"
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Flex >
            <Text fontSize={"sm"}>{title}</Text>
            <Text fontSize={"sm"} ml={3}>Price: ${price}</Text>
          </Flex>
          
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button leftIcon={<BsTrash />} variant="outline" 
            colorScheme="red" size="md" w="full" 
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>

      <Divider />
    </>
  )
}

CartDrawerItem.propTypes = {
  id: PropTypes.number.isRequired,
  attributes: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

export default CartDrawerItem