import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import Head from "next/head";
import { useSSR } from "@nextui-org/react";
import RouteGuard from "../components/RouteGuard";

function MyApp({ Component, pageProps }) {
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <>
        <Head>
          <title>Saygin Saracoglu/Museum Project</title>
          <meta
            name="description"
            content="Search the inventory of the Metropolitan Museum of Art and explore their vast collection of art from around the world. Conduct advanced searches to find exactly what you're looking for, including art by artist, culture, medium, and more. Discover new works of art and learn about the rich history and cultural significance behind each piece. Start your search today and uncover the treasures of the Met."
          />
        </Head>

        <RouteGuard>
          <Layout>
            <SWRConfig
              value={{
                fetcher: async (url) => {
                  const res = await fetch(url);

                  if (!res.ok) {
                    const error = new Error(
                      "An error occurred while fetching the data."
                    );
                    error.info = await res.json();
                    error.status = res.status;
                    throw error;
                  }
                  return res.json();
                },
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </Layout>
        </RouteGuard>
      </>
    )
  );
}

export default MyApp;
