import { Stack, Text, Flex } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";

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
      <Stack direction={["column"]} spacing="1rem" align="stretch">
        <Text>Título: {projeto?.title}</Text>
        <Text>Descrição: {projeto?.description}</Text>
      </Stack>
    </>
  );
}
