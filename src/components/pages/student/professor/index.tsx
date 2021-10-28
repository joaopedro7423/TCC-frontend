import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { ListarPropostaProfessor } from "./ListarPropostaProfessor";

export function PropostasProfessorPage() {
  return (
    <>
      <BoxShadown>
        <Heading ml={7} size="lg"> Listagem de Propostas dos Professores:</Heading>
        <Flex p={3}>
          <ListarPropostaProfessor />
        </Flex>
      </BoxShadown>
    </>
  );
}
