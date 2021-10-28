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
  const [projetos, setProjetos] = useState<ProjetosResponse[]>([]);
  const { token, user } = useAuth();

  useEffect(() => {
    async function GetPropos() {
      const response = await api.get<ProjetosResponse[]>("/projects", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setProjetos(response.data);
      //console.log(response);
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
              <Flex justifyContent="flex-end"> Acessar Projeto:</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {projetos.map((item, index) => (
            <Tr
              key={index}
              _hover={{
                bg: "gray.200",
              }}
            >
              <Td>{item.title}</Td>
              <Td>
                <Flex justifyContent="flex-end">
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
