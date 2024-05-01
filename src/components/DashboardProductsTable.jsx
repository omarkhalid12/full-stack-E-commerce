import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import TableSkeleton from './TableSkeleton';
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from '../app/services/products';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import CustomAlertDialog from '../shared/AlertDialog';
import { useEffect, useState } from 'react';

const DashboardProductsTable = () => {
  const [clickedProductId, setClickedProductId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isLoading, isError, data} = useGetDashboardProductsQuery({ page: 1});
  const [destroyProduct, {isLoading: isDestroying, isSuccess}] = useDeleteDashboardProductsMutation();
  console.log(isError)
  
  useEffect(() => {
    if(isSuccess) {
      setClickedProductId(null)
      onClose()
    } 
  }, [isSuccess, onClose])
  
  if(isLoading) return <TableSkeleton />

  return (
    <>
      <TableContainer maxW={"85%"} mx={"auto"}>
      <Table variant='simple'>
        <TableCaption>Total Entries: {data?.data?.length ?? 0}</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Thumbnail</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data?.data?.map(product => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>{product?.attributes?.category?.data?.attributes?.title}</Td>
                <Td>
                  <Image 
                    borderRadius='full'
                    objectFit={"cover"}
                    boxSize="40px"
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`}
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td isNumeric>${product?.attributes?.price}</Td>
                <Td isNumeric>{product?.attributes?.stock}</Td>
                <Td>
                  <Button 
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme='purple'
                    variant="solid"
                    mr={3}
                    onClick={()=> {}}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button colorScheme='red' variant='solid' mr={3} 
                  onClick={() => {
                    setClickedProductId(product.id)
                    onOpen()
                  }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button colorScheme='blue' variant='solid' onClick={() => {}}>
                    <FiEdit2 size={17} />
                  </Button>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
        <Tfoot>
          <Tr>
          <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Thumbnail</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Tfoot>
      </Table>
      </TableContainer>
      <CustomAlertDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} 
      isLoading={isDestroying}
      title={"Delete Product?"} 
      okTxt={"Destroy"}
      onOkHandler={() => destroyProduct(clickedProductId)}
      description={"Are you really want to destroy this product? This product cannot be undone."} />
    </>
  )
}

export default DashboardProductsTable