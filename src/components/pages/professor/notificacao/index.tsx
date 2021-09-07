import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { CadastroNotifi } from "./CadastroNotifi";

export function NotificacaoPage() {
  return (
    <>
      <Heading size="lg"> Cadastro de Notificação:</Heading>
      <Flex p={3} mb={6}>
        <CadastroNotifi />
      </Flex>

      <Heading size="lg"> Listagem de Curso:</Heading>
      <Flex p={3}></Flex>
    </>
  );
}
