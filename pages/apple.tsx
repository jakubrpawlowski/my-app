import { Loading } from "components/Loading";
import { ScrollView } from "components/ScrollView";
import dynamic from "next/dynamic";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import { setScrollTopSelector } from "stores/apple-container/selectors";
import { useContainerStore } from "stores/apple-container/store";

// https://github.com/microsoft/TypeScript/issues/30712#issuecomment-494865455
const loader = () =>
  import("components/apple/Dynamic").then((mod) => mod.Dynamic);
const Dynamic = dynamic(loader, {
  loading: () => <Loading />,
  ssr: false,
});

export default function Apple() {
  const setScrollTop = useContainerStore(setScrollTopSelector);
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    setHeight(`${window.visualViewport.height}px`);
  }, []);

  return (
    <ScrollView setScrollTop={setScrollTop}>
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.content}>
        <main style={styles.main}>
          <Dynamic />
        </main>
        <style jsx>
          {`
            main {
              height: ${height};
            }
          `}
        </style>
      </div>
    </ScrollView>
  );
}

const styles: {
  content: CSSProperties;
  main: CSSProperties;
} = {
  content: {
    height: "300vh",
  },
  main: {
    position: "sticky",
    top: 0,
    backgroundColor: "yellow",
  },
};
