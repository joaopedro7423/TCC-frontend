import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import {  ListarPropostaAlunos } from "./ListarPropostaAlunos";

export function PropostasAlunoPage() {
  return (
    <>
      {/* <Heading size="lg"> Cadastro de Propostas:</Heading>
      <Flex p={3} mb={6}>
        <CadastroProposta />
      </Flex> */}

      <Heading size="lg"> Listagem de Propostas dos Alunos:</Heading>
      <Flex p={3}>
        <ListarPropostaAlunos />
      </Flex>
    </>
  );
}
