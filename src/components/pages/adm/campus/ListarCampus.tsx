import { Flex, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

import { api } from "services/api";
import { useEffect, useState } from "react";
import { withSSRGuest } from "utils/auth/redirectAuth";
import useAuth from "hooks/auth";
import DeletCampus from "./DeletCampus";
import EditarCampus from "./EditarCampus";

type CampusResponse = {
  id: string;
  name: string;
};

export function ListarCampus() {
  const [campus, setCampus] = useState<CampusResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetCampus() {
      const response = await api.get<CampusResponse[]>("/campus/", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setCampus(response.data);
      ////console.log(response);
    }
    GetCampus();
  }, [DeletCampus]);

  return (
    <>
      <Table w="100%" variant="simple">
        <Thead>
          <Tr>
            <Th>Nome:</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campus.map((item) => (
            <Tr>
              <Td>{item.name}</Td>
              <Td>
                <Flex>
                  <EditarCampus key={item.id} id={item.id} name={item.name} />
                  <DeletCampus key={item.id} id={item.id} />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
