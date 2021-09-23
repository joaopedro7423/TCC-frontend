import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ListarPropostaProfessor } from "./ListarPropostaProfessor";

export function PropostasProfessorPage() {
  return (
    <>
      <Heading size="lg"> Listagem de Propostas dos Professores:</Heading>
      <Flex p={3}>
        <ListarPropostaProfessor />
      </Flex>
    </>
  );
}
