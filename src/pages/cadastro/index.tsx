import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Select } from "components/Select";
import { useEffect } from "react";
import { Input } from "components/Input";
import { api } from "services/api";
import { useRouter } from "next/router";
import { useState } from "react";

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

const cadastroFormSchema = yup.object().shape({
  quem_sou: yup.string().required("Selecione uma opção"),
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  senha: yup.string().required("Senha obrigatória"),
  campus: yup.string().required("Campus obrigatório"),
  curso: yup.string().required("Curso obrigatório"),
});

export default function Cadastro() {
  const formBackground = useColorModeValue("#636363", "#C0BABC");

  const toast = useToast();
  const router = useRouter();

  const [campus, setCampus] = useState<CampusResponse[]>([]);

  const [courses, setCourses] = useState<CourseResponse[]>([]);

  const [disable, setDisable] = useState(true);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cadastroFormSchema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    async function GetCampus() {
      const response = await api.get<CampusResponse[]>("/campus/");
      setCampus(response.data);
      //console.log(response);
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

    //console.log(response);
  }

  const handleCreateUser: SubmitHandler<CadastroFormData> = async (values) => {
    console.log(values);

    try {
      setLoading(true);

      const reponse = await api.post("/users/", {
        name: values.nome,
        email: values.email,
        password: values.senha,
        role: values.quem_sou,
        course_id: values.curso,
      });
      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao criar seu usuário",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      router.push("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        toast({
          title: "Erro ao criar a conta.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao criar a conta.",
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
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        p={12}
        rounded={6}
        alignItems="center"
        w={{ md: "30%", sm: "100%" }}
        mx="auto"
        outline="2px black"
        boxShadow="dark-lg"
      >
        <Heading color="black" mb={6}>
          Cadastro
        </Heading>
        <Stack
          spacing={3}
          w="100%"
          d="block"
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
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
          />
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
          />
          <Input
            placeholder="Email: "
            type="email"
            {...register("email")}
            error={errors.email}
          />
          <Input
            placeholder="Senha:"
            type="password"
            {...register("senha")}
            error={errors.senha}
          />
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
            Cadastrar
          </Button>
        </Stack>
        <Link mt={6} href="/" w="100%">
          <Button w="100%" colorScheme="blackAlpha">
            Voltar
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
