import { Button, Text, toast, useToast, Icon } from "@chakra-ui/react";
import useAuth from "hooks/auth";
import { useState } from "react";
import { api } from "services/api";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/router";

interface IdProjetoProps {
  id: string;
}

export default function DeletProjeto(proj: IdProjetoProps) {
  const { token, user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeletCampus = async () => {
    //console.log(values);

    try {
      const reponse = await api.delete(`/projects/${proj.id}`, {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });
      console.log(reponse.data);
      toast({
        title: "Sucesso",
        description: "Você deletou o projeto!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      router.push(`/${user.role}`);
    } catch (error: any) {
      if (error.response) {
        toast({
          title: "Erro ao deletar o projeto!.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao deletar o projeto!.",
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
      <Button
        m={1}
        onClick={handleDeletCampus}
        colorScheme="red"
        isLoading={loading}
        w="100%"
      >
        Deletar projeto
      </Button>
    </>
  );
}
