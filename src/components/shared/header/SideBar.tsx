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
  Grid,
  GridItem,
  useBreakpointValue,
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

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user, token, signOut } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [LinkItems, setLinkItems] = useState([] as INavigation[]);

  const [notifi, setNotifi] = useState<NotificationResponse[]>([]);

  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

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
  }, []);

  return (
    <Grid
      templateColumns="1fr"
      templateRows={{ base: "1fr 1fr 1fr 1fr 1fr", md: "2fr 3fr 3fr 2fr" }}
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="2px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="100%"
      {...rest}
    >
      <GridItem pt={6} textAlign="center">
        <Text fontWeight="bold">{user?.course.name} </Text>
        <Text fontWeight="bold">{user?.course.campus.name}</Text>
        <Text>Nome: {user?.name}</Text>
        <Text>Cargo: {cargo}</Text>
        <Divider pt={6} />
      </GridItem>

      {!isWideVersion && (
        <GridItem alignItems="center" mx="8" justifyContent="space-between">
          <CloseButton onClick={onClose} />
        </GridItem>
      )}

      <GridItem >
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
      </GridItem>

      <GridItem >
        {user?.role == "student" && <NotificationSpace />}
      </GridItem>

      <GridItem  pb={3}>
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
      </GridItem>
    </Grid>
  );
};
