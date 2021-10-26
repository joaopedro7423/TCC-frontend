import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export function BoxShadown({ children }: { children: ReactNode }) {
  return (
    <>
      <Box p={3} backgroundColor="white" borderRadius={15} boxShadow="dark-lg">
        {children}
      </Box>
    </>
  );
}
