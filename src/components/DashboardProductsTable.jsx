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
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from '@chakra-ui/react';
import TableSkeleton from './TableSkeleton';
import { useDeleteDashboardProductsMutation, useGetDashboardProductsQuery } from '../app/services/products';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import CustomAlertDialog from '../shared/AlertDialog';
import { useEffect, useState } from 'react';
import CustomModal from '../shared/Modal';

const DashboardProductsTable = () => {
  const [clickedProductId, setClickedProductId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const {isLoading, isError, data} = useGetDashboardProductsQuery({ page: 1});
  const [destroyProduct, {isLoading: isDestroying, isSuccess}] = useDeleteDashboardProductsMutation();
  console.log(isError)

  // ** Handler ...
  const onChangeHandler = (e) => {
    const {value, name} = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })
  }

  const onChangePriceHandler = value => {
    setProductToEdit({
      ...productToEdit,
      stock: +value
    })
  }

  const onChangeStockHandler = value => {
    setProductToEdit({
      ...productToEdit,
      price: +value
    })
  }
  
  useEffect(() => {
    if(isSuccess) {
      setClickedProductId(null)
      onClose()
    } 
  }, [isSuccess, onClose])
  
  if(isLoading) return <TableSkeleton />

  return (
    <>
      <TableContainer maxW={"85%"} mx={"auto"} my={5} py={3} border={"1px solid #2D3748"} rounded='md'>
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
                  <Button colorScheme='blue' variant='solid' onClick={() => {
                    setProductToEdit(product.attributes)
                    onModalOpen()
                    }}>
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
      console.log(productToEdit)
      <CustomAlertDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} 
        isLoading={isDestroying}
        title={"Delete Product?"} 
        okTxt={"Destroy"}
        onOkHandler={() => destroyProduct(clickedProductId)}
        description={"Are you really want to destroy this product? This product cannot be undone."}
      />
      <CustomModal 
        isOpen={isModalOpen} 
        onClose={onModalClose}
        title={"Update Product !"}
        okTxt='Update'
      >
        <FormControl>
          <FormLabel>Title :</FormLabel>
          <Input placeholder='Product Title' name='title' value={productToEdit?.title} onChange={onChangeHandler} />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Description :</FormLabel>
          <Textarea h="10" placeholder='Product Desc' name='description' value={productToEdit?.description} onChange={onChangeHandler} />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price :</FormLabel>
          <NumberInput name='price' defaultValue={productToEdit?.price} onChange={onChangePriceHandler} precision={2} step={0.2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock :</FormLabel>
          <NumberInput defaultValue={productToEdit?.stock} name='stock' precision={2} step={0.2} onChange={onChangeStockHandler}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail :</FormLabel>
            <Input 
              id='thumbnail' 
              type='file' h="full" p={2} 
              accept='image/png, image/jpeg, image/gif'
            />
        </FormControl>
      </CustomModal>
    </>
  )
}

export default DashboardProductsTable
