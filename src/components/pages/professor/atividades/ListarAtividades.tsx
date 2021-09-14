import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import DeletAtividade from "./DeletAtividade";
import EditarAtividade from "./EditarAtividade";

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
        console.log(id_project)
      const response = await api.get<AtividadesResponse[]>(`/activities/listbyproject/${id_project}`, {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setAtivi(response.data);
      ////console.log(response);
    }
    GetAtividade();
  }, []);

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome:</Th>
            <Th>Status:</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {atividade.map((item, index) => (
            <Tr key={index}>
              <Td>{item.title}</Td>

              <Td>{item.status}</Td>

              <Td>
                <EditarAtividade
                  id={item.id}
                  title={item.title}
                  description={item.description}
                />
                <DeletAtividade id={item.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
