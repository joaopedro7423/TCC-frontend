import { useToast, SimpleGrid, Button, HStack } from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import { Input } from "components/shared/Input";
import { Select } from "components/shared/Select";

type CampusResponse = {
  id: string;
  name: string;
};

const cadastroFormSchema = yup.object().shape({
  nome: yup.string().required("Nome do curso obrigatório"),
  campus: yup.string().required("Campus obrigatório"),
});

export function CadastroCursos() {
  const toast = useToast();
  const { token, user } = useAuth(); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  const [campus, setCampus] = useState<CampusResponse[]>([]);

  useEffect(() => {
    async function GetCampus() {
      const response = await api.get<CampusResponse[]>("/campus/");

      setCampus(response.data);
      ////console.log(response);
    }
    GetCampus();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cadastroFormSchema),
  });

  type CadastroFormData = {
    nome: string;
    campus: string;
  };

  const handleCreateCurso: SubmitHandler<CadastroFormData> = async (values) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.post(
        "/courses/",
        {
          name: values.nome,
          campus_id: values.campus,
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
        <Select
          placeholder="Selecione um Campus:"
          options={campus.map((campu) => ({
            value: campu.id,
            text: campu.name,
          }))}
          {...register("campus")}
          error={errors.campus}
        />
        <Input
          placeholder="Nome do curso:"
          type="name"
          {...register("nome")}
          error={errors.nome}
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
