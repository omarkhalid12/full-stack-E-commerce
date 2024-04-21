import { Grid } from "@chakra-ui/react"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import axios from "axios"

const ProductsPage = () => {
  const [productList, setProductList] = useState([])
  useEffect(() => {
    axios.get("http://localhost:1337/api/products")
    .then(res => setProductList(res.data.data))
    .catch(err => console.log(err))
  }, [])
  
  return (
    <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {
        productList.map(product => (
          <ProductCard key={product.id} {...product} />
        ))
      }
    </Grid>
  )
}

export default ProductsPage