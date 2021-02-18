import { Loading } from "components/Loading";
import { ScrollView } from "components/ScrollView";
import dynamic from "next/dynamic";
import Head from "next/head";
import { CSSProperties } from "react";

// https://github.com/microsoft/TypeScript/issues/30712#issuecomment-494865455
const loader = () =>
  import("components/apple/Dynamic").then((mod) => mod.Dynamic);
const Dynamic = dynamic(loader, {
  loading: () => <Loading />,
  ssr: false,
});

export default function Apple() {
  return (
    <ScrollView>
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.content}>
        <main style={styles.main}>
          {/* TODO fix those styles later */}
          <div style={{ height: 750 }}>
            <h1>Apple</h1>
            <Dynamic />
          </div>
        </main>
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
  },
};
