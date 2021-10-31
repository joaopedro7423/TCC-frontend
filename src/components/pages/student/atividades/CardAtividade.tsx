import { Box, Stack, Text, Flex, GridItem } from "@chakra-ui/react";
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

  // console.log(status)

  const { token } = useAuth();

  const [collor, setCollor] = useState("");

  const [statusName, setStatusName] = useState("");

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(statusChenge),
    defaultValues: {
      status: status,
    },
  });

  useEffect(() => {
    FormatStatusName(status);
    // console.log(collor, statusName);
  }, [status]);

  function FormatStatusName(status: any) {
    switch (status) {
      case "NEW":
        setCollor("white");

        break;
      case "CANCELED":
        setCollor("red.100");

        break;
      case "FINISHED":
        setCollor("whatsapp.100");

        break;
      case "PAUSE":
        setCollor("blue.100");

        break;
      case "IN_PROGRESS":
        setCollor("yellow.100");

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
    <GridItem
      p={4}
      borderRadius={"lg"}
      display={{ md: "flex" }}
      w="100%"
      flex={1}
      maxHeight="32rem"
      borderWidth={1}
      bgColor={collor}
      transition="1s ease"
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
            options={[
              { value: "NEW", text: "Novo", isDisabled: true },
              {
                value: "IN_PROGRESS",
                text: "Em Progresso",
                isDisabled: false,
              }, //amarelo
              { value: "PAUSE", text: "Parado", isDisabled: false }, //azul
              { value: "FINISHED", text: "Finalizado", isDisabled: false }, // verde
              { value: "CANCELED", text: "Cancelado", isDisabled: false }, // vermelho
            ]}
          />
        </Box>
      </Stack>
    </GridItem>
  );
}
