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

import { useEffect, useState } from "react";
import { Input } from "../components/shared/Input";
import { useRouter } from "next/router";
import ICredentiasUser from "interfaces/credentialsUsers";
import useAuth from "hooks/auth";

type LogInFormData = {
  email: string;
  senha: string;
};

const LogInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail incorreto"),
  password: yup.string().required("Senha obrigatória"),
});

const Home = () => {
  const formBackground = useColorModeValue("#636363", "#C0BABC");

  const toast = useToast();
  const router = useRouter();

  const { token, user, signIn } = useAuth(); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log(user);
    //console.log(token);
  }, [user, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
  });

  useEffect(() => {
    //console.log(errors);
  }, [errors]);

  const handleLogin: SubmitHandler<ICredentiasUser> = async (
    values: ICredentiasUser
  ) => {
    //console.log(values);

    try {
      setLoading(true);

      await signIn(values);

      toast({
        title: "Sucesso",
        description: "Você agora está logado.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      //console.log(user)
      router.push("/adm");
      
      
      /*
      const response = await api.post("/sessions", {
        email: values.email,
        password: values.senha,
      });
*/
      //localStorage.setItem("token", response.data.token);
      //    localStorage.removeItem('token')

      ////console.log(response);
    } catch (error) {
      if (error.response) {
        toast({
          title: "Erro ao autenticar a conta.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao autenticar a conta.",
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
    [signIn];
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
            {...register("password")}
            error={errors.password}
          />

          <Button
            type="submit"
            w="100%"
            mb={6}
            colorScheme="telegram"
            isLoading={loading}
          >
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
