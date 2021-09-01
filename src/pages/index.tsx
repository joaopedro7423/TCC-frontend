import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  toast,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";
import { Input } from "../components/Input";
import { api } from "services/api";
import { useRouter } from "next/router";

type LogInFormData = {
  email: string;
  senha: string;
};

const LogInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail incorreto"),
  senha: yup.string().required("Senha obrigatória"),
});

const Home = () => {
  const formBackground = useColorModeValue("#636363", "#C0BABC");

  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleLogin: SubmitHandler<LogInFormData> = async (values) => {
    console.log(values);

    try {
      const response = await api.post("/sessions", {
        email: values.email,
        password: values.senha,
      });

      localStorage.setItem("token", response.data.token);
      //    localStorage.removeItem('token')
      console.log(response);
    } catch (error) {
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
        boxShadow="dark-lg"
      >
        <Heading color="balck" mb={6}>
          Entrar
        </Heading>
        <Stack
          w="100%"
          d="block"
          as="form"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            placeholder="E-mail: "
            mb={3}
            type="email"
            {...register("email")}
            error={errors.email}
          />
          <Input
            placeholder="Senha:"
            mb={3}
            type="password"
            {...register("senha")}
            error={errors.senha}
          />

          <Button type="submit" w="100%" mb={6} colorScheme="telegram">
            Log In
          </Button>
        </Stack>
        <Link mt={6} href="/cadastro" w="100%">
          <Button w="100%" colorScheme="blackAlpha">
            Inscreva-se
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
