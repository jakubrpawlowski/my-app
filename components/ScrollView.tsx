import Head from "next/head";
import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";

interface ScrollViewProps {}

export const ScrollView = (props: PropsWithChildren<ScrollViewProps>) => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // https://stackoverflow.com/questions/49675898/programmatically-scroll-with-non-integral-scale-values
    // Display scale messes with scrollTop.
    // Temp solution:
    // A. Check if scroll is less than 2 or more than max-2
    // B. Scroll to 5 or max-5 when needed
    const handleScroll = () => {
      if (scrollableRef.current) {
        const clientHeight = scrollableRef.current.clientHeight;
        const scrollHeight = scrollableRef.current.scrollHeight;
        const scrollMax = scrollHeight - clientHeight;
        const scrollTop = scrollableRef.current.scrollTop;

        if (scrollTop >= scrollMax - 2) {
          scrollableRef.current.scrollTop = 5;
        } else if (scrollTop < 2) {
          scrollableRef.current.scrollTop = scrollMax - 5;
        }
      }
    };

    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = 5;

      scrollableRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (scrollableRef.current) {
        scrollableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={scrollableRef} style={styles.scrollable}>
      <Head>
        <style>{body}</style>
      </Head>
      {props.children}
    </div>
  );
};

const styles: {
  scrollable: CSSProperties;
} = {
  scrollable: {
    height: "100%",
    overflow: "auto",
  },
};

const body = `
html, body, #__next {
  height: 100%;
  overflow: hidden;
}
`;