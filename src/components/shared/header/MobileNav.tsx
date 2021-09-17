import React, { useContext, useState } from "react";
import {
  IconButton,
  Button,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "context/auth";
import NextLink from "next/link";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, signOut } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  const handleLogout = async () => {
    //console.log(values);

    try {
      await signOut();

      toast({
        title: "Sucesso",
        description: "Você agora está Deslogado.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Erro ao Deslogar a conta.",
        description: "Alguma coisa aconteceu.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
    [];
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>
                <Box display={{ md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <NextLink href="/usuario">
                <MenuItem>Editar</MenuItem>
              </NextLink>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>
                {" "}
                <Button
                  type="submit"
                  w="100%"
                  colorScheme="red"
                  isLoading={loading}
                >
                  Log Out
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
