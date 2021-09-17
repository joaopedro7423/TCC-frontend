import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";
import { AuthContext } from "context/auth";
import NextLink from "next/link";
import { admNavigation } from "navigation/adm";
import { professorNavigation } from "navigation/professor";
import { INavigation } from "navigation/INavigation";
import { studentNavigation } from "navigation/student";
import { NavItem } from "./NavItens";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useContext(AuthContext);

  const [LinkItems, setLinkItems] = useState([] as INavigation[]);

  useEffect(() => {
    //console.log(user)

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
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NextLink href={`/${user.role}/${link.link}`}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </NextLink>
      ))}
    </Box>
  );
};
