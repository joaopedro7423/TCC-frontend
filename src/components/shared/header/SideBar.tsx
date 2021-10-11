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

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user, token } = useContext(AuthContext);

  const [LinkItems, setLinkItems] = useState([] as INavigation[]);

  const [notifi, setNotifi] = useState<NotificationResponse[]>([]);

  type NotificationResponse = {
    id: string;
    description: string;
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
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        display="flex"
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
        <Spacer />
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          display={{ base: "flex", md: "none" }}
        >
          <CloseButton onClick={onClose} />
        </Flex>

        <Box py={8} flex="4">
          {LinkItems.map((link) => (
            <NextLink href={`/${user?.role}/${link.link}`}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            </NextLink>
          ))}
        </Box>
        <Spacer />

        <Box py={8} flex="4">
          {LinkItems.map((link) => (
            <NextLink href={`/${user?.role}/${link.link}`}>
              <NavItem key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            </NextLink>
          ))}
        </Box>

        {user?.role == "student" && <NotificationSpace />}
      </Box>
    </>
  );
};
