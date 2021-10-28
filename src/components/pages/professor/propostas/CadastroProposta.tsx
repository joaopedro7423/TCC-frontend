import { Textarea, useToast, Button, VStack, HStack } from "@chakra-ui/react";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "services/api";
import { useEffect, useState } from "react";
import useAuth from "hooks/auth";
import { Input } from "components/shared/Input";

const cadastroFormSchema = yup.object().shape({
  description: yup.string().required("Descrição obrigatório"),
  title: yup.string().required("Título obrigatório"),
});

export function CadastroProposta() {
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
    description: string;
    title: string;
  };

  const handleCreateCurso: SubmitHandler<CadastroFormData> = async (values) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.post(
        "/proposals/",
        {
          title: values.title,
          description: values.description,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );
      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao criar a proposta",
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
          title: "Erro ao criar a proposta.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao criar a proposta.",
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
      <VStack px={5} spacing={7} w="100%" as="form" onSubmit={handleSubmit(handleCreateCurso)}>
        <Input
          placeholder="Titulo:"
          type="name"
          {...register("title")}
          error={errors.title}
        />
       
          <Textarea
            mt={6}
            borderColor="black"
            placeholder="Descrição da Proposta:"
            type="name"
            {...register("description")}
            error={errors.description}
          />
          <Button
            p={6}
            w="100%"
            type="submit"
            colorScheme="green"
            isLoading={loading}
          >
            Cadastrar
          </Button>
     
      </VStack>
    </>
  );
}
