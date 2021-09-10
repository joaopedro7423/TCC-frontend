import { Button, Text, toast, useToast, Icon } from "@chakra-ui/react";
import useAuth from "hooks/auth";
import { useState } from "react";
import { api } from "services/api";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/router";

interface IdPropostaProps {
  id: string;
}

export default function DeletProposta(propostas: IdPropostaProps) {
  const { token, user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeletProposta = async () => {
    //console.log(values);

    try {
      const reponse = await api.delete(`/proposals/${propostas.id}`, {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });
      console.log(reponse.data);
      toast({
        title: "Sucesso",
        description: "Você deletou um proposta!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast({
          title: "Erro ao deletar a proposta!.",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao deletar a proposta!.",
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
        onClick={handleDeletProposta}
        colorScheme="red"
        isLoading={loading}
      >
        <Icon as={FiTrash2} />
      </Button>
    </>
  );
}
