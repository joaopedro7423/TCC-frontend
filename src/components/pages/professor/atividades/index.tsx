import { Heading, Text, Grid, GridItem, Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { InformacoesProjeto } from "../projetos/InformacoesProjeto";
import { CadastroAtividade } from "./CadastroAtividade";
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
        gap={5}
      >
        <GridItem colSpan={3} mb={{ base: 5, lg: 0 }} rowSpan={1}>
          <BoxShadown h="100%">
            <Heading ml="7" size="lg">
              {" "}
              Informações do projeto:
            </Heading>

            <Flex>
              <InformacoesProjeto id_project={id_project} />
            </Flex>
          </BoxShadown>
        </GridItem>

        <GridItem colSpan={3} mb={{ base: 5, lg: 0 }} rowSpan={1}>
          <BoxShadown h="100%">
            <Heading ml="7" size="lg">
              {" "}
              Cadastro de Atividade:
            </Heading>
            <Flex>
              <CadastroAtividade id_project={id_project} />
            </Flex>
          </BoxShadown>
        </GridItem>

        <GridItem mb={{ base: 5, lg: 0 }} rowSpan={6} colSpan={6}>
          <BoxShadown>
            <Heading ml="7" size="lg">
              {" "}
              Listagem de Atividades:
            </Heading>
            <Flex mb={6} p={3}>
              <ListarAtividades id_project={id_project} />
            </Flex>
          </BoxShadown>
        </GridItem>
      </Grid>
    </>
  );
}
