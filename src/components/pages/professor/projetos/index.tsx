import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ListarProjetos } from "./ListarProjetos";

export function ProjetosPage() {
  return (
    <>
      <Heading size="lg"> Listagem de Projetos:</Heading>
      <Flex p={3}>
        <ListarProjetos />
      </Flex>
    </>
  );
}
