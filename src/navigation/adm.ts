import { INavigation } from "./INavigation";
import { FiHome } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

export const admNavigation: INavigation[] = [
  { name: "Campus", icon: FiHome, link: "adm/campus" },
  { name: "Cursos", icon: IoBookOutline, link: "adm/curso" },
];
