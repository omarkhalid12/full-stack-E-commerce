import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import axios from "axios"
import { useQuery } from "react-query"

const ProductsPage = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail,category`
    );
    return data;
  }

  const {data, isLoading, error} = useQuery('products', () => getProductList())
  console.log(error);
  if(isLoading) return <h2>Loading ....</h2>
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