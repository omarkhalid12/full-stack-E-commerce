import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"
import { useQuery } from "react-query"
import ProductsSkeleton from "../components/ProductsCardSkeleton"

const ProductsPage = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail,category`
    );
    console.log(data)
    return data;
  }

  const {data, isLoading} = useQuery(["products"], getProductList)

  if(isLoading) return(
    <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {Array.from({length: 20 }, (_, index) => (
        <ProductsSkeleton key={index} />
      ))}
    </Grid>
  ) 
  return (
    <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {
        data.data.map(product => (
          <ProductCard key={product.id} {...product} />
        ))
      }
    </Grid>
  )
}

export default ProductsPage