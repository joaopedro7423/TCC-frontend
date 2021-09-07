import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { CadastroNotifi } from "./CadastroNotifi";
import { ListarNotifi } from "./ListarNotifi";

export function NotificacaoPage() {
  return (
    <>
      <Heading size="lg"> Cadastro de Notificação:</Heading>
      <Flex p={3} mb={6}>
        <CadastroNotifi />
      </Flex>

      <Heading size="lg"> Listagem de Notificação:</Heading>
      <Flex p={3}>
        <ListarNotifi />
      </Flex>
    </>
  );
}
