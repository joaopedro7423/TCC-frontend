import { SimpleGrid } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import { CardAtividade } from "./CardAtividade";

type ProjectProps = {
  id_project: string;
};

type AtividadesResponse = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export function ListarAtividades({ id_project }: ProjectProps) {
  const [atividade, setAtivi] = useState<AtividadesResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetAtividade() {
      // console.log(id_project)
      const response = await api.get<AtividadesResponse[]>(
        `/activities/listbyproject/${id_project}`,
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );

      setAtivi(response.data);
      ////console.log(response);
    }
    GetAtividade();
  }, []);

  return (
    <>
      <SimpleGrid columns={[1, 2, 1, 3]}>
        {atividade.map(function (data) {
          const { id, title, description, status } = data;
          return (
            <CardAtividade
              key={id}
              id_atividade={id}
              title={title}
              description={description}
              status={status}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
}
