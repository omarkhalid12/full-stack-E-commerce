import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react"
import axios from "axios"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import ProductSkeleton from "../components/ProductCardSkeleton"
import { useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  }

  const {data, isLoading} = useQuery(["products", id], getProductList);
  const goBack = () => navigate(-1);

  useEffect(() => {
    document.title = `Products ${data?.data?.attributes?.title} Page`
  }, []);

  if(isLoading) return(
    <Box my={20} mx={"auto"} maxW={"sm"}>
      <ProductSkeleton />
    </Box>
  ) 
  return (
    <>
      <Flex
        alignItems={"center"}
        maxW="sm"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card maxW="sm" mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          <Image 
            src={`${import.meta.env.VITE_SERVER_URL}
            ${data?.data?.attributes?.thumbnail?.data?.attributes?.url}`}
            alt={data?.data?.attributes?.title}
            borderRadius={"lg"}
            h={"200px"}
            w={"full"}
            // fallbackSrc={imgFalBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size={"md"} textAlign={"center"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>{data?.data?.attributes?.description}</Text>
            <Text textAlign={"center"} color={"blue.100"} fontSize="2xl">
              {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text textAlign={"center"} color={"blue.300"} fontSize="2xl">
              {data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button 
            variant="solid"
            colorScheme="purple"
            onClick={() => {}}
            w={"full"}
            size={"lg"}
            p={8}
            textTransform={"uppercase"}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent"
            }}
          >
            Add Product
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default ProductPage