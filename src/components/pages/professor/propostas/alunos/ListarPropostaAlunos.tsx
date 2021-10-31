import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import AprovarProposta from "./AprovarProposta";

type PropostaResponse = {
  id: string;
  title: string;
  description: string;
  userCreate: any;
};

export function ListarPropostaAlunos() {
  const [notificacao, setPropos] = useState<PropostaResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetPropos() {
      const response = await api.get<PropostaResponse[]>(
        "/proposals/listByRoleAndCourse",
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );

      setPropos(response.data);
      // console.log(response);
    }
    GetPropos();
  }, []);

  return (
    <>
      <Table w="100%" variant="unstyled">
        <Thead>
          <Tr>
            <Th>Título:</Th>
            <Th>
              {" "}
              <Flex justifyContent="flex-end">Visualizar </Flex>
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
                  <AprovarProposta
                    id={item.id}
                    description={item.description}
                    title={item.title}
                    userCreate={item.userCreate}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
