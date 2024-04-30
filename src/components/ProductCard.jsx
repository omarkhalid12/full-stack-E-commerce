import { Button, Card, CardBody, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const ProductCard = ({ attributes, id }) => {
  ProductCard.propTypes = {
    attributes: PropTypes.bool.isRequired,
    id: PropTypes.bool.isRequired,
  };
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${attributes?.thumbnail?.data?.attributes?.url}`}
          alt='Green double couch with wooden legs'
          borderRadius="full"
          boxSize={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt='6' spacing='3' textAlign={"center"} >
          <Heading size={"md"} mb={2}>{attributes.title}</Heading>
          <Text fontSize={"sm"}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
          <Text fontSize="3xl" color='purple.600'>
            $450
          </Text>
          <Button
          as={Link}
          to={`/products/${id}`}
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          size={"xl"}
          variant={"outline"}
          py={5}
          border={"none"}
          overflow={"hidden"}
          w={"full"}
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
            color: colorMode === "light" ? "#e6f3fd" : "#9f7aea",
            border: "transparent"
          }}
          mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ProductCard