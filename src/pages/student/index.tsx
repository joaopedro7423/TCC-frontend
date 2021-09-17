import SidebarWithHeader from "components/shared/header";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { useContext } from "react";


const Professor = () => {
 
  const { user } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  return (
    <>
      <SidebarWithHeader>
        <Flex height="50vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            p={12}
            rounded={6}
            alignItems="center"
            w={{ md: "100%", sm: "100%", lg: "50%" }}
            mx="auto"
            boxShadow="dark-lg"
          >
            <Box>
              <Heading as="h2" color="balck" mb={2}>
                Seja bem vindo! Aluno:
              </Heading>
              <Heading color="balck" mb={6}>
                {user?.name}
              </Heading>
            </Box>
          </Flex>
        </Flex>
      </SidebarWithHeader>
    </>
  );
};
export default Professor;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  return {
    props: {},
  };
},{roles:["student"]});
