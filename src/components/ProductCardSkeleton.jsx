import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"

const ProductSkeleton = () => {
  return (
    <Box bg={"gray.700"} p={5} rounded={""} >
      <Skeleton height={"200px"} />
      <SkeletonText mt='4' maxW={"200px"} noOfLines={1} spacing="4" mx={"auto"} />
      <SkeletonText mt='4' w={20} noOfLines={3} spacing="4" />
      <SkeletonText mt='4' w={20} noOfLines={1} spacing="4" maxW={"120px"} mx={"auto"} />
      <Skeleton mt='4' height="50px" rounded={"lg"} w={"full"} spacing="4" />
    </Box>
  );
};

export default ProductSkeleton;