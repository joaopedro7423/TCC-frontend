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
} from "@chakra-ui/react";
import { api } from "services/api";
import { AuthContext } from "context/auth";
import { admNavigation } from "navigation/adm";
import { professorNavigation } from "navigation/professor";
import { INavigation } from "navigation/INavigation";
import { studentNavigation } from "navigation/student";
import { NavItem } from "./NavItens";
import NotificationsCard from "./NotificationsCard";

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
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          display={{ base: "flex", md: "none" }}
        >
          <CloseButton onClick={onClose} />
        </Flex>

        <Box pb={12} flex="4">
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

        {user?.role == "student" && (
          <Flex
            flex="1"
            flexDir="column"
            alignItems="center"
            borderRadius={12}
            p={3}
            bg="gray.100"
            h="69%"
          >
            <Text
              mb={3}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="md"
            >
              Notificações:
            </Text>

            <VStack overflow="scroll" overflowX="hidden" spacing={5}>
              {notifi.map((item, index) => (
                <NotificationsCard
                  key={index}
                  id={item.id}
                  description={item.description}
                />
              ))}
            </VStack>
          </Flex>
        )}
      </Box>
    </>
  );
};
