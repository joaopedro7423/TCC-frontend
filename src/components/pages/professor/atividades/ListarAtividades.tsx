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

      //console.log(response);
    }
    GetAtividade();
  }, []);


  function FormatStatusName(status: any) {
    switch (status) {
      case "NEW":
        return "Novo";
      case "CANCELED":
        return "Cancelado";

      case "FINISHED":
        return "Finalizado";
      case "PAUSE":
        return "Parado";
      case "IN_PROGRESS":
        return "Em Progresso";
      default:
        return "Status não encontrado";
    }
  }

  return (
    <>
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>Nome:</Th>
            <Th>
              {" "}
              <Flex justifyContent="center">Status:</Flex>
            </Th>
            <Th>
              <Flex justifyContent="flex-end">Editar/Excluir</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {atividade.map((item, index) => (
            <Tr key={index}>
              <Td>{item.title}</Td>

              <Td>
                <Flex justifyContent="center">{FormatStatusName(item.status)}</Flex>
              </Td>

              <Td>
                <Flex justifyContent="flex-end">
                  <EditarAtividade
                    id={item.id}
                    title={item.title}
                    description={item.description}
                  />
                  <DeletAtividade id={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
