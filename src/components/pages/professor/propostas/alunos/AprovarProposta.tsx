import {
  Button,
  Textarea,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Center,
  Text,
  Stack,
} from "@chakra-ui/react";
import { IoMdEye } from "react-icons/io";
import { api } from "services/api";
import useAuth from "hooks/auth";
import { useState } from "react";

interface IdPropostaProps {
  id: string;
  title: string;
  description: string;
  userCreate: any;
}

export default function AprovarProposta(proposta: IdPropostaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpdateProposta = async () => {
    // console.log(token);

    try {
      setLoading(true);
      //  console.log(proposta.id);
      const reponse = await api.patch(
        `/proposals/${proposta.id}`,
        { null: null },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );

      //    console.log(reponse.data);
      toast({
        title: "Sucesso !!!",
        description: "Sucesso ao aceitar a proposta.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      window.location.reload();
    } catch (error: any) {
      //console.log(error.response.data);
      if (error.response) {
        toast({
          title: "Erro ao aceitar a proposta.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao aceitar a proposta.",
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
      <Center>
        <Button onClick={onOpen} m={1} colorScheme="teal">
          <Icon as={IoMdEye} />
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Proposta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Text> Criador: {proposta.userCreate.name} </Text>
              <Text> Titulo :{proposta.title} </Text>
              <Text> Descrição: {proposta.description}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              m={2}
              onClick={handleUpdateProposta}
              colorScheme="green"
              isLoading={loading}
            >
              Aceitar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
