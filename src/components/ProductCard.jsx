import { Button, Card, CardBody, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const ProductCard = ({ attributes, id }) => {
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #2d3748"} bg={"none"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.small?.url}
          alt='Green double couch with wooden legs'
          borderRadius="full"
          boxSize={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt='6' spacing='3' >
          <Heading size={"md"} mb={2} textAlign={"center"}>
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
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

ProductCard.propTypes = {
  attributes: PropTypes.bool.isRequired,
  id: PropTypes.bool.isRequired,
};

export default ProductCard