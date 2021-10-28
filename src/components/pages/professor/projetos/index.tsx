import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { ListarProjetos } from "./ListarProjetos";

export function ProjetosPage() {
  return (
    <>
      <BoxShadown>
        <Heading ml="7" size="lg">
          {" "}
          Listagem de Projetos:
        </Heading>
        <Flex p={3}>
          <ListarProjetos />
        </Flex>
      </BoxShadown>
    </>
  );
}
