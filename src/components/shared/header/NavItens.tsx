import React, { ReactElement, ReactNode } from "react";
import { Flex, Icon, Link, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";
import NextLink from "next/link";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  role: string;
  link?: string;
}

export const NavItem = ({
  icon,
  children,
  link,
  role,
  ...rest
}: NavItemProps) => {
  return (
    <NextLink href={`/${role}/${link}`}>
      <Flex
        as={Link}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "telegram.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};
