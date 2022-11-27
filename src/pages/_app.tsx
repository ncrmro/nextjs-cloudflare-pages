import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "~/lensAPI";

import React from "react";
import Link from "next/link";
import Head from "next/head";

function Layout(props: { children: React.ReactElement }) {
  return (
    <>
      <nav id="navbar" className="flex justify-items-center w-full">
        <Link href="/">John Doe</Link>
      </nav>
      <main>{props.children}</main>
    </>
  );
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
