import { Layer } from "components/Layer";
import Head from "next/head";
import styles from "styles/Home.module.css";

export default function Bookstore() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bookstore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Bookstore</h1>
          <Layer />
        </div>
      </main>
    </div>
  );
}
