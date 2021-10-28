import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface ContentProps extends BoxProps {
  children: ReactNode;
}

export function BoxShadown({ children, ...rest }: ContentProps) {
  return (
    <>
      <Box
        {...rest}
        p={3}
        backgroundColor="white"
        borderRadius={15}
        boxShadow="lg"
      >
        {children}
      </Box>
    </>
  );
}
