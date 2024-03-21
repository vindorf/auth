import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient =new QueryClient();
  return (
    <SessionProvider session={session}>
      <Head><title>SeeHorse</title></Head>
      <Navbar />
      <QueryClientProvider client={queryClient} >
        <Component {...pageProps} />
        </QueryClientProvider>
    </SessionProvider>
  );
}
