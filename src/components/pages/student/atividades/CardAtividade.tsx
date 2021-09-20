import { Box, Stack, Text } from "@chakra-ui/react";

export function CardAtividade(props: any) {
  const { id, title, description, status } = props;

  return (
    <>
      <Box
        p={4}
        borderRadius={"md"}
        display={{ md: "flex" }}
        maxWidth="32rem"
        borderWidth={1}
        margin={2}
        bgColor={"whatsapp.100"}
      >
        <Stack
          align={{ base: "center", md: "stretch" }}
          textAlign={{ base: "center", md: "left"}}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
        >
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
          >
            {title}
          </Text>

          <Text my={2} color="gray.500">
            {description}
          </Text>

          <Text my={2} color="gray.700">
            {status}
          </Text>
        </Stack>
      </Box>
    </>
  );
}
