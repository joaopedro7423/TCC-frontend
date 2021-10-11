import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Text,
  Center,
  VStack,
  Heading,
  Divider,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { api } from "services/api";
import { AuthContext } from "context/auth";
import NextLink from "next/link";
import { admNavigation } from "navigation/adm";
import { professorNavigation } from "navigation/professor";
import { INavigation } from "navigation/INavigation";
import { studentNavigation } from "navigation/student";
import { NavItem } from "./NavItens";
import NotificationSpace from "./NotificationSpace";
import { VscSettingsGear } from "react-icons/vsc";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user, token, signOut } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [LinkItems, setLinkItems] = useState([] as INavigation[]);

  const [notifi, setNotifi] = useState<NotificationResponse[]>([]);

  const toast = useToast();

  type NotificationResponse = {
    id: string;
    description: string;
  };
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

  useEffect(() => {
    //console.log(user)

    async function GetPropos() {
      const response = await api.get<NotificationResponse[]>("/notifications", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setNotifi(response.data);
      //console.log(response);
    }
    GetPropos();

    switch (user.role) {
      case "professor":
        setLinkItems(professorNavigation);
        break;
      case "student":
        setLinkItems(studentNavigation);
        break;
      case "adm":
        setLinkItems(admNavigation);
        break;
    }
  }, []);

  return (
    <>
      <Flex
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="2px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        flexDir="column"
        justifyContent="space-between"
        h="100vh"
        {...rest}
      >
        <Box py={6} fontWeight="bold">
          <Center>
            <Text>{user?.course.name} </Text>
          </Center>
          <Center>
            <Text>{user?.course.campus.name}</Text>
          </Center>
        </Box>
        <Divider />

        <Flex
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          display={{ base: "flex", md: "none" }}
        >
          <CloseButton onClick={onClose} />
        </Flex>

        <Box py={8}>
          {LinkItems.map((link) => (
            <NextLink href={`/${user?.role}/${link.link}`}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            </NextLink>
          ))}
        </Box>

        <Spacer />

        <Box pb={3}>
          <Box pb={3}>
            <NextLink href={`/usuario`}>
              <NavItem icon={VscSettingsGear}>Editar Conta</NavItem>
            </NextLink>
          </Box>
          <Button
            px={4}
            onClick={handleLogout}
            type="submit"
            w="100%"
            colorScheme="red"
            isLoading={loading}
          >
            Sair
          </Button>
        </Box>

        {/* {user?.role == "student" && <NotificationSpace />} */}
      </Flex>
    </>
  );
};
