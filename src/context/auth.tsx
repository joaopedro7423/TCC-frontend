import { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";

import ICredentiasUser from "interfaces/credentialsUsers";
import { api } from "services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";

export interface ICampus {
  id: string;
  name: string;
}

export interface ICourse {
  id: string;
  name: string;
  campus: ICampus;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  course: ICourse;
  created_at: Date | string;
  updated_at: Date | string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

export interface IAuthContextState {
  user: IUser; //objeto com os dados do usuario que será passado como variavel global para todos
  token: string;
  signIn(credentials: ICredentiasUser): Promise<void>;
  signOut(): void;
}
//                                                    esta dizendo que esse '{}' objeto vazio é do tipo IAuthContextState
export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState
);

export const AuthProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const router = useRouter();

  const [data, setData] = useState<IAuthState>(() => {
    const cookies = parseCookies();

    if (cookies.TccToken) {
      const { token, user } = JSON.parse(cookies.TccToken);

      //a condição é que os 2 tem que existir
      if (token && user) {
        //console.log(user)
        return { token, user };
      }
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async (credentials: ICredentiasUser) => {
    //console.log(credentials);
    const response = await api.post("/sessions", credentials);
    // //console.log(response)
    const { token, user } = response.data;
    
    const payload = { token, user };
    
    await setCookie(null, "TccToken", JSON.stringify(payload), {
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    setData({
      token,
      user,
    });


    router.push(`/${user.role}`);

    

  }, []);

  const signOut = useCallback(() => {
    destroyCookie(null, "TccToken");
    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, token: data.token, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
