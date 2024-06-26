'use client'

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  Center,
  HStack,
  Link,
  Stack,
} from '@chakra-ui/react'
import { BsMoon, BsSun } from 'react-icons/bs'
import { Link as RouterLink } from 'react-router-dom'
import CookieService from '../services/CookieService'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from "../app/features/cartSlice";
import { onOpenCartDrawerAction } from '../app/features/globalSlice'

const Links = ['Products'];
const NavLink = ({ children }) => {
      <Link
        as={RouterLink}
        to={children.toLowerCase}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
        >
        {children}
      </Link>
}

export default function Navbar() {

  const dispatch = useDispatch();
  const { cartProducts } = useSelector(selectCart);
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieService.get("jwt");
  
  // ** Handler ..

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };
  
  const onOpen = () => dispatch(onOpenCartDrawerAction())

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <HStack spacing={8} alignItems={'center'}>
            <RouterLink to='/'>My App</RouterLink>
            <HStack as={"nav"} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <Link key={link}>{link}</Link>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <BsMoon /> : <BsSun />}
              </Button>
              <Button onClick= {onOpen}>Cart ({cartProducts.length})</Button>
              {
                token ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'2xl'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <HStack as={"nav"} spacing={4} display={{base: "none", md: "flex"}}>
                    <NavLink as={ RouterLink } to='/login'> 
                      Login 
                    </NavLink>
                  </HStack>
                )
              }
            </Stack>
          </Flex>

        </Flex>
      </Box>
    </>
  )
}
