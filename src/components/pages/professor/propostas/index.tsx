import { Heading, Text, Grid, GridItem } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { CadastroProposta } from "./CadastroProposta";
import { ListarProposta } from "./ListarProposta";

export function PropostasPage() {
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
            <Heading ml="7" size="lg">
              {" "}
              Cadastro de Propostas:
            </Heading>
            <Flex p={3} mb={6}>
              <CadastroProposta />
            </Flex>
          </BoxShadown>
        </GridItem>
        <GridItem rowSpan={3} colSpan={4}>
          <BoxShadown>
            <Heading ml="7" size="lg"> Listagem de Propostas:</Heading>
            <Flex p={3}>
              <ListarProposta />
            </Flex>
          </BoxShadown>
        </GridItem>
      </Grid>
    </>
  );
}
