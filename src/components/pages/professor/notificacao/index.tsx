import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { CadastroNotifi } from "./CadastroNotifi";
import { ListarNotifi } from "./ListarNotifi";

export function NotificacaoPage() {
  return (
    <>
      <Grid
        display={{ base: "block", lg: "grid" }}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2} mb={{ base: 5, lg: 0 }}>
          <BoxShadown>
            <Heading size="lg"> Cadastro de Notificação:</Heading>
            <Flex p={3} mb={6}>
              <CadastroNotifi />
            </Flex>
          </BoxShadown>
        </GridItem>

        <GridItem rowSpan={3} colSpan={4}>
          <Box>
            <BoxShadown>
              <Heading size="lg"> Listagem de Notificação:</Heading>
              <Flex p={3}>
                <ListarNotifi />
              </Flex>
            </BoxShadown>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
