import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (cookies["TccToken"]) {
      const { token, user } = JSON.parse(cookies.TccToken);

     // console.log(ctx.req.url);
      if (user.role == "adm") {
        return {
          redirect: {
            destination: "/adm",
            permanent: false,
          },
        };
      } else if (user.role == "professor") {
        return {
          redirect: {
            destination: "/professor",
            permanent: false,
          },
        };
      }
      /*
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
      */
    }

    return await fn(ctx);
  };
}
