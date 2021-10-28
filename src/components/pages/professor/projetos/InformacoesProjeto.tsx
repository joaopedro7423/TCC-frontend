import { Stack, Text, Flex, VStack, Spacer } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import DeletProjeto from "./DeletProjeto";

type ProjectProps = {
  id_project: string;
};

interface ProjetoResponse {
  id: string;
  title: string;
  description: string;
}

export function InformacoesProjeto({ id_project }: ProjectProps) {
  const [projeto, setProjeto] = useState<ProjetoResponse>();
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetProjeto() {
      //   console.log(id_project)
      const response = await api.get<ProjetoResponse>(
        `/projects/${id_project}`,
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );

      setProjeto(response.data);
      ////console.log(response);
    }
    GetProjeto();
  }, []);

  return (
    <>
      <VStack px={7} mt={5} spacing={5} align="stretch" w="100%">
        <Text>Título: {projeto?.title}</Text>
        <Text>Descrição: {projeto?.description}</Text>
        <Spacer />
        <DeletProjeto id={id_project} />
      </VStack>
    </>
  );
}
