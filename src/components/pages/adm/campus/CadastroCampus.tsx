import { useToast } from "@chakra-ui/toast";
import { Input } from "components/shared/Input";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";
import { api } from "services/api";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { withSSRGuest } from "utils/auth/redirectAuth";
import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import useAuth from "hooks/auth";

const cadastroFormSchema = yup.object().shape({
  nome: yup.string().required("Nome do campus obrigatório"),
});

export function CadastroCampus() {
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
    nome: string;
  };

  const handleCreateCampus: SubmitHandler<CadastroFormData> = async (
    values
  ) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.post(
        "/campus/",
        {
          name: values.nome,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );
      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao criar um novo campus",
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
          title: "Erro ao criar um novo campus.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao criar um novo campus.",
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
      <HStack w="100%" as="form" onSubmit={handleSubmit(handleCreateCampus)}>
        <Input
          placeholder="Nome:"
          type="name"
          {...register("nome")}
          error={errors.nome}
        />
        <Button type="submit" colorScheme="green" isLoading={loading}>
          Cadastrar
        </Button>
      </HStack>
    </>
  );
}
