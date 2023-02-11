import { AppLayoutProps } from "next/app";

import "../styles/globals.css";
import Layout from "components/Layout";

export default function App({ Component, pageProps }: AppLayoutProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
