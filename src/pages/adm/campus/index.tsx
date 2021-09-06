import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";
import { CampusPage } from "components/pages/adm/campus";

const Campus = () => {
  const toast = useToast();

  const router = useRouter();

  const { user, token, signOut } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useForm();

  //verificando pelo client
  useEffect(() => {
    if (!user || user.role != "adm") {
      router.push("/");
    }
  }, []);

  const handleLogout = async () => {
    //console.log(values);

    try {
      setLoading(true);

      await signOut();

      toast({
        title: "Sucesso",
        description: "Você agora está Deslogado.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      router.push("/");
    } catch (error) {
      toast({
        title: "Erro ao Deslogar a conta.",
        description: "Alguma coisa aconteceu.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
    [];
  };

  //console.log(user.role)

  return (
    <>
      <SidebarWithHeader>
        <CampusPage />
      </SidebarWithHeader>
    </>
  );
};
export default Campus;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  return {
    props: {},
  };
});

/*
function Component() {

    const userCanSeeButton = useCan("student")

    return (
        <>

        <Can permission="adm">
            <Text>Só adm pode ver</Text>
            <Button>Adm</Button>
        </Can>

      {userCanSeeButton &&  <Button>Enviar Atividade</Button>}
      </>
    )
}
issoé do repositorio do git do lucas uma função do components que da a permissão de acesso a sua escolha
e fazer o hook do can
*/
