import { Loading } from "components/Loading";
import dynamic from "next/dynamic";
import Head from "next/head";
import { CSSProperties, useEffect, useRef } from "react";

// https://github.com/microsoft/TypeScript/issues/30712#issuecomment-494865455
const loader = () =>
  import("components/apple/Dynamic").then((mod) => mod.Dynamic);
const Dynamic = dynamic(loader, {
  loading: () => <Loading />,
  ssr: false,
});

export default function Apple() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  // const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef && scrollableRef.current) {
        const clientHeight = scrollableRef.current.clientHeight;
        const scrollHeight = scrollableRef.current.scrollHeight;
        const scrollMax = scrollHeight - clientHeight;
        const scrollTop = scrollableRef.current.scrollTop;

        if (scrollTop >= scrollMax) {
          scrollableRef.current.scrollTop = 1;
        } else if (scrollTop < 1) {
          scrollableRef.current.scrollTop = scrollMax - 1;
        }
      }
    };

    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollTop = 1;

      scrollableRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (scrollableRef && scrollableRef.current) {
        scrollableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={scrollableRef} style={styles.scrollable}>
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{body}</style>
      </Head>

      <div style={styles.content}>
        <main style={styles.main}>
          <div>
            <h1>Apple</h1>
            <Dynamic />
          </div>
        </main>
      </div>
    </div>
  );
}

const styles: {
  content: CSSProperties;
  main: CSSProperties;
  scrollable: CSSProperties;
} = {
  scrollable: {
    height: "100%",
    overflow: "auto",
  },
  content: {
    height: "300vh",
  },
  main: {
    position: "sticky",
    top: 0,
  },
};

const body = `
html, body, #__next {
  height: 100%;
  overflow: hidden;
}
`;
