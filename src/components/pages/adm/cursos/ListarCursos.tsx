import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import EditarCursos from "./EditarCursos";
import DeletCursos from "./DeletCursos";

type CursosResponse = {
  id: string;
  name: string;
  campus: any; // essa porra é um objeto, se colocar string da merda.
};

export function ListarCursos() {
  const [cursos, setCursos] = useState<CursosResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetCursos() {
      const response = await api.get<CursosResponse[]>("/courses/", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setCursos(response.data);
      ////console.log(response);
    }
    GetCursos();
  }, [DeletCursos, EditarCursos]);

  return (
    <>
      <Table w="100%" variant="simple">
        <Thead>
          <Tr>
            <Th>Nome:</Th>
            <Th>Campus:</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cursos.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.campus.name}</Td>
              <Td>
                <Flex>
                  <EditarCursos
                    id={item.id}
                    name={item.name}
                    campus_id={item.campus.id}
                  />
                  <DeletCursos id={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
