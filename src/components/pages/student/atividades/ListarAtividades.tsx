import { SimpleGrid, Wrap, WrapItem, Grid } from "@chakra-ui/react";

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
      <Grid  w="100%" gap={4} templateColumns={{base:"1fr",md:"1fr 1fr", lg: "1fr 1fr", xl:"1fr 1fr 1fr" }}>
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
      </Grid>
    </>
  );
}
