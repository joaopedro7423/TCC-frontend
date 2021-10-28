import { useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";
import { NotificacaoPage } from "components/pages/professor/notificacao";
import { SimpleGrid, Box } from "@chakra-ui/react";

const Notificacao = () => {
  const toast = useToast();

  const router = useRouter();

  const { user, token, signOut } = useContext(AuthContext); //esssa disgraça vira um hook kkkk

  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useForm();

  //verificando pelo client

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
        <NotificacaoPage />
      </SidebarWithHeader>
    </>
  );
};
export default Notificacao;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  },
  { roles: ["professor"] }
);
