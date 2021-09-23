import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { ListarPropostaAlunos } from "./ListarPropostaAlunos";

export function PropostasAlunoPage() {
  return (
    <>
      <Heading size="lg"> Listagem de Propostas dos Alunos:</Heading>
      <Flex p={3}>
        <ListarPropostaAlunos />
      </Flex>
    </>
  );
}
