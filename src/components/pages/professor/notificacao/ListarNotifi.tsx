import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import EditarNotifi from "./EditarNotifi";
import DeletNotifi from "./DeletNotifi";

type NotificacaoResponse = {
  id: string;
  description: string;
};

export function ListarNotifi() {
  const [notificacao, setNotifi] = useState<NotificacaoResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetCursos() {
      const response = await api.get<NotificacaoResponse[]>("/notifications/", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setNotifi(response.data);
      //console.log(response);
    }
    GetCursos();
  }, [DeletNotifi, EditarNotifi]);

  return (
    <>
      <Table w="100%" variant="unstyled" border="none">
        <Thead>
          <Tr>
            <Th>Nome:</Th>
            <Th>
              <Flex justifyContent="flex-end"> Editar/Excluir</Flex>
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
              <Td noOfLines={1}>{item.description}</Td>
              <Td>
                <Flex justifyContent="flex-end">
                  <EditarNotifi id={item.id} description={item.description} />
                  <DeletNotifi id={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
