import { Box, Stack, Text, Flex } from "@chakra-ui/react";
import { Select } from "components/shared/Select";
import useAuth from "hooks/auth";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "services/api";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const statusChenge = yup.object().shape({
  status: yup.string().required("Campus obrigatório"),
});

export function CardAtividade(props: any) {
  const { id_atividade, title, description, status } = props;

  const { token } = useAuth();

  const [collor, setCollor] = useState("");

  const [statusName, setStatusName] = useState("");

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(statusChenge),
  });

  useEffect(() => {
    FormatStatusName(status);
    // console.log(collor, statusName);
  }, [status]);

  function FormatStatusName(status: any) {
    switch (status) {
        case "NEW":
            setCollor("whiteAlpha");
            setStatusName("Novo");
            break;
      case "CANCELED":
        setCollor("red.100");
        setStatusName("Cancelado");
        break;
      case "FINISHED":
        setCollor("whatsapp.100");
        setStatusName("Finalizado");

        break;
      case "PAUSE":
        setCollor("blue.100");
        setStatusName("Parado");

        break;
      case "IN_PROGRESS":
        setCollor("yellow.100");
        setStatusName("Em Progresso");

        break;
    }
  }

  async function ChengeStatus(values: any) {
    try {
      await api.patch(
        `/activities/${id_atividade}`,
        {
          status: values.target.value,
        },
        {
          headers: {
            authorization: `Bearear ${token}`,
          },
        }
      );
      FormatStatusName(values.target.value);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Box
        p={4}
        borderRadius={"lg"}
        display={{ md: "flex" }}
        maxWidth="32rem"
        maxHeight="32rem"
        borderWidth={1}
        margin={2}
        bgColor={collor}
        transition = "1s ease"
      >
        <Stack
          w="100%"
          align={{ base: "center", md: "stretch" }}
          textAlign={{ base: "center" }}
          mt={{ base: 4, md: 0 }}
         //ml={{ md: 6 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="lg"
              letterSpacing="wide"
            >
              {title}
            </Text>

            <Text my={2} color="gray.600">
              {description}
            </Text>
          </Box>
          <Box>
            <Select
              {...register("status")}
              error={errors.status}
              onChange={(e) => ChengeStatus(e)}
              defaultValue={status}
              options={[
                { value: "IN_PROGRESS", text: "Em Progresso" }, //amarelo
                { value: "PAUSE", text: "Parado" }, //azul
                { value: "FINISHED", text: "Finalizado" }, // verde
                { value: "CANCELED", text: "Cancelado" }, // vermelho
              ]}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
