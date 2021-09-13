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
} from "@chakra-ui/react";
import { BsPencil } from "react-icons/bs";
import { api } from "services/api";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "hooks/auth";
import { useState } from "react";
import { Input } from "components/shared/Input";

interface IdAtividadeProps {
  id: string;
  title: string;
  description: string;
}
const cadastroFormSchema = yup.object().shape({
  title: yup.string().required("Titulo obrigatória"),
  description: yup.string().required("Notificação obrigatória"),
});

export default function EditarAtividade(ativi: IdAtividadeProps) {
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
    title: string;
    description: string;
  };

  const handleUpdateCampus: SubmitHandler<CadastroFormData> = async (
    values
  ) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.put(
        `/activities/${ativi.id}`,
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
        description: "Sucesso ao atualizar a atividade",
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
          title: "Erro ao atualizar a atividade.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao atualizar a atividade.",
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
          <ModalHeader>{ativi.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              w="100%"
              mb={6}
              defaultValue={ativi.title}
              placeholder="Titulo:"
              type="name"
              {...register("title")}
              error={errors.title}
            ></Input>

            <Textarea
              h={12}
              size="lg"
              borderColor="black"
              variant="filled"
              placeholder="Descrição:"
              type="description"
              {...register("description")}
              error={errors.description}
            >
              {ativi.description}
            </Textarea>
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
