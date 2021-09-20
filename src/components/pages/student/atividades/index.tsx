import { Heading, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { InformacoesProjeto } from "../projetos/InformacoesProjeto";
import { ListarAtividades } from "./ListarAtividades";

type ProjectProps = {
  id_project: string;
};

export function AtividadesPage({ id_project }: ProjectProps) {
  return (
    <>
      <Heading size="lg"> Informações do projeto:</Heading>
      <Flex p={3} mb={6}>
        <InformacoesProjeto id_project={id_project} />
      </Flex>


      <Heading size="lg"> Listagem de Atividades:</Heading>
      <Flex p={3}>
        <ListarAtividades id_project={id_project} />
      </Flex>
    </>
  );
}
