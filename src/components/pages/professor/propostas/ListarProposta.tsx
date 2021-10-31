import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import EditarNotifi from "./EditarProposta";
import DeletNotifi from "./DeletProposta";
import EditarProposta from "./EditarProposta";
import DeletProposta from "./DeletProposta";

type PropostaResponse = {
  id: string;
  title: string;
  description: string;
};

export function ListarProposta() {
  const [notificacao, setPropos] = useState<PropostaResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetPropos() {
      const response = await api.get<PropostaResponse[]>("/proposals", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setPropos(response.data);
      //console.log(response);
    }
    GetPropos();
  }, [DeletNotifi, EditarNotifi]);

  return (
    <>
      <Table variant="unstyled" border="none">
        <Thead>
          <Tr>
            <Th>Título:</Th>
            <Th>
              {" "}
              <Flex justifyContent="flex-end">Editar/Excluir</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {notificacao.map((item, index) => (
            <Tr
              key={index}
              _hover={{
                bg: "gray.200",
              }}
            >
              <Td>{item.title}</Td>
              <Td>
                <Flex justifyContent="flex-end">
                  <EditarProposta
                    id={item.id}
                    description={item.description}
                    title={item.title}
                  />
                  <DeletProposta id={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
