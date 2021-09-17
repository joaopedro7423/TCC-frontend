import { INavigation } from "./INavigation";
import { AiOutlineAudit } from "react-icons/ai";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi";

export const studentNavigation: INavigation[] = [
  { name: "Minhas Propostas", icon: HiOutlineUser, link: "propostas" },
  {
    name: "Propostas dos Professores",
    icon: HiOutlineUsers,
    link: "propostas/professor",
  },
  { name: "Meu Projeto", icon: AiOutlineAudit, link: "projetos" },
];
