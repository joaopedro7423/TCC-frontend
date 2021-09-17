import SidebarWithHeader from "components/shared/header";
import { withSSRAuthenticated } from "utils/auth/renderAuth";
import { PropostasPage } from "components/pages/professor/propostas";

const Propostas = () => {
  
  return (
    <>
      <SidebarWithHeader>
        <PropostasPage />
      </SidebarWithHeader>
    </>
  );
};
export default Propostas;

//verificando pelo server
export const getServerSideProps = withSSRAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  },
  { roles: ["student"] }
);
