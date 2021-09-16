import { useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { useContext, useState } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "context/auth";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import SidebarWithHeader from "components/shared/header";
import { AtividadesPage } from "components/pages/professor/atividades";
import { GetServerSideProps } from "next";

type ProjectIdProps = {
  id_project: string;
};

const Atividades = ({ id_project }: ProjectIdProps) => {
  const toast = useToast();

  return (
    <>
      <SidebarWithHeader>
        <AtividadesPage id_project={id_project} />
      </SidebarWithHeader>
    </>
  );
};
export default Atividades;

//verificando pelo server
export const getServerSideProps: GetServerSideProps = withSSRAuthenticated(
  async ({ params }) => {
    //  console.log(params)
    return {
      props: { id_project: params?.id },
    };
  },
  { roles: ["student"] }
);

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
