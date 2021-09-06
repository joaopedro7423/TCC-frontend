import {
  Button,
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
} from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import { api } from "services/api";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/auth";
import { useState } from "react";
import { Input } from "components/shared/Input";

interface IdCampusProps {
  id: string;
  name: string;
}
const cadastroFormSchema = yup.object().shape({
  nome: yup.string().required("Nome do campus obrigatório"),
});

export default function EditarCampus(campus: IdCampusProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleUpdateCampus: SubmitHandler<CadastroFormData> = async (
    values
  ) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.put(
        `/campus/${campus.id}`,
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
        description: "Sucesso ao atualizar o campus",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (error: any) {
      //console.log(error.response.data);
      if (error.response) {
        toast({
          title: "Erro ao atualizar o campus.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao atualizar o campus.",
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
      <Button onClick={onOpen} m={1} colorScheme="teal">
        <Icon as={BsPencil} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleUpdateCampus)}>
          <ModalHeader>{campus.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="Nome:"
              type="name"
              {...register("nome")}
              error={errors.nome}
            />
          </ModalBody>
          <ModalFooter>
            <Button m={2} type="submit" colorScheme="green" isLoading={loading}>
              Atualizar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
