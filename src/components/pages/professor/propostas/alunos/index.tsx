import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { BoxShadown } from "components/shared/Box";
import { ListarPropostaAlunos } from "./ListarPropostaAlunos";

export function PropostasAlunoPage() {
  return (
    <>
    <BoxShadown>
      <Heading ml="7" size="lg"> Listagem de Propostas dos Alunos:</Heading>
      <Flex p={3}>
        <ListarPropostaAlunos />
      </Flex>
      </BoxShadown>
    </>
  );
}
