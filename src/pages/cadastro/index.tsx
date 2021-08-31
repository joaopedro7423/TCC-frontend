import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Select } from "components/Select";
import { useEffect } from "react";
import { Input } from "components/Input";

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

  const handleCreateContact: SubmitHandler<CadastroFormData> = (values) => {
    console.log(values);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        p={12}
        rounded={6}
        bg={formBackground}
        alignItems="center"
        w={{ md: "30%", sm: "100%" }}
        mx="auto"
      >
        <Heading color="#F2E94E" mb={6}>
          Cadastro
        </Heading>
        <Stack
          spacing={3}
          w="100%"
          d="block"
          as="form"
          onSubmit={handleSubmit(handleCreateContact)}
        >
          <Select
            placeholder="Selecione um Campus:"
            options={[
              { value: "unigran", text: "Unigran" },
              { value: "utf", text: "UTF" },
            ]}
            {...register("campus")}
            error={errors.campus}
          />
          <Select
            placeholder="Selecione um Curso:"
            options={[
              { value: "eng.soft", text: "Eng. Software" },
              { value: "biologia", text: "Biologia" },
            ]}
            {...register("curso")}
            error={errors.curso}
          />
          <Input
            placeholder="Nome:"
            type="name"
            color="white"
            {...register("nome")}
            error={errors.nome}
          />
          <Input
            placeholder="Email: "
            type="email"
            color="white"
            {...register("email")}
            error={errors.email}
          />
          <Input
            placeholder="Senha:"
            type="password"
            color="white"
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

          <Button type="submit" w="100%" mb={6} colorScheme="telegram">
            Cadastrar
          </Button>

         

        </Stack>
        <Link mt={6} href="/" w="100%">
            <Button w="100%" colorScheme="whiteAlpha">
              Voltar
            </Button>
          </Link>
      </Flex>
    </Flex>
  );
}
