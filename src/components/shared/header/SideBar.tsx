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
  Divider,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { api } from "services/api";
import { AuthContext } from "context/auth";
import { admNavigation } from "navigation/adm";
import { professorNavigation } from "navigation/professor";
import { INavigation } from "navigation/INavigation";
import { studentNavigation } from "navigation/student";
import { NavItem } from "./NavItens";
import NotificationSpace from "./NotificationSpace";
import { VscSettingsGear } from "react-icons/vsc";
import NextLink from "next/link";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
let cargo: {} | null | undefined;
let curso: {} | null | undefined;
let campus: {} | null | undefined;
let nome: {} | null | undefined;

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
      if (user.role == "student") {
        const response = await api.get<NotificationResponse[]>(
          "/notifications",
          {
            headers: {
              authorization: `Bearear ${token}`,
            },
          }
        );

        setNotifi(response.data);
        //console.log(response);
      }
    }
    GetPropos();

    switch (user.role) {
      case "professor":
        setLinkItems(professorNavigation);
        cargo = "Professor";
        break;
      case "student":
        setLinkItems(studentNavigation);
        cargo = "Estudante";
        break;
      case "adm":
        setLinkItems(admNavigation);
        cargo = "Adiministrador";
        break;
    }
    curso = user.course.name;
    campus = user.course.campus.name;
    nome = user?.name;
  }, []);

  return (
    <>
      <VStack
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
        <VStack py={6}>
          <Text fontWeight="bold">{curso} </Text>
          <Text fontWeight="bold">{campus}</Text>
          <Text>Nome: {nome}</Text>
          <Text>Cargo: {cargo}</Text>
        </VStack>

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

        <Box>
          {LinkItems.map((link, index) => (
            <NavItem
              key={index}
              icon={link.icon}
              role={user?.role}
              link={link.link}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>
        {user?.role == "student" && <NotificationSpace />}
        <Spacer />

        <Box pb={3}>
          <Box pb={3}>
            <NextLink href={`/usuario`}>
              <NavItem
                icon={VscSettingsGear}
                //link={`/usuario`}
                role={`${user?.role}`}
              >
                Editar Conta
              </NavItem>
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
      </VStack>
    </>
  );
};
