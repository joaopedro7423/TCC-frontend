import {
  Box,
  Flex,
  Heading,
  useToast,
  Button,
  Link,
  Stack,
  Icon,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Select } from "components/shared/Select";
import { Input } from "components/shared/Input";
import { api } from "services/api";
import { withSSRGuest } from "utils/auth/redirectAuth";
import ICredentiasUser from "interfaces/credentialsUsers";

type CampusResponse = {
  id: string;
  name: string;
};

type CourseResponse = {
  id: string;
  name: string;
};

type CadastroFormData = {
  curso: string;
  nome: string;
  email: string;
  senha: string;
  quem_sou: string;
};

const updateFormSchema = yup.object().shape({
  quem_sou: yup.string().required("Selecione uma opção"),
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  senha: yup.string().required("Senha obrigatória"),
  campus: yup.string().required("Campus obrigatório"),
  curso: yup.string().required("Curso obrigatório"),
});

const Usuario = () => {
  const toast = useToast();

  const router = useRouter();

  const [campus, setCampus] = useState<CampusResponse[]>([]);

  const [courses, setCourses] = useState<CourseResponse[]>([]);

  const [disable, setDisable] = useState(true);

  const { user, token, signIn, signOut } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log(user);
  }, [user, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateFormSchema),
  });

  useEffect(() => {
    async function GetCampus() {
      const response = await api.get<CampusResponse[]>("/campus/");

      setCampus(response.data);
      ////console.log(response);
    }
    GetCampus();
  }, []);

  async function GetCourse(e: any) {
    if (!e.target.value) {
      setDisable(true);
      return;
    } else {
      setDisable(false);
    }

    const response = await api.get<CourseResponse[]>(
      `/courses/${e.target.value}`
    );
    setCourses(response.data);

    ////console.log(response);
  }
  const handleUpdateUser: SubmitHandler<CadastroFormData> = async (values) => {
    console.log(values);

    const loginValue = values;

    try {
      setLoading(true);

      // await signIn(loginValue);

      const reponse = await api.put(
        `/users/${user.id}`,
        {
          name: values.nome,
          email: values.email,
          password: values.senha,
          role: values.quem_sou,
          course_id: values.curso,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }

        /* {
        headers: {
          authorization: `Bearear ${}`
        }
      }*/
      );

      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao atualizar seu usuário",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      window.location.reload();
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
        <Stack
          spacing={3}
          w="100%"
          d="block"
          as="form"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Select
            placeholder="Selecione um Campus:"
            options={campus.map((campu) => ({
              value: campu.id,
              text: campu.name,
            }))}
            {...register("campus")}
            error={errors.campus}
            onChange={(e) => GetCourse(e)}
          ></Select>
          <Select
            placeholder="Selecione um Curso:"
            isDisabled={disable}
            options={courses.map((course) => ({
              value: course.id,
              text: course.name,
            }))}
            {...register("curso")}
            error={errors.curso}
          />
          <Input
            placeholder="Nome:"
            type="name"
            {...register("nome")}
            error={errors.nome}
          ></Input>
          <Input
            placeholder="Email: "
            type="email"
            {...register("email")}
            error={errors.email}
          ></Input>
          <Input
            placeholder="Senha:"
            type="password"
            {...register("senha")}
            error={errors.senha}
          ></Input>
          <Select
            placeholder="Eu sou?"
            options={[
              { value: "student", text: "Aluno" },
              { value: "professor", text: "Professor" },
            ]}
            {...register("quem_sou")}
            error={errors.quem_sou}
          />

          <Button
            type="submit"
            w="100%"
            mb={6}
            colorScheme="telegram"
            isLoading={loading}
          >
            Atualizar
          </Button>
        </Stack>
        <Button
          w="100%"
          m={1}
          onClick={handleDeletUser}
          colorScheme="red"
          isLoading={loading}
        >
          Encerrar a minha conta
        </Button>
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

/*
function Component() {

    const userCanSeeButton = useCan("student")

    return (
        <>

        <Can permission="adm">
            <Text>Só adm pode ver</Text>
            <Button>Adm</Button>
        </Can>

      {userCanSeeButton &&  <Button>Enviar Atividade</Button>}
      </>
    )
}
issoé do repositorio do git do lucas uma função do components que da a permissão de acesso a sua escolha
e fazer o hook do can
*/
