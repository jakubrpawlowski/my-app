import { Loading } from "components/Loading";
import { ScrollView } from "components/ScrollView";
import dynamic from "next/dynamic";
import Head from "next/head";
import { CSSProperties, useEffect, useState } from "react";
import {
  INITIAL_SCROLL_NORMALIZED,
  SCROLL_LENGTH
} from "resources/apple/constants";
import { setScrollNormalizedSelector } from "stores/apple-container/selectors";
import { useContainerStore } from "stores/apple-container/store";

// https://github.com/microsoft/TypeScript/issues/30712#issuecomment-494865455
const loader = () =>
  import("components/apple/Dynamic").then((mod) => mod.Dynamic);
const Dynamic = dynamic(loader, {
  loading: () => <Loading />,
  ssr: false,
});

export default function Apple() {
  const setScrollNormalized = useContainerStore(setScrollNormalizedSelector);
  const [height, setHeight] = useState("100vh");

  // Fill screen with sticky main
  useEffect(() => {
    const updateHeight = () => {
      setHeight(`${window.innerHeight}px`);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <ScrollView
      initialScrollNormalized={INITIAL_SCROLL_NORMALIZED}
      setScrollNormalized={setScrollNormalized}
    >
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
    height: `${100 + SCROLL_LENGTH}vh`,
  },
  main: {
    position: "sticky",
    top: 0,
  },
};
