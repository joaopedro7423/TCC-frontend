import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { CadastroCampus } from "./CadastroCampus";
import { ListarCampus } from "./ListarCampus";

export function CampusPage() {
  return (
    <>
      <Heading size="lg"> Cadastro de Campus:</Heading>
      <Flex p={3} mb={6}>
        <CadastroCampus />
      </Flex>
      <Heading size="lg"> Listagem de Campus:</Heading>

      <Flex p={3}>
        <ListarCampus />
      </Flex>
    </>
  );
}
