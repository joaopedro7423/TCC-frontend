import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { CadastroCursos } from "./CadastroCursos";
import { ListarCursos } from "./ListarCursos";

export function CursosPage() {
  return (
    <>
      <Heading size="lg"> Cadastro de Curso:</Heading>
      <Flex p={3} mb={6}>
        <CadastroCursos />
      </Flex>

      <Heading size="lg"> Listagem de Curso:</Heading>
      <Flex p={3}>
        <ListarCursos />
      </Flex>
    </>
  );
}
