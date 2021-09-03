import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "hooks/auth";

const Adm = () => {
  const toast = useToast();

  const router = useRouter();

  const { user, token, signOut } = useAuth(); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    //console.log(token);
  }, [user]);

  const {
    handleSubmit,
  } = useForm();

  const handleLogout = async () => {
    //console.log(values);

    try {
      setLoading(true);

      await signOut();

      toast({
        title: "Sucesso",
        description: "Você agora está Deslogado.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Erro ao Deslogar a conta.",
        description: "Alguma coisa aconteceu.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
    [];
  };

  //console.log(user.role)

  if (!user) {
    return (
      <>
        <Center>
          <Stack>
            <Heading as="h4">Você não está logado</Heading>
          </Stack>
        </Center>
      </>
    );
  } else if (user.role != "adm") {
    return (
      <>
        <Center>
          <Heading as="h4">Você não tem permissão para essa rota</Heading>
        </Center>
      </>
    );
  } else if (user == undefined) router.push("/");
  {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          p={12}
          rounded={6}
          alignItems="center"
          w={{ md: "30%", sm: "100%" }}
          mx="auto"
          boxShadow="dark-lg"
        >
          <Heading color="balck" mb={2}>
            Seja bem vindo!
          </Heading>
          <Heading  color="balck" mb={6}>
            {user.name}
          </Heading>

          <Stack
            w="100%"
            d="block"
            as="form"
            onSubmit={handleSubmit(handleLogout)}
          >
            <Button
              type="submit"
              w="100%"
              mb={6}
              colorScheme="red"
              isLoading={loading}
            >
              Log Out
            </Button>
          </Stack>
        </Flex>
      </Flex>
    );
  }
};
export default Adm;
