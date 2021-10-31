import { Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { InformacoesProjeto } from "../projetos/InformacoesProjeto";
import { ListarAtividades } from "./ListarAtividades";

type ProjectProps = {
  id_project: string;
};

export function AtividadesPage({ id_project }: ProjectProps) {
  return (
    <>
      <Grid
        display={{ base: "block", lg: "grid" }}
        templateRows="repeat(3, auto)"
        templateColumns="repeat(6, auto)"
        gap={4}
      >
        <GridItem colSpan={2} mb={{ base: 5, lg: 0 }}>
          <BoxShadown>
            <Heading ml={7} size="lg">
              {" "}
              Informações do projeto:
            </Heading>
            <Flex p={3} mb={6}>
              <InformacoesProjeto id_project={id_project} />
            </Flex>
          </BoxShadown>
        </GridItem>

        <GridItem colSpan={3} mb={{ base: 5, lg: 0 }} rowSpan={3}>
          <BoxShadown>
            <Heading ml={7} size="lg">
              {" "}
              Listagem de Atividades:
            </Heading>
            <Flex p={7}>
              <ListarAtividades id_project={id_project} />
            </Flex>
          </BoxShadown>
        </GridItem>
      </Grid>
    </>
  );
}
