import {
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Center,
  Button,
  Icon,
} from "@chakra-ui/react";

import { IoMdLink } from "react-icons/io";
import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import NextLink from "next/link";

type ProjetosResponse = {
  id: string;
  title: string;
  description: string;
};

export function ListarProjetos() {
  const [notificacao, setPropos] = useState<ProjetosResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetPropos() {
      const response = await api.get<ProjetosResponse[]>("/projects", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setPropos(response.data);
      //console.log(response);
    }
    GetPropos();
  }, []);

  return (
    <>
      <Table w="100%" variant="simple">
        <Thead>
          <Tr>
            <Th>Título:</Th>
            <Th>Acessar Projeto:</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notificacao.map((item, index) => (
            <Tr key={index}>
              <Td>{item.title}</Td>
              <Td>
                <Flex>
                  <Center>
                    <NextLink href={`/${user.role}/projetos/${item.id}`}>
                      <Button m={1} colorScheme="blue">
                        <Icon as={IoMdLink} />
                      </Button>
                    </NextLink>
                  </Center>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
