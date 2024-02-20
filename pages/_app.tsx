import { checkWindow } from "@/lib/functions/_helpers.lib";
import { checkLoggedInServer } from "@/reduxtoolkit/slices/userSlice";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/calender.scss";
import "@/styles/global.scss";
import { userData } from "@/types/common.type";
import ToastifyProvider from "@/ui/toastify/ToastifyProvider";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import dynamic from "next/dynamic";
import nookies from "nookies";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const MuiTheme = dynamic(() => import("@/themes/index"), { ssr: true });

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // refetchOnMount: false,
      // staleTime: Infinity,
      // cacheTime: Infinity,
    },
  },
});

interface CustomAppProps extends AppProps {
  user: userData | null;
  hasToken?: boolean;
}

export default function CustomApp({
  Component,
  pageProps,
  hasToken,
  user
}: CustomAppProps) {
  fixSSRLayout();

  store.dispatch(checkLoggedInServer({ hasToken, user }));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastifyProvider>
            <MuiTheme>
              <Component {...pageProps} />
            </MuiTheme>
          </ToastifyProvider>
        </Hydrate>

        {/* {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )} */}
      </QueryClientProvider>
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });
  // const { data } = await client.query({
  //   query: CURRENT_USER_QUERY,
  // });
  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };
  const cookies = nookies.get(context.ctx);

  let hasToken = false;
  let user = null;

  if (cookies?.token?.length) {
    hasToken = true;
  }

  if (cookies?.user?.length) {
    user = JSON.parse(cookies?.user);
  }



  return { ...appProps, hasToken, user };
};
