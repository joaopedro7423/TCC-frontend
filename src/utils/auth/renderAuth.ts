import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";

type withSSRAuthenticatedOptions = {
  roles?: string[];
};

export function withSSRAuthenticated<P>(
  fn: GetServerSideProps<P>,
  options?: withSSRAuthenticatedOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    let token, user;
  
    const ctxUrl = ctx.resolvedUrl.split("/")[1]
   // console.log(ctxUrl)

    if (cookies.TccToken) {
      const parsedCookie = JSON.parse(cookies.TccToken);
      token = parsedCookie.token;
      user = parsedCookie.user;
    }
    //console.log(token)

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const userHasPermission = options?.roles?.includes(user.role);
    //  console.log(user.role)
    if (options) {
      if (userHasPermission && !(user.role == ctxUrl) || !userHasPermission ) {
        return {
          redirect: {
            destination: `/${user.role}`,
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (error) {
       destroyCookie(ctx, "TccToken");

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
