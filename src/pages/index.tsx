import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Home = () => {
  const formBackground = useColorModeValue( "#636363","#C0BABC");

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
          Entrar
        </Heading>
        <Input
          placeholder="exemplo@alunos.unigran.br"
          variant="flushed"
          mb={3}
          type="email"
          color="white"
        />
        <Input
          placeholder="***************"
          variant="flushed"
          mb={6}
          type="password"
          color="white"
        />
        <Button w="100%" mb={6} colorScheme="telegram">
          Log In
        </Button>
        <Link href="/cadastro" w="100%">
          <Button w="100%" colorScheme="whiteAlpha">
            Inscreva-se
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
