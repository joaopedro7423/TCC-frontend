import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Cadastro() {
  const formBackground = useColorModeValue("#636363", "#C0BABC");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        p={12}
        rounded={6}
        bg={formBackground}
        alignItems="center"
        w="30%"
        mx="auto"
      >
        <Heading color="#F2E94E" mb={6}>
          Cadastro
        </Heading>
        <Select
          mb={3}
          color="white"
          variant="flushed"
          name="role"
          placeholder="Campus"
          colorScheme="azul.500"
        >
          <option color="black" value="student">
            Aluno
          </option>
          <option value="professor">Professor</option>
        </Select>
        <Select
          mb={3}
          color="white"
          variant="flushed"
          name="role"
          placeholder="Curso"
          isRequired
          colorScheme="azul.500"
        >
          <option color="black" value="student">
            Aluno
          </option>
          <option value="professor">Professor</option>
        </Select>
        <Input
          placeholder="Nome:"
          variant="flushed"
          mb={3}
          type="email"
          color="white"
        />
        <Input
          placeholder="Email: "
          variant="flushed"
          mb={3}
          type="email"
          color="white"
        />
        <Input
          placeholder="Senha:"
          variant="flushed"
          mb={3}
          type="password"
          color="white"
        />
        <Select
          mb={6}
          color="white"
          variant="flushed"
          name="role"
          placeholder="Aluno ou professor?"
          colorScheme="azul.500"
        >
          <option color="black" value="student">
            Aluno
          </option>
          <option value="professor">Professor</option>
        </Select>

        <Button w="100%" mb={6} colorScheme="telegram">
          Cadastrar
        </Button>
        <Link href="/" w="100%">
          <Button w="100%" colorScheme="whiteAlpha">
            Voltar
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
