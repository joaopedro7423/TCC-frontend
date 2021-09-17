import React from "react";
import { Flex, Icon, Link, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
export const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link style={{ textDecoration: "none" }}>
      <Flex
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
    </Link>
  );
};
