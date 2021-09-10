import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { CadastroProposta } from "./CadastroProposta";
import { ListarProposta } from "./ListarProposta";

export function PropostasPage() {
  return (
    <>
      <Heading size="lg"> Cadastro de Propostas:</Heading>
      <Flex p={3} mb={6}>
        <CadastroProposta />
      </Flex>

      <Heading size="lg"> Listagem de Propostas:</Heading>
      <Flex p={3}>
        <ListarProposta />
      </Flex>
    </>
  );
}
