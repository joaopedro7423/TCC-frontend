import { INavigation } from "./INavigation";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import {AiOutlineNotification, AiOutlineAudit} from "react-icons/ai";

export const professorNavigation: INavigation[] = [
    { name: "Minhas Propostas", icon: HiOutlineUser, link: "propostas" },
    { name: "Propostas dos Alunos", icon: HiOutlineUsers, link: "propostas/alunos" },
    { name: "Projetos", icon: AiOutlineAudit, link: "projetos" },
    { name: "Notificação", icon: AiOutlineNotification, link: "notificacao" },
]