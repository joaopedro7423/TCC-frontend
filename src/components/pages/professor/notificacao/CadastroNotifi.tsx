import {
  Textarea,
  useToast,
  SimpleGrid,
  Button,
  HStack,
} from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";

const cadastroFormSchema = yup.object().shape({
  descricao: yup.string().required("Descrição obrigatório"),
});

export function CadastroNotifi() {
  const toast = useToast();
  const { token, user } = useAuth(); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cadastroFormSchema),
  });

  type CadastroFormData = {
    descricao: string;
  };

  const handleCreateCurso: SubmitHandler<CadastroFormData> = async (values) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.post(
        "/notifications/",
        {
          description: values.descricao,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );
      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao criar um novo curso",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      window.location.reload();
    } catch (error: any) {
      //console.log(error.response.data);
      if (error.response) {
        toast({
          title: "Erro ao criar um novo curso.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao criar um novo curso.",
          description: "Alguma coisa aconteceu.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HStack w="100%" as="form" onSubmit={handleSubmit(handleCreateCurso)}>
        <Textarea
          borderColor="black"
          placeholder="Descrição da notificação:"
          type="name"
          {...register("descricao")}
          error={errors.descricao}
        />
        <Button
          p={6}
          px={8}
          type="submit"
          colorScheme="green"
          isLoading={loading}
        >
          Cadastrar
        </Button>
      </HStack>
    </>
  );
}
