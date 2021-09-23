import { useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";
import { PropostasProfessorPage } from "components/pages/student/professor";

const PropostasAlunos = () => {
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

  return (
    <>
      <SidebarWithHeader>
        <PropostasProfessorPage />
      </SidebarWithHeader>
    </>
  );
};
export default PropostasAlunos;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  },
  { roles: ["student"] }
);
