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

interface IdPropostaProps {
  id: string;
  title: string;
  description: string;
}
const updateFormSchema = yup.object().shape({
  title: yup.string().required("Titúlo obrigatória"),
  description: yup.string().required("Descrição obrigatória"),
});

export default function EditarProposta(proposta: IdPropostaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token, user } = useAuth(); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateFormSchema),
  });

  type UpdateFormData = {
    title: string;
    description: string;
  };

  const handleUpdateProposta: SubmitHandler<UpdateFormData> = async (
    values
  ) => {
    //console.log(values);

    try {
      setLoading(true);

      const reponse = await api.put(
        `/proposals/${proposta.id}`,
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
        description: "Sucesso ao atualizar a propostacação",
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
          title: "Erro ao atualizar a propostacação.",
          description: error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Erro ao atualizar a propostacação.",
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
        <ModalContent as="form" onSubmit={handleSubmit(handleUpdateProposta)}>
          <ModalHeader>{proposta.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              w="100%"
              defaultValue={proposta.title}
              placeholder="Titulo:"
              type="name"
              {...register("title")}
              error={errors.title}
            ></Input>

            <Textarea
            mt={5}
              h={12}
              size="lg"
              borderColor="black"
              variant="filled"
              placeholder="Descrição:"
              type="description"
              {...register("description")}
              error={errors.description}
            >
              {proposta.description}
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
