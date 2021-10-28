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
  const [statusName, setStatusName] = useState("");

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

  useEffect(() => {
    atividade.map((atividade) => {
      FormatStatusName(atividade.status);
    });
  }, []);

  function FormatStatusName(status: any) {
    switch (status) {
      case "NEW":
        setStatusName("Novo");
        break;
      case "CANCELED":
        setStatusName("Cancelado");
        break;
      case "FINISHED":
        setStatusName("Finalizado");
        break;
      case "PAUSE":
        setStatusName("Parado");
        break;
      case "IN_PROGRESS":
        setStatusName("Em Progresso");
        break;
      default:
        setStatusName("Status não encontrado");
        break;
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
                <Flex justifyContent="center">{statusName}</Flex>
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
