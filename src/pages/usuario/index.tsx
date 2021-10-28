import {
  useToast,
  Center,
  VStack,
  Button,
  Stack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext, IUser } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "components/shared/Input";
import { api } from "services/api";
import ICredentiasUser from "interfaces/credentialsUsers";
import { BoxShadown } from "components/shared/Box";

type CadastroFormData = {
  curso: string;
  nome: string;
  email: string;
  password: string;
  quem_sou: string;
};

const updateFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Password obrigatória"),
});

const Usuario = () => {
  const toast = useToast();

  const router = useRouter();

  const [disable, setDisable] = useState(true);

  const { user, token, signIn, signOut } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  const [defaultUser, setDefaultUser] = useState<IUser>();

  useEffect(() => {
    setDefaultUser(user);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateFormSchema),
  });

  const handleUpdateUser: SubmitHandler<CadastroFormData> = async (values) => {
    //   console.log(values);
    const loginValue: ICredentiasUser = values;

    try {
      setLoading(true);

      // await signIn(loginValue);

      const reponse = await api.put(
        `/users/${user.id}`,
        {
          name: values.nome,
          email: values.email,
          password: values.password,
          role: user.role,
          course_id: user.course.id,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );

      signOut();

      await signIn(loginValue);

      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao atualizar seu usuário",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      //console.log(error.response.data);
      if (error.response) {
        toast({
          title: "Erro ao atualizar a conta.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao atualizar a conta.",
          description: "Alguma coisa aconteceu.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  //console.log(user.role)
  const handleDeletUser = async () => {
    //console.log(values);

    try {
      const reponse = await api.delete(`/users/${user.id}`, {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });
      console.log(reponse.data);
      signOut();
      toast({
        title: "Sucesso",
        description: "Você deletou a sua conta!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast({
          title: "Erro ao deletar a sua conta!.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao deletar a sua conta!.",
          description: "Alguma coisa aconteceu.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
    [];
  };

  return (
    <>
      <SidebarWithHeader>
        <BoxShadown>
          <Heading mb={8} size="lg">
            {" "}
            Editar Minha Conta:
          </Heading>

          <SimpleGrid
            display={{ base: "block", md: "grid" }}
            columns={2}
            spacing={10}
          >
            <Stack
              p={5}
              spacing={3}
              w="100%"
              d="block"
              as="form"
              onSubmit={handleSubmit(handleUpdateUser)}
            >
              <Input
                defaultValue={defaultUser?.name}
                placeholder="Nome:"
                type="name"
                {...register("nome")}
                error={errors.nome}
              ></Input>
              <Input
                defaultValue={defaultUser?.email}
                placeholder="Email: "
                type="email"
                {...register("email")}
                error={errors.email}
              ></Input>
              <Input
                placeholder="Password:"
                type="password"
                {...register("password")}
                error={errors.password}
              ></Input>
            </Stack>
            <VStack spacing={10} mt={6} w="100%">
              <Button
                mt={3}
                type="submit"
                w="100%"
                mb={6}
                colorScheme="telegram"
                isLoading={loading}
              >
                Atualizar
              </Button>
              <Button
                mt={3}
                w="100%"
                onClick={handleDeletUser}
                colorScheme="red"
                isLoading={loading}
              >
                Encerrar a minha conta
              </Button>
            </VStack>
          </SimpleGrid>
        </BoxShadown>
      </SidebarWithHeader>
    </>
  );
};
export default Usuario;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  return {
    props: {},
  };
});
